import { NgModule } from '@angular/core';
import { Authenticated } from 'src/app/serenity/auth';
import { Routes, RouterModule } from '@angular/router';
import { UserResolver } from 'src/app/services/user-resolver.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login-page/login-page.module').then(
        m => m.LoginPageModule
      )
  },
  {
    path: 'game',
    canActivate: [Authenticated],
    resolve: {
      user: UserResolver
    },
    loadChildren: () =>
      import('./pages/game-page/game-page.module').then(m => m.GamePageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
