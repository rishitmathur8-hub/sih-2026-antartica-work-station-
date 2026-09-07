def calculate_risk(

    generator_load_percent,

    fuel_days_remaining,

    power_status,

    load_shedding_required,

    primary_generator_failed=False

):

    """
    Calculate overall operational risk.

    Prototype thresholds are used
    for demonstration.
    """


    risk_score = 0

    reasons = []


    # -----------------------------
    # POWER STATUS
    # -----------------------------

    if power_status == "BLACKOUT":

        risk_score += 100

        reasons.append(

            "No electrical generation available"

        )


    elif power_status == "POWER_SHORTAGE":

        risk_score += 70

        reasons.append(

            "Power demand exceeds available generation"

        )


    elif power_status == "BACKUP_OPERATION":

        risk_score += 40

        reasons.append(

            "Station operating on backup generation"

        )


    # -----------------------------
    # LOAD SHEDDING
    # -----------------------------

    if load_shedding_required:

        risk_score += 50

        reasons.append(

            "Load shedding is required"

        )


    # -----------------------------
    # PRIMARY GENERATOR
    # -----------------------------

    if primary_generator_failed:

        risk_score += 30

        reasons.append(

            "Primary generator failure detected"

        )


    # -----------------------------
    # GENERATOR LOAD
    # -----------------------------

    if generator_load_percent > 100:

        risk_score += 50

        reasons.append(

            "Generation capacity exceeded"

        )


    elif generator_load_percent > 90:

        risk_score += 30

        reasons.append(

            "Generator operating above 90 percent capacity"

        )


    elif generator_load_percent > 70:

        risk_score += 15

        reasons.append(

            "Generator operating above 70 percent capacity"

        )


    # -----------------------------
    # FUEL
    # -----------------------------

    if fuel_days_remaining < 5:

        risk_score += 50

        reasons.append(

            "Fuel autonomy below 5 days"

        )


    elif fuel_days_remaining < 10:

        risk_score += 30

        reasons.append(

            "Fuel autonomy below 10 days"

        )


    elif fuel_days_remaining < 20:

        risk_score += 15

        reasons.append(

            "Fuel autonomy below 20 days"

        )


    # -----------------------------
    # RISK LEVEL
    # -----------------------------

    if risk_score >= 80:

        risk_level = "CRITICAL"

    elif risk_score >= 50:

        risk_level = "HIGH"

    elif risk_score >= 20:

        risk_level = "MEDIUM"

    else:

        risk_level = "LOW"


    if not reasons:

        reasons.append(

            "No significant operational risk detected"

        )


    return {

        "risk_level":
            risk_level,

        "risk_score":
            risk_score,

        "risk_reasons":
            reasons
    }