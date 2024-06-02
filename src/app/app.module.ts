import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/UI/footer/footer.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { BaseComponent } from './components/base/base.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormControl, FormGroupDirective, NgForm, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';

import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { TrainerInfoModalComponent } from './components/trainer-info-modal/trainer-info-modal.component';
import { MatTabsModule } from '@angular/material/tabs';
import {MatFormFieldModule} from '@angular/material/form-field';
import { SectionsComponent } from './components/sections/sections.component';
import { RouterModule } from '@angular/router';
import { SectionComponent } from './components/section/section.component';
import localeRu from '@angular/common/locales/ru';
import { RegisterComponent } from './components/register/register.component';


registerLocaleData(localeRu);




@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    SectionsComponent
  ],
  imports: [
    RegisterComponent,
    CommonModule,
    SectionComponent,
    RouterModule,
    TrainerInfoModalComponent,
    BaseComponent,
    AppComponent,
    //BrowserModule,
    //BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    FullCalendarModule,
    MatDialogModule,
    MatGridListModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  exports: [
    HeaderComponent,
  ],
  providers: [DatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
