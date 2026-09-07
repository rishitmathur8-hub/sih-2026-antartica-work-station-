import pandas as pd
from sklearn.ensemble import IsolationForest
import joblib

# Load Bharati data
df = pd.read_csv("data/bharati_clean.csv")

# Features used for anomaly detection
features = [
    "Temperature",
    "RH",
    "WS",
    "WD",
    "AP"
]

X = df[features]

# Create Isolation Forest
model = IsolationForest(
    n_estimators=100,
    contamination=0.01,
    random_state=42
)

# Train
model.fit(X)

# Predictions
df["anomaly"] = model.predict(X)

# Convert:
#  1  -> Normal
# -1  -> Anomaly
df["anomaly"] = df["anomaly"].map({
    1: False,
    -1: True
})

# Anomaly score
df["anomaly_score"] = model.decision_function(X)

# Count results
print("----- BHARATI ANOMALY RESULTS -----")
print(df["anomaly"].value_counts())

print("\n----- ANOMALY COUNT -----")
print(df["anomaly"].sum())

# Show strongest anomalies
print("\n----- TOP ANOMALIES -----")
print(
    df[df["anomaly"] == True]
    .sort_values("anomaly_score")
    .head(10)
)

# Save results
df.to_csv("data/bharati_anomalies.csv", index=False)

# Save model
joblib.dump(
    model,
    "model/bharati_isolation_forest.pkl"
)

print("\nSaved anomaly data:")
print("data/bharati_anomalies.csv")

print("\nSaved model:")
print("model/bharati_isolation_forest.pkl")