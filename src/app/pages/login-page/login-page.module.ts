import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { LoginPageComponent } from './login-page.component';
import { LoginPageRoutingModule } from './login-page-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    LoginPageRoutingModule
  ]
})
export class LoginPageModule {}
