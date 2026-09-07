import pandas as pd

# Load anomaly results
df = pd.read_csv("data/maitri_anomalies.csv")

# Start with Normal
df["severity"] = "Normal"

# Get anomalies
anomaly_mask = df["anomaly_label"] == "Anomaly"

anomalies = df.loc[anomaly_mask].copy()

# Rank anomalies:
# lowest score = most unusual
anomalies = anomalies.sort_values("anomaly_score")

# Number of anomalies
n = len(anomalies)

# High = most unusual 10%
high_count = int(n * 0.10)

# Medium = next 30%
medium_count = int(n * 0.30)

# Assign severity
high_indices = anomalies.index[:high_count]

medium_indices = anomalies.index[
    high_count:high_count + medium_count
]

low_indices = anomalies.index[
    high_count + medium_count:
]

df.loc[high_indices, "severity"] = "High"
df.loc[medium_indices, "severity"] = "Medium"
df.loc[low_indices, "severity"] = "Low"

# Display results
print("----- SEVERITY RESULTS -----")
print(df["severity"].value_counts())

print("\n----- HIGH SEVERITY EVENTS -----")

print(
    df[df["severity"] == "High"][
        [
            "Observation Time",
            "Temperature",
            "AP",
            "WS",
            "anomaly_score",
            "severity"
        ]
    ].head(20)
)

# Save
df.to_csv("data/maitri_anomalies_severity.csv", index=False)

print("\nSaved as:")
print("data/maitri_anomalies_severity.csv")