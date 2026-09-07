def calculate_energy(
    temperature,
    wind_speed=0,
    base_load_kw=20,
    indoor_temperature=20,
    heating_factor=0.8
):

    """
    Calculate simulated station energy demand.

    IMPORTANT:
    Default coefficients are prototype
    assumptions and should later be
    calibrated with domain data.
    """


    # -----------------------------
    # TEMPERATURE DIFFERENCE
    # -----------------------------

    temperature_difference = max(

        0,

        indoor_temperature - temperature
    )


    # -----------------------------
    # HEATING LOAD
    # -----------------------------

    heating_load_kw = (

        temperature_difference *
        heating_factor
    )


    # -----------------------------
    # WIND EFFECT
    # -----------------------------

    # Simple prototype model:
    # stronger wind increases
    # heat loss.

    wind_load_kw = (

        wind_speed * 0.05
    )


    # -----------------------------
    # TOTAL POWER
    # -----------------------------

    total_power_kw = (

        base_load_kw +

        heating_load_kw +

        wind_load_kw
    )


    return {

        "base_load_kw":
            round(base_load_kw, 2),

        "heating_load_kw":
            round(heating_load_kw, 2),

        "wind_load_kw":
            round(wind_load_kw, 2),

        "total_power_kw":
            round(total_power_kw, 2)
    }