def get_environment_state(
    temperature=-25,
    wind_speed=30
):
    """
    Creates the environmental state
    for a simulated Antarctic station.

    Values are simulation inputs.
    """

    # Simple wind severity classification

    if wind_speed >= 60:
        wind_condition = "EXTREME"

    elif wind_speed >= 40:
        wind_condition = "HIGH"

    elif wind_speed >= 20:
        wind_condition = "MODERATE"

    else:
        wind_condition = "LOW"


    # Temperature classification

    if temperature <= -40:
        temperature_condition = "EXTREME"

    elif temperature <= -25:
        temperature_condition = "SEVERE"

    elif temperature <= -10:
        temperature_condition = "COLD"

    else:
        temperature_condition = "MODERATE"


    return {

        "temperature": temperature,

        "wind_speed": wind_speed,

        "temperature_condition":
            temperature_condition,

        "wind_condition":
            wind_condition
    }