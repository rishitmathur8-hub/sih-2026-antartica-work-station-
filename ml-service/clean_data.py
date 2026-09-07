import pandas as pd

# Load the original Maitri dataset
df = pd.read_csv("data/maitri_imd.csv")

# Convert Observation Time to datetime
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Sort data chronologically
df = df.sort_values("Observation Time").reset_index(drop=True)

# Remove columns that contain no data
df = df.drop(columns=["WD", "RH"])

# Replace invalid/missing-value marker -999 with NaN
df[["Temperature", "AP", "WS"]] = df[
    ["Temperature", "AP", "WS"]
].replace(-999, pd.NA)

# Check missing values after replacing -999
print("----- MISSING VALUES -----")
print(df.isna().sum())

# Remove rows where Temperature, AP or WS is missing
df = df.dropna(subset=["Temperature", "AP", "WS"])

# Add station name
df["Station"] = "Maitri"

# Save cleaned dataset
df.to_csv("data/maitri_clean.csv", index=False)

print("\n----- CLEAN DATASET -----")
print("Rows:", len(df))
print("Columns:", df.columns.tolist())
print("Saved as: data/maitri_clean.csv")