import pandas as pd

df = pd.read_csv("data/maitri_anomalies.csv")

anomalies = df[df["anomaly_label"] == "Anomaly"].copy()

print("----- ANOMALY SCORE STATISTICS -----")
print(anomalies["anomaly_score"].describe())

print("\n----- SCORE PERCENTILES -----")

for p in [1, 5, 10, 25, 50, 75, 90, 95, 99]:
    print(
        f"{p}th percentile:",
        anomalies["anomaly_score"].quantile(p / 100)
    )