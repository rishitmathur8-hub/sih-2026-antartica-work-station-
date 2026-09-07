import pandas as pd

# Load Bharati data
df = pd.read_csv("data/bharati_weather.csv")

# Convert time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort by time
df = df.sort_values("Observation Time").reset_index(drop=True)

# Remove duplicate timestamps
df = df.drop_duplicates(subset="Observation Time")

# Add station name
df["Station"] = "Bharati"

# Save cleaned data
df.to_csv("data/bharati_clean.csv", index=False)

print("----- CLEAN BHARATI DATA -----")
print(df.head())

print("\n----- SHAPE -----")
print(df.shape)

print("\n----- MISSING VALUES -----")
print(df.isnull().sum())

print("\nSaved as:")
print("data/bharati_clean.csv")