import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PositionsPageRoutingModule } from './positions-routing.module';

import { PositionsPage } from './positions.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PositionsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PositionsPage]
})
export class PositionsPageModule {}
