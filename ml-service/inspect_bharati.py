import xarray as xr

# Load Bharati dataset
ds = xr.open_dataset("data/IIG-bharati-AWS.nc")

print("----- DATASET -----")
print(ds)

print("\n----- VARIABLES -----")
print(list(ds.variables))

print("\n----- DATASET INFO -----")
print(ds.info())