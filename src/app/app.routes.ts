import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { BaseComponent } from './components/base/base.component';
import { SectionsComponent } from './components/sections/sections.component';
import { SectionComponent } from './components/section/section.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { NgModule } from '@angular/core';
import { sectionResolver } from './services/section.resolver';
import { IndividualEventComponent } from './components/individual-event/individual-event.component';
import { individualEventResolver } from './services/individual-event.resolver';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateCoachComponent } from './components/create-coach/create-coach.component';

export const routes: Routes = [
  { path: '', component: BaseComponent},
  { path: 'sections/page/:page', component: SectionsComponent, canActivate: [AuthGuard]},
  { path: 'add-event', component: AddEventComponent, canActivate: [AuthGuard], data: {roles: ["Coach"]} },
  { path: 'schedule', component: ScheduleComponent, canActivate: [AuthGuard] },
  { path: 'sections/add', component: AddSectionComponent, canActivate: [AuthGuard], data: {roles: ["Coach"]}},
  { path: 'section/:id', component: SectionComponent, resolve: { data: sectionResolver}, canActivate: [AuthGuard]},
  { path: 'individual/:id', component: IndividualEventComponent, resolve: { data: individualEventResolver}, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: CreateCoachComponent, canActivate: [AuthGuard], data: {roles: ["Admin"]}},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }