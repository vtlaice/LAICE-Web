class RG2ModeRPA {
    static RETARDING = "RETARDING";
    static APERTURE = "APERTURE";
}

class SweepModeRPA {
    static LINEAR_SWEEP = "LINEAR_SWEEP";
    static CONSTANT_VOLTAGE = "CONSTANT_VOLTAGE";
    static SMART_SWEEP = "SMART_SWEEP"
}

class CollectorGainStateLINAS {
    static SWITCH_GAIN_STATE = "SWITCH_GAIN_STATE";
    static LOW_PRESSURE_SENSITIVE = "LOW_PRESSURE_SENSITIVE";
    static HIGH_PRESSURE_SENSITIVE = "HIGH_PRESSURE_SENSITIVE";
}

class FilamentSelectLINAS {
    static FILAMENT_1 = "FILAMENT_1";
    static FILAMENT_2 = "FILAMENT_2";
}

class EmissionModeSNeuPI {
    static SWEEP_EMISSION = "SWEEP_EMISSION";
    static EMISSION_OFF = "EMISSION_OFF";
    static EMISSION_LEVEL_A = "EMISSION_LEVEL_A";
    static EMISSION_LEVEL_C = "EMISSION_LEVEL_C";
}

export {
    RG2ModeRPA,
    SweepModeRPA,
    CollectorGainStateLINAS,
    FilamentSelectLINAS,
    EmissionModeSNeuPI
}