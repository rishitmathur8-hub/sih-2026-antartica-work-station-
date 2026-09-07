import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load lag-feature dataset
df = pd.read_csv("data/maitri_lag_features.csv")

df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort by time
df = df.sort_values("Observation Time").reset_index(drop=True)

# Features
features = [
    "Temperature",
    "AP",
    "WS",

    "Temperature_lag_1",
    "AP_lag_1",
    "WS_lag_1",

    "Temperature_lag_3",
    "AP_lag_3",
    "WS_lag_3",

    "Temperature_lag_6",
    "AP_lag_6",
    "WS_lag_6",

    "Temperature_lag_24",
    "AP_lag_24",
    "WS_lag_24"
]

# Target
target = "target_temperature"

# Time-based split
train = df[df["Observation Time"] < "2014-01-01"]
test = df[df["Observation Time"] >= "2014-01-01"]

X_train = train[features]
y_train = train[target]

X_test = test[features]
y_test = test[target]

print("----- DATA SPLIT -----")
print("Training samples:", len(X_train))
print("Testing samples:", len(X_test))

# Model
print("\n----- TRAINING MODEL -----")

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Training complete!")

# Prediction
y_pred = model.predict(X_test)

# Evaluation
mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mse ** 0.5
r2 = r2_score(y_test, y_pred)

print("\n----- LAG MODEL PERFORMANCE -----")
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)

# Sample predictions
results = pd.DataFrame({
    "Actual": y_test.values,
    "Predicted": y_pred
})

print("\n----- SAMPLE PREDICTIONS -----")
print(results.head(10))