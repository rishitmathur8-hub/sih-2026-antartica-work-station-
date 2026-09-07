import pandas as pd

# Load cleaned Bharati data
df = pd.read_csv("data/bharati_clean.csv")

# Convert time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Create time features
df["year"] = df["Observation Time"].dt.year
df["month"] = df["Observation Time"].dt.month
df["day"] = df["Observation Time"].dt.day
df["hour"] = df["Observation Time"].dt.hour
df["day_of_year"] = df["Observation Time"].dt.dayofyear

# Save
df.to_csv("data/bharati_features.csv", index=False)

print("----- BHARATI FEATURES -----")
print(df.head())

print("\n----- COLUMNS -----")
print(df.columns.tolist())

print("\n----- SHAPE -----")
print(df.shape)

print("\nSaved as:")
print("data/bharati_features.csv")