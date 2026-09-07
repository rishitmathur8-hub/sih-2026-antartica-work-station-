import pandas as pd

# Load feature dataset
df = pd.read_csv("data/maitri_features.csv")

# Convert time to datetime
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort by time
df = df.sort_values("Observation Time").reset_index(drop=True)

# Create target: next-hour temperature
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove last row because it has no next-hour target
df = df.dropna(subset=["target_temperature"])

# Select features
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

print("----- ML DATASET -----")
print("Features:", X.columns.tolist())
print("X shape:", X.shape)
print("y shape:", y.shape)

print("\n----- FIRST 5 ROWS -----")
print(X.head())

print("\n----- TARGET -----")
print(y.head())

# Save prepared dataset
ml_df = X.copy()
ml_df["target_temperature"] = y

ml_df.to_csv("data/maitri_ml.csv", index=False)

print("\nSaved as: data/maitri_ml.csv")