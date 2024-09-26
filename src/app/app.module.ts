import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DataTableComponent } from './components/data-table/data-table.component';
import { HealthTableComponent } from './components/health-table/health-table.component';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { OverlayModule } from '@angular/cdk/overlay';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { RoleAddComponent } from './components/addforms/role-add/role-add.component';
import { CageAddComponent } from './components/addforms/cage-add/cage-add.component';
import { UserAddComponent } from './components/addforms/user-add/user-add.component';
import { HealthAddComponent } from './components/addforms/health-add/health-add.component';
import { AnimalAddComponent } from './components/addforms/animal-add/animal-add.component';
import { UserEditComponent } from './editforms/user-edit/user-edit.component';
import { CageEditComponent } from './editforms/cage-edit/cage-edit.component';
import { HealthEditComponent } from './editforms/health-edit/health-edit.component';
import { RoleEditComponent } from './editforms/role-edit/role-edit.component';
import { AnimalEditComponent } from './editforms/animal-edit/animal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    DataTableComponent,
    HealthTableComponent,
    AnimalTableComponent,
    UserTableComponent,
    RoleTableComponent,
    RoleAddComponent,
    CageAddComponent,
    UserAddComponent,
    HealthAddComponent,
    AnimalAddComponent,
    UserEditComponent,
    CageEditComponent,
    HealthEditComponent,
    RoleEditComponent,
    AnimalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule,
    MatToolbar,
    MatIcon,
    MatIconButton,
    OverlayModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
