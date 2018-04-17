import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

import {LocationComponent} from "./location.component";

@NgModule({
  imports: [CommonModule, RouterModule,TranslateModule,FormsModule],
  declarations: [LocationComponent],
  exports: [LocationComponent]
})
export class LocationModule{}
