import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  signal,
} from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../core/services/menu/menu.service';
import { effect } from '@angular/core';
import { SubcategoriesMap } from '../../../core/constants';
import { PostsService } from '../../services/posts/posts.service';
import { RouterModule } from '@angular/router';
import { Collapse } from 'bootstrap';

@Component({
  standalone: true,
  selector: 'app-menu',
  imports: [MenubarModule, RouterModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent implements AfterViewInit {
  @ViewChild('navbarCollapse', { static: false }) navbarCollapse!: ElementRef;
  bsCollapse!: Collapse | null;

  subcategories = signal<MenuItem[]>([]); // Usamos Signal en lugar de un array normal
  activeItem: string | undefined;

  constructor(public menuServ: MenuService, public postServ: PostsService) {
    effect(() => {
    const selectedCategory = this.menuServ.selectedNavbarItem();
    const subcategories = SubcategoriesMap[selectedCategory] ?? [];

    // Actualiza el signal subcategories
    this.subcategories.set(subcategories.map((subcategory) => ({
      label: subcategory,
    })));

    // Si hay al menos una subcategoría, aplicamos el filtro con la primera
    if (subcategories.length > 0) {
      this.filterByItemSelected(selectedCategory, subcategories[0]);
    }
  });
  }

  ngAfterViewInit() {
    if (this.navbarCollapse) {
      this.bsCollapse = new Collapse(this.navbarCollapse.nativeElement, {
        toggle: false,
      });
    }
  }

  filterByItemSelected(category: string, subcategory: string) {
    this.postServ.getPostByCategory(category, subcategory).subscribe({
      next: (data) => {
        console.log(data);
        this.postServ.setPosts(data.result.data);
        this.activeItem = subcategory;
        this.menuServ.updateSelectedMenuItem(subcategory);
      },
      error: (error: Error) => {
        console.log(error);
      },
    });
  }

  closeNavbar() {
    if (this.bsCollapse) {
      this.bsCollapse.hide();
    }
  }
}
