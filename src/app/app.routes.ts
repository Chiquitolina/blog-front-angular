import { Routes } from '@angular/router';
import { HomeComponent } from './blog/views/home/home.component';
import { AdminDashboardComponent } from './admin/pages/admin-dashboard/admin-dashboard.component';
import { SinglePostComponent } from './blog/views/single-post/single-post.component';

export const routes: Routes = [
  { path: '',
        component: HomeComponent },
  {
    path: 'post/:id',
        component: SinglePostComponent
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.routes').then((m) => m.ADMIN_ROUTES),
  },
];
