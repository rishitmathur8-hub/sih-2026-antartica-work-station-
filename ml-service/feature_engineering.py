import pandas as pd

# Load clean dataset
df = pd.read_csv("data/maitri_clean.csv")

# Convert time to datetime
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort by time
df = df.sort_values("Observation Time").reset_index(drop=True)

# Time-based features
df["year"] = df["Observation Time"].dt.year
df["month"] = df["Observation Time"].dt.month
df["day"] = df["Observation Time"].dt.day
df["hour"] = df["Observation Time"].dt.hour
df["day_of_year"] = df["Observation Time"].dt.dayofyear

print("----- FEATURE ENGINEERING -----")
print(df.head())

print("\n----- COLUMNS -----")
print(df.columns)

# Save
df.to_csv("data/maitri_features.csv", index=False)

print("\nSaved as: data/maitri_features.csv")