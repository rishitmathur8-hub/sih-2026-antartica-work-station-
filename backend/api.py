from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from simulation.engine import run_simulation


app = FastAPI(
    title="POLARIS TWIN API",
    description="Antarctic Research Station Digital Twin",
    version="1.0"
)


# =====================================
# CORS CONFIGURATION
# =====================================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",

        "http://localhost:3001",
        "http://127.0.0.1:3001",

        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =====================================
# MAITRI STATION CONFIGURATION
# =====================================

MAITRI_STATION = {

    "station_name": "Maitri Research Station",

    "base_load_kw": 20,

    "primary_generator_capacity_kw": 100,

    "backup_generator_capacity_kw": 50,

    "fuel_liters": 5000
}


# =====================================
# HOME API
# =====================================

@app.get("/")
def home():

    return {

        "message": "POLARIS TWIN API is running",

        "status": "operational"
    }


# =====================================
# HEALTH CHECK
# =====================================

@app.get("/health")
def health():

    return {

        "status": "healthy",

        "system": "POLARIS TWIN"
    }


# =====================================
# DIGITAL TWIN SIMULATION
# =====================================

@app.get("/simulate")
def simulate(

    temperature: float = -35,

    wind_speed: float = 40,

    primary_generator_failed: bool = False,

    backup_generator_failed: bool = False
):

    result = run_simulation(

        station=MAITRI_STATION,

        temperature=temperature,

        wind_speed=wind_speed,

        primary_generator_failed=primary_generator_failed,

        backup_generator_failed=backup_generator_failed
    )


    return result