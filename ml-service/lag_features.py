import pandas as pd

# Load clean data
df = pd.read_csv("data/maitri_clean.csv")

# Convert time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort chronologically
df = df.sort_values("Observation Time").reset_index(drop=True)

# Create lag features
for lag in [1, 3, 6, 24]:
    df[f"Temperature_lag_{lag}"] = df["Temperature"].shift(lag)
    df[f"AP_lag_{lag}"] = df["AP"].shift(lag)
    df[f"WS_lag_{lag}"] = df["WS"].shift(lag)

# Create target
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove rows created by lag/target operations
df = df.dropna().reset_index(drop=True)

# Save
df.to_csv("data/maitri_lag_features.csv", index=False)

print("----- LAG FEATURES -----")
print(df.head())

print("\nShape:", df.shape)

print("\nColumns:")
print(df.columns.tolist())

print("\nSaved as:")
print("data/maitri_lag_features.csv")