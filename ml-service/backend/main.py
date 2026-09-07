from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import numpy as np
import joblib

from pathlib import Path
import requests
from bs4 import BeautifulSoup
import re
from concurrent.futures import ThreadPoolExecutor


# ============================================================
# APP
# ============================================================

app = FastAPI(
    title="Antarctic Digital Twin ML API"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# PATHS
# ============================================================

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_DIR = BASE_DIR / "model"


# ============================================================
# NCPOR LIVE URLS
# ============================================================

MAITRI_LIVE_URL = "https://data.ncpor.res.in/maitri/live"

BHARATI_LIVE_URL = "https://data.ncpor.res.in/bharati/live"

BHARATI_WIND_URL = "https://data.ncpor.res.in/bharati/wd"


# ============================================================
# LOAD MAITRI ML MODELS
# ============================================================

maitri_temperature_model = joblib.load(
    MODEL_DIR / "maitri_temperature_model.pkl"
)

maitri_isolation_model = joblib.load(
    MODEL_DIR / "maitri_isolation_forest.pkl"
)

print("Maitri ML models loaded successfully")


# ============================================================
# LOAD BHARATI ML MODELS
# ============================================================

bharati_temperature_model = joblib.load(
    MODEL_DIR / "bharati_temperature_model.pkl"
)

bharati_isolation_model = joblib.load(
    MODEL_DIR / "bharati_isolation_forest.pkl"
)

print("Bharati ML models loaded successfully")


# ============================================================
# HELPER
# ============================================================

def extract_number(pattern, text):
    """
    Extract the first numeric value matching a regex pattern.
    Returns None if not found.
    """

    match = re.search(
        pattern,
        text,
        re.IGNORECASE
    )

    if match:
        return float(match.group(1))

    return None


# ============================================================
# FETCH LIVE MAITRI DATA
# ============================================================

def get_live_maitri_data():

    try:
        response = requests.get(
            MAITRI_LIVE_URL,
            timeout=15
        )

        response.raise_for_status()

    except requests.RequestException as e:

        raise HTTPException(
            status_code=503,
            detail=f"Unable to fetch live Maitri data: {str(e)}"
        )


    # --------------------------------------------------------
    # Convert HTML to text
    # --------------------------------------------------------

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    text = soup.get_text(
        " ",
        strip=True
    )


    # --------------------------------------------------------
    # Temperature
    # --------------------------------------------------------

    temperature_match = re.search(
        r"Temperature:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    if not temperature_match:

        raise HTTPException(
            status_code=503,
            detail="Temperature not found on NCPOR Maitri live page"
        )

    temperature = float(
        temperature_match.group(1)
    )


    # --------------------------------------------------------
    # Relative Humidity
    # --------------------------------------------------------

    humidity_match = re.search(
        r"Relative Humidity:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    humidity = None

    if humidity_match:

        humidity = float(
            humidity_match.group(1)
        )


    # --------------------------------------------------------
    # Air Pressure
    # --------------------------------------------------------

    pressure_match = re.search(
        r"Air Pressure:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    if not pressure_match:

        raise HTTPException(
            status_code=503,
            detail="Air pressure not found on NCPOR Maitri live page"
        )

    air_pressure = float(
        pressure_match.group(1)
    )


    # --------------------------------------------------------
    # Wind Speed
    # NCPOR reports knots
    # Convert knots -> km/h
    # --------------------------------------------------------

    wind_match = re.search(
        r"Wind Speed\s*([+-]?\d+(?:\.\d+)?)\s*knots",
        text,
        re.IGNORECASE
    )

    if not wind_match:

        raise HTTPException(
            status_code=503,
            detail="Wind speed not found on NCPOR Maitri live page"
        )

    wind_knots = float(
        wind_match.group(1)
    )

    wind_speed_kmh = wind_knots * 1.852


    # --------------------------------------------------------
    # Observation date
    # --------------------------------------------------------

    date_match = re.search(
        r"(\d{2}\s+[A-Za-z]{3}\s+\d{4})",
        text
    )

    if date_match:

        date_text = date_match.group(1)

        observation_time = pd.to_datetime(
            date_text
        )

    else:

        observation_time = pd.Timestamp.now()


    # --------------------------------------------------------
    # Return live data
    # --------------------------------------------------------

    return {

        "observation_time": observation_time,

        "temperature": temperature,

        "humidity": humidity,

        "air_pressure": air_pressure,

        "wind_speed": wind_speed_kmh,

        "wind_direction": None
    }


# ============================================================
# RUN MAITRI ML
# ============================================================

def get_maitri_prediction(live_data):

    temperature = live_data["temperature"]

    ap = live_data["air_pressure"]

    ws = live_data["wind_speed"]

    humidity = live_data["humidity"]

    observation_time = live_data["observation_time"]


    # --------------------------------------------------------
    # Time features
    # --------------------------------------------------------

    year = observation_time.year

    month = observation_time.month

    day = observation_time.day

    hour = observation_time.hour

    day_of_year = observation_time.dayofyear


    # --------------------------------------------------------
    # Temperature prediction
    # --------------------------------------------------------

    temperature_features = np.array(
        [[
            temperature,
            ap,
            ws,
            year,
            month,
            day,
            hour,
            day_of_year
        ]]
    )


    predicted_temperature = (
        maitri_temperature_model.predict(
            temperature_features
        )[0]
    )


    # --------------------------------------------------------
    # Anomaly detection
    # --------------------------------------------------------

    anomaly_features = np.array(
        [[
            temperature,
            ap,
            ws
        ]]
    )


    anomaly_prediction = (
        maitri_isolation_model.predict(
            anomaly_features
        )[0]
    )


    anomaly_score = (
        maitri_isolation_model
        .decision_function(
            anomaly_features
        )[0]
    )


    anomaly = anomaly_prediction == -1


    # --------------------------------------------------------
    # Severity
    # --------------------------------------------------------

    if not anomaly:

        severity = "Normal"

    elif anomaly_score < -0.05:

        severity = "High"

    elif anomaly_score < 0:

        severity = "Medium"

    else:

        severity = "Low"


    # --------------------------------------------------------
    # Final response
    # --------------------------------------------------------

    return {

        "station": "Maitri",

        "observation_time":
            observation_time.strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "current_temperature":
            round(
                temperature,
                2
            ),

        "relative_humidity":
            round(
                humidity,
                2
            )
            if humidity is not None
            else None,

        "air_pressure":
            round(
                ap,
                2
            ),

        "wind_speed":
            round(
                ws,
                2
            ),

        "wind_direction":
            None,

        "predicted_next_temperature":
            round(
                float(predicted_temperature),
                2
            ),

        "anomaly":
            bool(anomaly),

        "anomaly_score":
            round(
                float(anomaly_score),
                4
            ),

        "severity":
            severity
    }


# ============================================================
# BHARATI WEATHER REQUEST
# ============================================================

def fetch_bharati_weather():

    try:

        response = requests.get(
            BHARATI_LIVE_URL,
            timeout=10
        )

        response.raise_for_status()

        return response

    except requests.RequestException as e:

        return e


# ============================================================
# BHARATI WIND REQUEST
# ============================================================

def fetch_bharati_wind():

    try:

        response = requests.get(
            BHARATI_WIND_URL,
            timeout=10
        )

        response.raise_for_status()

        return response

    except requests.RequestException as e:

        return e


# ============================================================
# FETCH LIVE BHARATI DATA
# ============================================================

def get_live_bharati_data():

    # --------------------------------------------------------
    # Fetch weather + wind direction simultaneously
    # --------------------------------------------------------

    with ThreadPoolExecutor(max_workers=2) as executor:

        weather_future = executor.submit(
            fetch_bharati_weather
        )

        wind_future = executor.submit(
            fetch_bharati_wind
        )

        response = weather_future.result()

        wind_response = wind_future.result()


    # --------------------------------------------------------
    # Check weather response
    # --------------------------------------------------------

    if isinstance(response, Exception):

        raise HTTPException(
            status_code=503,
            detail=f"Unable to fetch live Bharati data: {str(response)}"
        )


    # --------------------------------------------------------
    # Convert HTML to text
    # --------------------------------------------------------

    soup = BeautifulSoup(
        response.text,
        "html.parser"
    )

    text = soup.get_text(
        " ",
        strip=True
    )


    # --------------------------------------------------------
    # Temperature
    # --------------------------------------------------------

    temperature_match = re.search(
        r"Temperature:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    if not temperature_match:

        raise HTTPException(
            status_code=503,
            detail="Temperature not found on NCPOR Bharati live page"
        )

    temperature = float(
        temperature_match.group(1)
    )


    # --------------------------------------------------------
    # Relative Humidity
    # --------------------------------------------------------

    humidity_match = re.search(
        r"Relative Humidity:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    humidity = None

    if humidity_match:

        humidity = float(
            humidity_match.group(1)
        )


    # --------------------------------------------------------
    # Air Pressure
    # --------------------------------------------------------

    pressure_match = re.search(
        r"Air Pressure:\s*([+-]?\d+(?:\.\d+)?)",
        text,
        re.IGNORECASE
    )

    if not pressure_match:

        raise HTTPException(
            status_code=503,
            detail="Air pressure not found on NCPOR Bharati live page"
        )

    air_pressure = float(
        pressure_match.group(1)
    )


    # --------------------------------------------------------
    # Wind Speed
    # --------------------------------------------------------

    wind_match = re.search(
        r"Wind Speed\s*([+-]?\d+(?:\.\d+)?)\s*(?:knots|km/h)",
        text,
        re.IGNORECASE
    )

    if not wind_match:

        raise HTTPException(
            status_code=503,
            detail="Wind speed not found on NCPOR Bharati live page"
        )

    wind_speed = float(
        wind_match.group(1)
    )


    # --------------------------------------------------------
    # Detect wind speed unit
    # --------------------------------------------------------

    wind_unit_match = re.search(
        r"Wind Speed\s*[+-]?\d+(?:\.\d+)?\s*(knots|km/h)",
        text,
        re.IGNORECASE
    )

    if wind_unit_match:

        wind_unit = wind_unit_match.group(1).lower()

        if wind_unit == "knots":

            wind_speed = wind_speed * 1.852


    # --------------------------------------------------------
    # Wind Direction
    # --------------------------------------------------------

    wind_direction = None

    if not isinstance(wind_response, Exception):

        wind_soup = BeautifulSoup(
            wind_response.text,
            "html.parser"
        )

        wind_text = wind_soup.get_text(
            " ",
            strip=True
        )

        wind_direction_match = re.search(
            r"Wind Direction:\s*([+-]?\d+(?:\.\d+)?)\s*°",
            wind_text,
            re.IGNORECASE
        )

        if wind_direction_match:

            wind_direction = float(
                wind_direction_match.group(1)
            )


    # --------------------------------------------------------
    # Observation date
    # --------------------------------------------------------

    date_match = re.search(
        r"(\d{2}\s+[A-Za-z]{3}\s+\d{4})",
        text
    )

    if date_match:

        date_text = date_match.group(1)

        observation_time = pd.to_datetime(
            date_text
        )

    else:

        observation_time = pd.Timestamp.now()


    # --------------------------------------------------------
    # Return live data
    # --------------------------------------------------------

    return {

        "observation_time": observation_time,

        "temperature": temperature,

        "humidity": humidity,

        "air_pressure": air_pressure,

        "wind_speed": wind_speed,

        "wind_direction": wind_direction
    }


# ============================================================
# RUN BHARATI ML
# ============================================================

def get_bharati_prediction(live_data):

    temperature = live_data["temperature"]

    ap = live_data["air_pressure"]

    ws = live_data["wind_speed"]

    humidity = live_data["humidity"]

    observation_time = live_data["observation_time"]


    # --------------------------------------------------------
    # Time features
    # --------------------------------------------------------

    year = observation_time.year

    month = observation_time.month

    day = observation_time.day

    hour = observation_time.hour

    day_of_year = observation_time.dayofyear


    # --------------------------------------------------------
    # Wind Direction
    # --------------------------------------------------------

    wind_direction = live_data.get(
        "wind_direction"
    )

    if wind_direction is None:

        wind_direction = 0.0


    # --------------------------------------------------------
    # Temperature prediction
    #
    # Bharati model features:
    #
    # Temperature
    # RH
    # WS
    # WD
    # AP
    # year
    # month
    # day
    # hour
    # day_of_year
    # --------------------------------------------------------

    temperature_features = np.array(
        [[
            temperature,

            humidity
            if humidity is not None
            else 0.0,

            ws,

            wind_direction,

            ap,

            year,

            month,

            day,

            hour,

            day_of_year
        ]]
    )


    predicted_temperature = (
        bharati_temperature_model.predict(
            temperature_features
        )[0]
    )


    # --------------------------------------------------------
    # Anomaly detection
    #
    # Bharati Isolation Forest features:
    #
    # Temperature
    # RH
    # WS
    # WD
    # AP
    # --------------------------------------------------------

    anomaly_features = np.array(
        [[
            temperature,

            humidity
            if humidity is not None
            else 0.0,

            ws,

            wind_direction,

            ap
        ]]
    )


    anomaly_prediction = (
        bharati_isolation_model.predict(
            anomaly_features
        )[0]
    )


    anomaly_score = (
        bharati_isolation_model
        .decision_function(
            anomaly_features
        )[0]
    )


    anomaly = anomaly_prediction == -1


    # --------------------------------------------------------
    # Severity
    # --------------------------------------------------------

    if not anomaly:

        severity = "Normal"

    elif anomaly_score < -0.05:

        severity = "High"

    elif anomaly_score < 0:

        severity = "Medium"

    else:

        severity = "Low"


    # --------------------------------------------------------
    # Final response
    # --------------------------------------------------------

    return {

        "station": "Bharati",

        "observation_time":
            observation_time.strftime(
                "%Y-%m-%d %H:%M:%S"
            ),

        "current_temperature":
            round(
                temperature,
                2
            ),

        "relative_humidity":
            round(
                humidity,
                2
            )
            if humidity is not None
            else None,

        "air_pressure":
            round(
                ap,
                2
            ),

        "wind_speed":
            round(
                ws,
                2
            ),

        "wind_direction":
            round(
                wind_direction,
                2
            ),

        "predicted_next_temperature":
            round(
                float(predicted_temperature),
                2
            ),

        "anomaly":
            bool(anomaly),

        "anomaly_score":
            round(
                float(anomaly_score),
                4
            ),

        "severity":
            severity
    }


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def root():

    return {

        "message":
            "Antarctic Digital Twin ML API is running",

        "data_source":
            "NCPOR Maitri and Bharati Live Data",

        "ml":
            "Temperature Prediction + Anomaly Detection"
    }


# ============================================================
# CURRENT LIVE MAITRI DATA
# ============================================================

@app.get("/maitri/current")
def get_current_maitri():

    live_data = get_live_maitri_data()

    result = get_maitri_prediction(
        live_data
    )

    return result


# ============================================================
# NEXT MAITRI
# ============================================================

@app.post("/maitri/next")
def get_next_maitri():

    live_data = get_live_maitri_data()

    result = get_maitri_prediction(
        live_data
    )

    return result


# ============================================================
# CURRENT LIVE BHARATI DATA
# ============================================================

@app.get("/bharati/current")
def get_current_bharati():

    live_data = get_live_bharati_data()

    result = get_bharati_prediction(
        live_data
    )

    return result