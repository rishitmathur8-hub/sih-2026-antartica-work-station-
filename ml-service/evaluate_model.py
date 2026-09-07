import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Load feature dataset
df = pd.read_csv("data/maitri_features.csv")

# Convert timestamp
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort chronologically
df = df.sort_values("Observation Time").reset_index(drop=True)

# Create next-hour temperature target
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove last row
df = df.dropna(subset=["target_temperature"])

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

# -----------------------------
# TIME-BASED TRAIN / TEST SPLIT
# -----------------------------

# 2008-2013 = training
# 2014 = testing

train = df[df["Observation Time"] < "2014-01-01"]
test = df[df["Observation Time"] >= "2014-01-01"]

X_train = train[features]
y_train = train["target_temperature"]

X_test = test[features]
y_test = test["target_temperature"]

print("----- TIME-BASED DATA SPLIT -----")
print("Training period:",
      train["Observation Time"].min(),
      "to",
      train["Observation Time"].max())

print("Testing period:",
      test["Observation Time"].min(),
      "to",
      test["Observation Time"].max())

print("\nTraining samples:", len(X_train))
print("Testing samples:", len(X_test))

# -----------------------------
# TRAIN MODEL
# -----------------------------

print("\n----- TRAINING MODEL -----")

model = RandomForestRegressor(
    n_estimators=100,
    random_state=42,
    n_jobs=-1
)

model.fit(X_train, y_train)

print("Training complete!")

# -----------------------------
# PREDICTION
# -----------------------------

y_pred = model.predict(X_test)

# -----------------------------
# EVALUATION
# -----------------------------

mae = mean_absolute_error(y_test, y_pred)
mse = mean_squared_error(y_test, y_pred)
rmse = mse ** 0.5
r2 = r2_score(y_test, y_pred)

print("\n----- TIME-BASED MODEL PERFORMANCE -----")
print("MAE :", mae)
print("RMSE:", rmse)
print("R2  :", r2)

# -----------------------------
# SHOW SAMPLE PREDICTIONS
# -----------------------------

results = pd.DataFrame({
    "Actual": y_test.values,
    "Predicted": y_pred
})

print("\n----- SAMPLE PREDICTIONS -----")
print(results.head(10))