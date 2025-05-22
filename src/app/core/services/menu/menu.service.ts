import { Injectable, signal } from '@angular/core';
import {
  AngularSubcategories,
  EstructurasyAlgoritmosSubcategories,
  NavbarItems,
  PatronesDeDiseñoSubcategories,
  SubcategoriesMap,
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
  >(null);

  constructor() {}

  updateSelectedNavbarItem(item: any) {
    this.selectedNavbarItem.set(item);
    console.log(this.selectedNavbarItem);

    const firstSubcategory = SubcategoriesMap[item as NavbarItems]?.[0] as
      | AngularSubcategories
      | EstructurasyAlgoritmosSubcategories
      | PatronesDeDiseñoSubcategories
      | null;

    this.selectedMenuItem.set(firstSubcategory);
  }

  updateSelectedMenuItem(item: any) {
    this.selectedMenuItem.set(item);
    console.log(this.selectedMenuItem());
  }
}
