import { Component } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { MenuService } from '../../../core/services/menu/menu.service';
import { effect } from '@angular/core';
import { SubcategoriesMap } from '../../../core/constants';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-menu',
  imports: [MenubarModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  subcategories: MenuItem[] | undefined;

  constructor(private menuServ: MenuService,
              private postServ: PostsService
  ) {
    effect(() => {
      const selectedCategory = this.menuServ.selectedNavbarItem();
      this.subcategories = SubcategoriesMap[selectedCategory]?.map((subcategory) => ({
        label: subcategory,
        command: () => this.filterByItemSelected(selectedCategory, subcategory) 
      })) ?? [];
    });
  }

   filterByItemSelected(category: string, subcategory: string) {
      this.postServ.getPostByCategory(category, subcategory).subscribe({
        next: (data) => {
          console.log(data);
          this.postServ.setPosts(data.result.data);
        },
        error: (error: Error) => {
          console.log(error);
        },
      });
    }
}
