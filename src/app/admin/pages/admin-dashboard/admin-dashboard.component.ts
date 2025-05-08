import { Component } from '@angular/core';
import { WritePostComponent } from '../../components/write-post/write-post.component';
@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  imports: [WritePostComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
