export enum ItemType {
  Device = 'Device',
  Monitor = 'Monitor',
  Other = 'Other'
}

export enum DeviceType {
  Svantek307 = 'Svantek 307',
  CesvaTA120 = 'CESVA TA120',
  CesvaTA150 = 'CESVA TA150',
  SPXOne = 'SPXOne',
  Monitor7 = 'Pantalla 7"',
  Monitor10 = 'Pantalla 10"',
  Monitor15 = 'Monitor Emma 15.6"',
  Monitor21 = 'Monitor Emma 21.2"',
  WifiBridge = 'Wifi Bridge',
  Modem3G = 'Modem 3G/4G',
  HoresSuport = 'Hores de suport',
  SolarSystem = 'Plaques solars',
}

const SPECTRUM_DEVICE_RATE = 4.49;
const CESVA_TA120_RATE = 1.04;
const MONITOR7_RATE = 70;
const MONITOR10_RATE = 75;
const MONITOR15_RATE = 100;
const MONITOR21_RATE = 125;
const WIFI_BRIDGE_RATE = 100;
const MODEM_3G_RATE = 70;
const SUPPORT_HOURS_RATE = 30;
const SOLAR_SYSTEM_RATE = 50;

export class Item {
  type: DeviceType;
  itemType: ItemType;
  quantity: number;

  constructor(itemType: ItemType, type: DeviceType, quantity: number) {
    this.itemType = itemType;
    this.type = type;
    this.quantity = quantity;
  }

  calculateCost(days: number): number {
    switch (this.type) {
      case DeviceType.Svantek307:
      case DeviceType.CesvaTA150:
      case DeviceType.SPXOne:
        return SPECTRUM_DEVICE_RATE * this.quantity * days;
      case DeviceType.CesvaTA120:
        return CESVA_TA120_RATE * this.quantity * days;
      case DeviceType.Monitor7:
        return MONITOR7_RATE * this.quantity * Math.ceil(days / 7);
      case DeviceType.Monitor10:
        return MONITOR10_RATE * this.quantity * Math.ceil(days / 7);
      case DeviceType.Monitor15:
        return MONITOR15_RATE * this.quantity * Math.ceil(days / 7);
      case DeviceType.Monitor21:
        return MONITOR21_RATE * this.quantity * Math.ceil(days / 7);
      case DeviceType.WifiBridge:
        return this.calculateLongTerm(WIFI_BRIDGE_RATE, days);
      case DeviceType.Modem3G:
        return this.calculateLongTerm(MODEM_3G_RATE, days);
      case DeviceType.HoresSuport:
        return SUPPORT_HOURS_RATE * this.quantity;
      case DeviceType.SolarSystem:
        return this.calculateLongTerm(SOLAR_SYSTEM_RATE, days);
    }
    return 0;
  }

  calculateLongTerm(rate: number = 0, days: number = 0): number {
    const weeks = Math.ceil(days / 7);
    let totalCost = 0;
    let weeklyCost = rate * this.quantity;

    for (let i = 0; i < weeks; i++) {
      totalCost += weeklyCost;
      weeklyCost *= 0.85; // Apply 15% discount for the next week
      if (weeklyCost < rate * 0.15) {
        weeklyCost = rate * 0.15;
      }
    }
    return totalCost;
  }
}