import { Component, inject } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NavbarItems } from '../../../core/constants';
import { MenuService } from '../../../core/services/menu/menu.service';

@Component({
  selector: 'app-navbar',
  imports: [MenubarModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {

  items: MenuItem[] | undefined;

  constructor(private menuServ: MenuService) {}

  ngOnInit() {
    this.items = Object.values(NavbarItems).map((item) => ({
      label: item,
      command: () => this.menuServ.updateSelectedNavbarItem(item)
    }))
  }
}
