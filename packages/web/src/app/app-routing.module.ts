import { NgModule } from '@angular/core';
import type { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

// import { HomeComponent } from './components/home/home.component';
// import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
        title: 'Home',
      },

      {
        path: 'new-offers',
        loadComponent: () =>
          import('./components/brands/brands.component').then(m => m.BrandsComponent),
        title: 'New Offers',
      },

      {
        path: 'categories/:category-id',
        loadComponent: () =>
          import('./components/categories/categories.component').then(m => m.CategoriesComponent),
        title: 'Categories',
      },

      {
      path: 'latest-collection',
      loadComponent: () =>
        import('./components/latest-collection/latest-collection.component').then(m => m.LatestCollectionComponent),
      title: 'Latest Collection',
      },

      {
        path: 'products/:category-id',
        loadComponent: () =>
          import('./components/products/products.component').then(m => m.ProductsComponent),
        title: 'Products',
      },

      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent),
        title: 'Cart',
      },

      {
        path: 'favorites',
        loadComponent: () =>
          import('./components/favorites/favorites.component').then(m => m.FavoritesComponent),
        title: 'Favorites',
      },

      {
        path: 'product-details/:product-id',
        loadComponent: () =>
          import('./components/product-details/product-details.component').then(
            m => m.ProductDetailsComponent
          ),
        title: 'Product Details',
      },

      {
        path: 'payment',
        loadComponent: () =>
          import('./components/payment/payment.component').then(m => m.PaymentComponent),
        title: 'Payment',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then(m => m.AuthLayoutComponent),
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        loadComponent: () =>
          import('./components/login/login.component').then(m => m.LoginComponent),
        title: 'Login',
      },

      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then(m => m.RegisterComponent),
        title: 'Register',
      },
    ],
  },

  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then(m => m.BlankLayoutComponent),
    children: [
      {
        path: '**',
        loadComponent: () =>
          import('./components/notfound/notfound.component').then(m => m.NotfoundComponent),
        title: 'Not Found',
      },
    ],
  },

  // {path:'home', component:HomeComponent},
  // {path:'products', component:ProductsComponent},

  // {path:'home' , loadChildren:()=>import('./components/home/home.component').then(m=>m.HomeComponent)}
  // ;
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
