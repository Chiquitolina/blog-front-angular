import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PostsDisplayComponent } from '../../blog/posts-display/posts-display.component';

@Component({
  selector: 'app-home',
  imports: [AvatarModule, AvatarGroupModule, PostsDisplayComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  
}
