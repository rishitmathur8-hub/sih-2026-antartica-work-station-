import pandas as pd
import matplotlib.pyplot as plt

# Load cleaned dataset
df = pd.read_csv("data/maitri_clean.csv")

# Convert time
df["Observation Time"] = pd.to_datetime(df["Observation Time"])

# -------------------------------
# TEMPERATURE DISTRIBUTION
# -------------------------------
plt.figure(figsize=(10, 5))
plt.hist(df["Temperature"], bins=50)
plt.title("Maitri Temperature Distribution")
plt.xlabel("Temperature (°C)")
plt.ylabel("Frequency")
plt.show()

# -------------------------------
# AIR PRESSURE DISTRIBUTION
# -------------------------------
plt.figure(figsize=(10, 5))
plt.hist(df["AP"], bins=50)
plt.title("Maitri Air Pressure Distribution")
plt.xlabel("Air Pressure")
plt.ylabel("Frequency")
plt.show()

# -------------------------------
# WIND SPEED DISTRIBUTION
# -------------------------------
plt.figure(figsize=(10, 5))
plt.hist(df["WS"], bins=50)
plt.title("Maitri Wind Speed Distribution")
plt.xlabel("Wind Speed")
plt.ylabel("Frequency")
plt.show()

print("\n----- CORRELATION MATRIX -----")
print(df[["Temperature", "AP", "WS"]].corr())

print("\n----- OUTLIER ANALYSIS -----")

for column in ["Temperature", "AP", "WS"]:

    Q1 = df[column].quantile(0.25)
    Q3 = df[column].quantile(0.75)

    IQR = Q3 - Q1

    lower = Q1 - 1.5 * IQR
    upper = Q3 + 1.5 * IQR

    outliers = df[
        (df[column] < lower) |
        (df[column] > upper)
    ]

    print(f"\n{column}")
    print("Lower limit:", lower)
    print("Upper limit:", upper)
    print("Number of outliers:", len(outliers))