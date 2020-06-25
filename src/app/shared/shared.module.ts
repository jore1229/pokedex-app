import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { DynamicStyleComponent } from './dynamic-style/dynamic-style.component';



@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
    ],
    declarations: [
      HomePageComponent,
      DynamicStyleComponent,
    ],
    exports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule,
      HomePageComponent,
      DynamicStyleComponent,
    ]
  })
  export class SharedModule {}