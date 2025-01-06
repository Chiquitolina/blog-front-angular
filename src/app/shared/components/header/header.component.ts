import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MenuComponent } from '../menu/menu.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent, InputTextModule, IconFieldModule, InputIconModule, MenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
