export interface MessageObject {
    "SCOR": string,
    "OM": string,
    "IMEI": number,
    "INSTRUCTION": string,
    "VOLTAGE": number,
    "BATTERY LEVEL": number,
    "NETWORK SIGNAL": {
        "current": number,
        "Max": number | 35,
        "Min": number | 1
    }
}