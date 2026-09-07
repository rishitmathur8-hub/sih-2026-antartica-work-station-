import xarray as xr
import pandas as pd

# Load Bharati NetCDF file
ds = xr.open_dataset("data/IIG-bharati-AWS.nc")

# Convert to pandas DataFrame
df = ds.to_dataframe().reset_index()

# Rename columns
df = df.rename(columns={
    "TAXIS": "Observation Time",
    "TEMPR": "Temperature",
    "RH": "RH",
    "WS": "WS",
    "WD": "WD",
    "AP": "AP"
})

# Save as CSV
df.to_csv("data/bharati_weather.csv", index=False)

print("----- BHARATI DATA -----")
print(df.head())

print("\n----- COLUMNS -----")
print(df.columns.tolist())

print("\n----- SHAPE -----")
print(df.shape)

print("\nSaved as:")
print("data/bharati_weather.csv")