import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { ProfileComponent } from './components/profile/profile.component';


// here we are depending on the token state if it is available the 

const routes: Routes = localStorage.getItem('token') ? [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'account', component: ProfileComponent }
] : [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
