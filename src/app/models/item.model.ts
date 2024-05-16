export enum ItemType {
  Device = 'Device',
  Monitor = 'Monitor',
  Other = 'Other'
}

export enum DeviceType {
  Svantek307 = 'Svantek 307',
  CesvaTA120 = 'CESVA TA120',
  SPXOne = 'SPXOne',
  Monitor15 = 'Monitor Emma 15.6"',
  Monitor21 = 'Monitor Emma 21.2"',
  WifiBridge = 'Wifi Bridge',
  Modem3G = 'Modem 3G/4G'
}

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
        const newLocal = 4.49;
        return newLocal * this.quantity * days;
      case DeviceType.CesvaTA120:
        return 1.04 * this.quantity * days;
      case DeviceType.SPXOne:
        return 4.49 * this.quantity * days;
      case DeviceType.Monitor15:
        return 100 * this.quantity * Math.ceil(days / 7);
      case DeviceType.Monitor21:
        return 125 * this.quantity * Math.ceil(days / 7);
      case DeviceType.WifiBridge:
        const weeks = Math.ceil(days / 7);
        let totalCost = 0;
        let weeklyCost = 100 * this.quantity;

        for (let i = 0; i < weeks; i++) {
          totalCost += weeklyCost;
          weeklyCost *= 0.9; // Apply 10% discount for the next week
        }

        return totalCost;
      case DeviceType.Modem3G:
        const weeksModem = Math.ceil(days / 7);
        let totalCostModem = 0;
        let weeklyCostModem = 50 * this.quantity;

        for (let i = 0; i < weeksModem; i++) {
          totalCostModem += weeklyCostModem;
          weeklyCostModem *= 0.95; // Apply 10% discount for the next week
        }

        return totalCostModem;
    }
    return 0;
  }
}