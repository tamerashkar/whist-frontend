import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HomePageComponent } from './home-page.component';
import { HomePageRoutingModule } from './home-page-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [HomePageComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ComponentsModule,
    HomePageRoutingModule
  ]
})
export class HomePageModule {}
