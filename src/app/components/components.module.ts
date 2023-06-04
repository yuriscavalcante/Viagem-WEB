
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './menu/menu.component';
import { ListCardComponent } from './list-card/list-card.component';
import { EmployeeCardComponent } from './employee-card/employee-card.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    MenuComponent,
    ListCardComponent,
    EmployeeCardComponent
  ],
  exports: [
    MenuComponent,
    ListCardComponent,
    EmployeeCardComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ComponentsModule {
}