import { Injectable, signal } from '@angular/core';
import {
  AngularSubcategories,
  EstructurasyAlgoritmosSubcategories,
  NavbarItems,
  PatronesDeDiseñoSubcategories,
} from '../../constants';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  selectedNavbarItem = signal<NavbarItems>(NavbarItems.Angular);
  selectedMenuItem = signal<
    | AngularSubcategories
    | EstructurasyAlgoritmosSubcategories
    | PatronesDeDiseñoSubcategories
    | null
  >(AngularSubcategories.Subcategoria);

  constructor() {}

  updateSelectedNavbarItem(item: any) {
    this.selectedNavbarItem.set(item);
    console.log(this.selectedNavbarItem);
  }

  updateSelectedMenuItem(item: any) {
    this.selectedMenuItem.set(item);
    console.log(this.selectedMenuItem());
  }


}
