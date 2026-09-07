import pandas as pd
import joblib
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import numpy as np

# Load dataset
df = pd.read_csv("data/maitri_features.csv")

# Convert time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort by time
df = df.sort_values("Observation Time")

# Create target
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove last row
df = df.dropna()

# Features
features = [
    "Temperature",
    "AP",
    "WS",
    "year",
    "month",
    "day",
    "hour",
    "day_of_year"
]

X = df[features]
y = df["target_temperature"]

# Same time split
split_date = "2014-01-01"

train = df[df["Observation Time"] < split_date]
test = df[df["Observation Time"] >= split_date]

X_test = test[features]
y_test = test["target_temperature"]

# Load model
model = joblib.load("model/maitri_temperature_model.pkl")

# Predict
predictions = model.predict(X_test)

# Metrics
mae = mean_absolute_error(y_test, predictions)
rmse = np.sqrt(mean_squared_error(y_test, predictions))
r2 = r2_score(y_test, predictions)

print("\n----- FINAL MODEL CHECK -----")
print("Test samples:", len(X_test))
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)

# Show predictions
result = pd.DataFrame({
    "Actual": y_test.values,
    "Predicted": predictions
})

print("\n----- SAMPLE PREDICTIONS -----")
print(result.head(20))