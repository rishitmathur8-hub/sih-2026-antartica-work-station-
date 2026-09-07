import pandas as pd
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load data
df = pd.read_csv("data/maitri_features.csv")

df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort chronologically
df = df.sort_values("Observation Time").reset_index(drop=True)

# Next-hour temperature
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove last row
df = df.dropna(subset=["target_temperature"])

# Use 2014 as test period
test = df[df["Observation Time"] >= "2014-01-01"]

actual = test["target_temperature"]

# Baseline:
# Predict next hour = current hour
prediction = test["Temperature"]

mae = mean_absolute_error(actual, prediction)
mse = mean_squared_error(actual, prediction)
rmse = mse ** 0.5
r2 = r2_score(actual, prediction)

print("----- BASELINE PERFORMANCE -----")
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)