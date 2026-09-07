import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
import joblib

# Load ML dataset
df = pd.read_csv("data/maitri_ml.csv")

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

# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

print("----- DATA SPLIT -----")
print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))

# Create model
model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

# Train
print("\n----- TRAINING MODEL -----")
model.fit(X_train, y_train)

print("Training complete!")

# Predictions
y_pred = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mse ** 0.5
r2 = r2_score(y_test, y_pred)

print("\n----- MODEL PERFORMANCE -----")
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)

# Save model
joblib.dump(model, "model/maitri_temperature_model.pkl")

print("\nModel saved as:")
print("model/maitri_temperature_model.pkl")