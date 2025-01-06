import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../core/services/menu/menu.service';
import { effect } from '@angular/core';
import { SubcategoriesMap } from '../../../core/constants';

@Component({
  selector: 'app-menu',
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  subcategories: MenuItem[] | undefined;

  constructor(private menuServ: MenuService) {
    effect(() => {
      const selectedCategory = this.menuServ.selectedNavbarItem();
      this.subcategories =
        SubcategoriesMap[selectedCategory]?.map((subcategory) => ({
          label: subcategory, // La etiqueta que se mostrará
          command: () => {
            console.log(`Clicked on ${subcategory}`);
          },
        })) ?? [];
    });
  }
}
