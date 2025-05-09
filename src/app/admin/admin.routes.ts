import { Routes } from "@angular/router";
import { AdminDashboardComponent } from "./pages/admin-dashboard/admin-dashboard.component";
import { PostManagementComponent } from "./pages/post-management/post-management.component";
import { WritePostComponent } from "./components/write-post/write-post.component";

export const ADMIN_ROUTES: Routes = [
    {path: 'dashboard', component: AdminDashboardComponent},
    {path: 'posts', component: PostManagementComponent}
]