# Antarctic Digital Twin - ML Service

AI/ML service for the Antarctic Digital Twin project, developed for the Smart India Hackathon (SIH).

This service provides machine-learning capabilities for the **Maitri** and **Bharati** Antarctic research stations using environmental observation data.

---

## Overview

The ML service currently provides three main capabilities:

1. **Next-observation temperature prediction**
2. **Environmental anomaly detection**
3. **Anomaly severity classification**

The models are exposed through a **FastAPI** backend so that the main Digital Twin application can communicate with the ML service.

---

## Supported Stations

The ML service currently supports:

- **Maitri Station**
- **Bharati Station**

Both stations use their own trained machine-learning models because their available datasets and feature sets are different.

---

# Features

## 1. Temperature Prediction

The service predicts the temperature for the next observation based on the current environmental conditions and time-related features.

### Maitri

The Maitri temperature model uses:

- Temperature
- Air Pressure (`AP`)
- Wind Speed (`WS`)
- Year
- Month
- Day
- Hour
- Day of Year

The trained model is stored as:

```text
model/maitri_temperature_model.pkl