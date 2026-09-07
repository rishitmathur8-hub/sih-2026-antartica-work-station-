import pandas as pd

# Load Bharati feature data
df = pd.read_csv("data/bharati_features.csv")

# Sort by observation time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])
df = df.sort_values("Observation Time").reset_index(drop=True)

# Create target: next observation's temperature
df["target_temperature"] = df["Temperature"].shift(-1)

# Remove last row because it has no future temperature
df = df.dropna(subset=["target_temperature"])

# Select ML columns
ml_columns = [
    "Temperature",
    "RH",
    "WS",
    "WD",
    "AP",
    "year",
    "month",
    "day",
    "hour",
    "day_of_year",
    "target_temperature"
]

ml_df = df[ml_columns]

# Save ML dataset
ml_df.to_csv("data/bharati_ml.csv", index=False)

print("----- BHARATI ML DATA -----")
print(ml_df.head())

print("\n----- COLUMNS -----")
print(ml_df.columns.tolist())

print("\n----- SHAPE -----")
print(ml_df.shape)

print("\n----- MISSING VALUES -----")
print(ml_df.isnull().sum())

print("\nSaved as:")
print("data/bharati_ml.csv")