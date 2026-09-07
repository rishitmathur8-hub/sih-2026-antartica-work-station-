import pandas as pd

df = pd.read_csv("data/maitri_imd.csv")

# Convert time to datetime
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort chronologically
df = df.sort_values("Observation Time").reset_index(drop=True)

# Calculate time difference after sorting
df["Time Difference"] = df["Observation Time"].diff()

print("----- FIRST 10 ROWS AFTER SORTING -----")
print(df[["Observation Time", "Temperature", "AP", "WS"]].head(10))

print("\n----- LAST 10 ROWS -----")
print(df[["Observation Time", "Temperature", "AP", "WS"]].tail(10))

# Real gaps larger than 1 hour
gaps = df[df["Time Difference"] > pd.Timedelta(hours=1)]

print("\n----- REAL TIME GAPS -----")
print(gaps[["Observation Time", "Time Difference"]].to_string(index=False))

print("\n----- NUMBER OF REAL GAPS -----")
print(len(gaps))

# Duplicate timestamps
duplicates = df[df["Observation Time"].duplicated(keep=False)]

print("\n----- DUPLICATE TIMESTAMPS -----")
print(len(duplicates))