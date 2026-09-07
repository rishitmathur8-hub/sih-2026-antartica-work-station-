import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib
import numpy as np

# Load data
df = pd.read_csv("data/bharati_ml.csv")

# Features
features = [
    "Temperature",
    "RH",
    "WS",
    "WD",
    "AP",
    "year",
    "month",
    "day",
    "hour",
    "day_of_year"
]

X = df[features]
y = df["target_temperature"]

# Time-based split
split = int(len(df) * 0.8)

X_train = X.iloc[:split]
X_test = X.iloc[split:]

y_train = y.iloc[:split]
y_test = y.iloc[split:]

print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))

# Train model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

# Predictions
predictions = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, predictions)
rmse = np.sqrt(mean_squared_error(y_test, predictions))
r2 = r2_score(y_test, predictions)

print("\n----- BHARATI MODEL PERFORMANCE -----")
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)

# Save model
joblib.dump(model, "model/bharati_temperature_model.pkl")

print("\nModel saved as:")
print("model/bharati_temperature_model.pkl")