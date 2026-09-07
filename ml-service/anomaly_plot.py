import pandas as pd
import matplotlib.pyplot as plt

# Load anomaly results
df = pd.read_csv("data/maitri_anomalies_severity.csv")

df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# -----------------------------
# TEMPERATURE + ANOMALIES
# -----------------------------

plt.figure(figsize=(14, 6))

plt.plot(
    df["Observation Time"],
    df["Temperature"],
    label="Temperature"
)

anomalies = df[df["severity"] != "Normal"]

plt.scatter(
    anomalies["Observation Time"],
    anomalies["Temperature"],
    label="Anomaly"
)

plt.xlabel("Time")
plt.ylabel("Temperature (°C)")
plt.title("Maitri Temperature and Detected Anomalies")
plt.legend()
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()