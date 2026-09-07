import pandas as pd
import joblib

# Load trained model
model = joblib.load("model/maitri_temperature_model.pkl")

# New observation
data = pd.DataFrame([{
    "Temperature": -5.0,
    "AP": 980.0,
    "WS": 20.0,
    "year": 2026,
    "month": 9,
    "day": 3,
    "hour": 18,
    "day_of_year": 246
}])

# Make prediction
prediction = model.predict(data)

print("----- MAITRI TEMPERATURE PREDICTION -----")
print("Current Temperature:", data["Temperature"].iloc[0], "°C")
print("Air Pressure:", data["AP"].iloc[0], "hPa")
print("Wind Speed:", data["WS"].iloc[0])
print("Predicted Next-Hour Temperature:", prediction[0], "°C")