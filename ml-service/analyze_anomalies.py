import pandas as pd

# Load anomaly dataset
df = pd.read_csv("data/maitri_anomalies.csv")

# Get only anomalies
anomalies = df[df["anomaly_label"] == "Anomaly"].copy()

print("----- ANOMALY SUMMARY -----")

print("Total anomalies:", len(anomalies))

print("\n----- TEMPERATURE -----")
print(anomalies["Temperature"].describe())

print("\n----- AIR PRESSURE -----")
print(anomalies["AP"].describe())

print("\n----- WIND SPEED -----")
print(anomalies["WS"].describe())

print("\n----- 20 MOST ANOMALOUS OBSERVATIONS -----")

print(
    anomalies[
        [
            "Observation Time",
            "Temperature",
            "AP",
            "WS",
            "anomaly_score"
        ]
    ]
    .sort_values("anomaly_score")
    .head(20)
)