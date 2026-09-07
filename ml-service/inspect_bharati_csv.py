import pandas as pd

df = pd.read_csv("data/bharati_weather.csv")

df["Observation Time"] = pd.to_datetime(df["Observation Time"])

print("----- DATA INFO -----")
print(df.info())

print("\n----- MISSING VALUES -----")
print(df.isnull().sum())

print("\n----- DUPLICATES -----")
print(df["Observation Time"].duplicated().sum())

print("\n----- TIME RANGE -----")
print(df["Observation Time"].min())
print(df["Observation Time"].max())

print("\n----- FIRST 10 ROWS -----")
print(df.head(10))

print("\n----- LAST 10 ROWS -----")
print(df.tail(10))

print("\n----- TIME DIFFERENCES -----")
print(df["Observation Time"].diff().value_counts().head(10))