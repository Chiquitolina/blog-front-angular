import { Injectable, signal } from '@angular/core';
import { NavbarItems } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  selectedNavbarItem = signal<NavbarItems>(NavbarItems.Angular);

  constructor() { }

  updateSelectedNavbarItem(item: any) {
    this.selectedNavbarItem.set(item);
    console.log(this.selectedNavbarItem)
  }
}
