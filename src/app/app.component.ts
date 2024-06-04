import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';

import { DeviceType, Item, ItemType } from './models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTableModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  items: Item[] = [];
  numberOfDays: number = 1;
  wifiRequired: boolean = false;
  modem3G: boolean = false;
  displayedColumns: string[] = ['item', 'qty', 'price', 'delete'];

  selectedDevice: DeviceType | undefined;
  selectedMonitor: DeviceType | undefined;
  selectedExtra: DeviceType | undefined;
  deviceQuantity: number = 1;
  monitorQuantity: number = 1;
  extrasQuantity: number = 1;

  getTotalCost(): number {
    let total = this.items.reduce((total, item) => total + item.calculateCost(this.numberOfDays), 0);
    return total;
  }

  addItem(type: string): void {
    if (type === 'Device' && this.selectedDevice) {
      const item = new Item(ItemType.Device, this.selectedDevice, this.deviceQuantity);
      this.items.push(item);
      this.items = [...this.items];
      this.selectedDevice = undefined;
      this.deviceQuantity = 1;
    } else if (type === 'Monitor' && this.selectedMonitor) {
      const item = new Item(ItemType.Monitor, this.selectedMonitor, this.monitorQuantity);
      this.items.push(item);
      this.items = [...this.items];
      this.selectedMonitor = undefined;
      this.monitorQuantity = 1;
    } else if (type === 'Extras' && this.selectedExtra) {
      const item = new Item(ItemType.Monitor, this.selectedExtra, this.extrasQuantity);
      this.items.push(item);
      this.items = [...this.items];
      this.selectedExtra = undefined;
      this.extrasQuantity = 1;
    }
  }

  getOptions(type: string): string[] {
    if (type === 'Device') {
      return [DeviceType.CesvaTA120, DeviceType.CesvaTA150, DeviceType.Svantek307, DeviceType.SPXOne];
    } else if (type === 'Monitor') {
      return [DeviceType.Monitor7, DeviceType.Monitor10, DeviceType.Monitor15, DeviceType.Monitor21];
    } else if (type === 'Extras') {
      return [DeviceType.WifiBridge, DeviceType.Modem3G, DeviceType.HoresSuport, DeviceType.SolarSystem];
    }
    return [];
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.items = [...this.items];

  }
}
