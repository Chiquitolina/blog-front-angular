import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { NavbarItems } from '../../../core/constants';
import { MenuService } from '../../../core/services/menu/menu.service';
import { RouterModule } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { Collapse } from 'bootstrap';
@Component({
  selector: 'app-navbar',
  imports: [MenubarModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements AfterViewInit {
  @ViewChild('navbarSupportedContent', { static: false })
  navbarCollapse!: ElementRef;
  bsCollapse!: Collapse | null;

  items: MenuItem[] | undefined;
  activeItem: string | undefined = 'Angular';

  constructor(private menuServ: MenuService, private postServ: PostsService) {}

  ngOnInit() {
    this.items = (Object.values(NavbarItems) as NavbarItems[]).map((item) => ({
      label: item,
    }));
  }

  ngAfterViewInit() {
    if (this.navbarCollapse) {
      this.bsCollapse = new Collapse(this.navbarCollapse.nativeElement, {
        toggle: false,
      });
    }
  }

  filterByItemSelected(item: NavbarItems) {
    this.postServ.getPostByCategory(item).subscribe({
      next: (data) => {
        console.log(data);
        this.postServ.setPosts(data.result.data);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  onClickMenuItem(item: string | undefined) {
    this.activeItem = item;
    this.menuServ.updateSelectedNavbarItem(item),
      this.filterByItemSelected(
        item ? (item as NavbarItems) : NavbarItems.Angular
      );

    setTimeout(() => {
      const element = document.getElementById('seccion'); // O el id de tu sección
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
  }

  isSelected(item: NavbarItems): boolean {
    return this.menuServ.selectedNavbarItem() === (item as NavbarItems);
  }

  resetMenus() {
    this.activeItem = NavbarItems.Angular;
    this.menuServ.updateSelectedNavbarItem(NavbarItems.Angular),
      this.filterByItemSelected(NavbarItems.Angular);
  }

  closeNavbar() {
    if (this.bsCollapse) {
      this.bsCollapse.hide();
    }
  }
}
