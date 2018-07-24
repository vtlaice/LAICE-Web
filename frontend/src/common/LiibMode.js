class LiibMode {
    static NONE = 'NONE';
    static NORMAL_MODE = 'NORMAL_MODE';
    static TK1_CHARGE = 'TK1_CHARGE';
    static TK1_DISCHARGE = 'TK1_DISCHARGE';
    static TK2_CHARGE = 'TK2_CHARGE';
    static TK2_DISCHARGE = 'TK2_DISCHARGE';
    static TK_OVERRIDE = 'TK_OVERRIDE';

    static opModeString(opmode) {
        switch (opmode) {
            case "SAFE":
                return "Safe";
            case "SNEUPI_ON":
                return "SNeuPI";
            case "LINAS_ON":
                return "LINAS";
            case "NEUTRAL":
                return "Neutral";
            case "PLASMA":
                return "Plasma";
            case "HIGH_RES_CORRELATION":
                return "High Res Correlation";
            case "LOW_RES_CORRELATION":
                return "Low Res Correlation";
            case "PRIME_SCIENCE":
                return "Prime Science";
            default:
                return "Unknown";
        }
    }
}

export default LiibMode