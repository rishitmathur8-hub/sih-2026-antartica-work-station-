import pandas as pd

# Load Bharati anomaly data
df = pd.read_csv("data/bharati_anomalies.csv")

# Start with everything as Normal
df["severity"] = "Normal"

# Select only anomalies
anomalies = df[df["anomaly"] == True].copy()

# Sort anomalies from strongest to weakest
anomalies = anomalies.sort_values("anomaly_score")

# Number of anomalies
n = len(anomalies)

# Define severity limits
high_count = int(n * 0.10)
medium_count = int(n * 0.30)

# Assign High severity
high_indices = anomalies.index[:high_count]
df.loc[high_indices, "severity"] = "High"

# Assign Medium severity
medium_indices = anomalies.index[high_count:high_count + medium_count]
df.loc[medium_indices, "severity"] = "Medium"

# Remaining anomalies = Low
low_indices = anomalies.index[high_count + medium_count:]
df.loc[low_indices, "severity"] = "Low"

# Save
df.to_csv("data/bharati_anomalies_severity.csv", index=False)

print("----- BHARATI SEVERITY RESULTS -----")
print(df["severity"].value_counts())

print("\n----- HIGH SEVERITY ANOMALIES -----")
print(
    df[df["severity"] == "High"]
    .sort_values("anomaly_score")
    .head(10)
)

print("\nSaved as:")
print("data/bharati_anomalies_severity.csv")