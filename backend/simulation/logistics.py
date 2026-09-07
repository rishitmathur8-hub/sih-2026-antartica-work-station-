def calculate_fuel(

    total_power_kw,

    fuel_liters,

    fuel_factor=0.25

):

    """
    Calculate prototype fuel consumption.

    fuel_factor is a simulation coefficient,
    not a real station specification.
    """


    # Prevent division problems

    if total_power_kw <= 0:

        return {

            "fuel_available_liters":
                fuel_liters,

            "fuel_consumption_lph":
                0,

            "fuel_hours_remaining":
                0,

            "fuel_days_remaining":
                0
        }


    # -----------------------------
    # FUEL CONSUMPTION
    # -----------------------------

    fuel_consumption_lph = (

        total_power_kw *

        fuel_factor
    )


    # -----------------------------
    # FUEL AUTONOMY
    # -----------------------------

    fuel_hours_remaining = (

        fuel_liters /

        fuel_consumption_lph
    )


    fuel_days_remaining = (

        fuel_hours_remaining / 24
    )


    return {

        "fuel_available_liters":
            round(fuel_liters, 2),

        "fuel_consumption_lph":
            round(
                fuel_consumption_lph,
                2
            ),

        "fuel_hours_remaining":
            round(
                fuel_hours_remaining,
                2
            ),

        "fuel_days_remaining":
            round(
                fuel_days_remaining,
                2
            )
    }