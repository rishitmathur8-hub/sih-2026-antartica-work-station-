import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("data/maitri_clean.csv")

# Convert time to datetime
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# Temperature
plt.figure(figsize=(12, 5))
plt.plot(df["Observation Time"], df["Temperature"])
plt.xlabel("Time")
plt.ylabel("Temperature (°C)")
plt.title("Maitri Temperature Over Time")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Air Pressure
plt.figure(figsize=(12, 5))
plt.plot(df["Observation Time"], df["AP"])
plt.xlabel("Time")
plt.ylabel("Air Pressure")
plt.title("Maitri Air Pressure Over Time")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# Wind Speed
plt.figure(figsize=(12, 5))
plt.plot(df["Observation Time"], df["WS"])
plt.xlabel("Time")
plt.ylabel("Wind Speed")
plt.title("Maitri Wind Speed Over Time")
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()