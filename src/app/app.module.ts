import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Angular Material Modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

// Components
import { AppComponent } from './app.component';
import { PeopleListComponent } from './components/people-list/people-list.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Interceptors for handling API requests
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './interceptors/http-error.interceptor';
import { SettingsComponent } from './components/settings/settings.component';
import { ReportsComponent } from './components/reports/reports.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/people', pathMatch: 'full' },
  { path: 'people', component: PeopleListComponent },
  { path: 'people/new', component: PersonFormComponent },
  { path: 'people/:id', component: PersonDetailsComponent },
  { path: 'people/:id/edit', component: PersonFormComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/people' }
];

@NgModule({
  declarations: [
    AppComponent,
    PeopleListComponent,
    PersonFormComponent,
    PersonDetailsComponent,
    DeleteConfirmationComponent,
    HeaderComponent,
    SidenavComponent,
    SettingsComponent,
    ReportsComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatDialogModule,
    MatChipsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [
    DeleteConfirmationComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }