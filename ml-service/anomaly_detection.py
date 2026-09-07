import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

# Load clean Maitri data
df = pd.read_csv("data/maitri_clean.csv")

# Features used for anomaly detection
features = [
    "Temperature",
    "AP",
    "WS"
]

X = df[features]

print("----- DATA FOR ANOMALY DETECTION -----")
print("Rows:", len(X))
print("Features:", features)

# Create Isolation Forest
model = IsolationForest(
    n_estimators=200,
    contamination=0.01,
    random_state=42
)

# Train model
print("\n----- TRAINING ISOLATION FOREST -----")

model.fit(X)

print("Training complete!")

# Predict
df["anomaly"] = model.predict(X)

# Convert prediction:
#  1  = normal
# -1  = anomaly
df["anomaly_label"] = df["anomaly"].map({
    1: "Normal",
    -1: "Anomaly"
})

# Anomaly score
df["anomaly_score"] = model.decision_function(X)

# Count results
print("\n----- ANOMALY RESULTS -----")
print(df["anomaly_label"].value_counts())

# Show anomalies
anomalies = df[df["anomaly_label"] == "Anomaly"]

print("\n----- FIRST 10 ANOMALIES -----")
print(
    anomalies[
        [
            "Observation Time",
            "Temperature",
            "AP",
            "WS",
            "anomaly_score",
            "anomaly_label"
        ]
    ].head(10)
)

# Save results
df.to_csv("data/maitri_anomalies.csv", index=False)

# Save model
joblib.dump(
    model,
    "model/maitri_isolation_forest.pkl"
)

print("\nSaved anomaly dataset:")
print("data/maitri_anomalies.csv")

print("\nSaved anomaly model:")
print("model/maitri_isolation_forest.pkl")