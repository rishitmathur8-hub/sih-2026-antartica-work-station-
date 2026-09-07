def calculate_power_status(

    power_demand_kw,

    primary_generator_capacity_kw,

    backup_generator_capacity_kw=0,

    primary_generator_failed=False,

    backup_generator_failed=False

):

    """
    Simulate available power and
    generator failure scenarios.
    """


    # -----------------------------
    # PRIMARY GENERATOR
    # -----------------------------

    primary_available = 0


    if not primary_generator_failed:

        primary_available = (

            primary_generator_capacity_kw
        )


    # -----------------------------
    # BACKUP GENERATOR
    # -----------------------------

    backup_available = 0


    if not backup_generator_failed:

        backup_available = (

            backup_generator_capacity_kw
        )


    # -----------------------------
    # TOTAL AVAILABLE POWER
    # -----------------------------

    total_available_power = (

        primary_available +

        backup_available
    )


    # -----------------------------
    # POWER BALANCE
    # -----------------------------

    power_shortage_kw = max(

        0,

        power_demand_kw -

        total_available_power
    )


    power_surplus_kw = max(

        0,

        total_available_power -

        power_demand_kw
    )


    # -----------------------------
    # LOAD SHEDDING
    # -----------------------------

    load_shedding_required = (

        power_shortage_kw > 0
    )


    # -----------------------------
    # UTILIZATION
    # -----------------------------

    if total_available_power > 0:

        generator_load_percent = (

            power_demand_kw /

            total_available_power

        ) * 100

    else:

        generator_load_percent = 0


    # -----------------------------
    # STATUS
    # -----------------------------

    if total_available_power == 0:

        power_status = "BLACKOUT"

    elif power_shortage_kw > 0:

        power_status = "POWER_SHORTAGE"

    elif primary_generator_failed:

        power_status = "BACKUP_OPERATION"

    else:

        power_status = "NORMAL"


    return {

        "primary_generator_available":
            primary_available > 0,

        "backup_generator_available":
            backup_available > 0,

        "total_available_power_kw":
            round(
                total_available_power,
                2
            ),

        "power_demand_kw":
            round(
                power_demand_kw,
                2
            ),

        "generator_load_percent":
            round(
                generator_load_percent,
                2
            ),

        "power_shortage_kw":
            round(
                power_shortage_kw,
                2
            ),

        "power_surplus_kw":
            round(
                power_surplus_kw,
                2
            ),

        "load_shedding_required":
            load_shedding_required,

        "power_status":
            power_status
    }