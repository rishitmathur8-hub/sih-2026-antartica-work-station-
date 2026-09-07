from simulation.environment import get_environment_state

from simulation.energy import calculate_energy

from simulation.logistics import calculate_fuel

from simulation.power import calculate_power_status

from simulation.risk import calculate_risk


def run_simulation(

    station,

    temperature,

    wind_speed,

    primary_generator_failed=False,

    backup_generator_failed=False

):

    """
    Run a complete POLARIS TWIN
    simulation.
    """


    # =================================
    # ENVIRONMENT
    # =================================

    environment = get_environment_state(

        temperature=temperature,

        wind_speed=wind_speed
    )


    # =================================
    # ENERGY
    # =================================

    energy = calculate_energy(

        temperature=

        environment["temperature"],

        wind_speed=

        environment["wind_speed"],

        base_load_kw=

        station["base_load_kw"]
    )


    # =================================
    # POWER SYSTEM
    # =================================

    power = calculate_power_status(

        power_demand_kw=

        energy["total_power_kw"],

        primary_generator_capacity_kw=

        station[
            "primary_generator_capacity_kw"
        ],

        backup_generator_capacity_kw=

        station[
            "backup_generator_capacity_kw"
        ],

        primary_generator_failed=

        primary_generator_failed,

        backup_generator_failed=

        backup_generator_failed
    )


    # =================================
    # FUEL
    # =================================

    fuel = calculate_fuel(

        total_power_kw=

        energy["total_power_kw"],

        fuel_liters=

        station["fuel_liters"]
    )


    # =================================
    # RISK
    # =================================

    risk = calculate_risk(

        generator_load_percent=

        power[
            "generator_load_percent"
        ],

        fuel_days_remaining=

        fuel[
            "fuel_days_remaining"
        ],

        power_status=

        power[
            "power_status"
        ],

        load_shedding_required=

        power[
            "load_shedding_required"
        ],

        primary_generator_failed=

        primary_generator_failed
    )


    # =================================
    # FINAL DIGITAL TWIN STATE
    # =================================

    return {

        "station":

            station["station_name"],


        "environment":

            environment,


        "energy":

            energy,


        "power":

            power,


        "fuel":

            fuel,


        "risk":

            risk
    }