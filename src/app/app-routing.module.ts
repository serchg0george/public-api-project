import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthTableComponent } from './components/main_forms/health-table/health-table.component';
import { DataTableComponent } from './components/main_forms/data-table/data-table.component';
import { AnimalTableComponent } from './components/main_forms/animal-table/animal-table.component';
import { UserTableComponent } from './components/main_forms/user-table/user-table.component';
import { RoleTableComponent } from './components/main_forms/role-table/role-table.component';
import { RoleAddComponent } from './components/add_forms/role-add/role-add.component';
import { CageAddComponent } from './components/add_forms/cage-add/cage-add.component';
import { AnimalAddComponent } from './components/add_forms/animal-add/animal-add.component';
import { HealthAddComponent } from './components/add_forms/health-add/health-add.component';
import { UserAddComponent } from './components/add_forms/user-add/user-add.component';
import { UserEditComponent } from './components/edit_forms/user-edit/user-edit.component';
import { CageEditComponent } from './components/edit_forms/cage-edit/cage-edit.component';
import { AnimalEditComponent } from './components/edit_forms/animal-edit/animal-edit.component';
import { HealthEditComponent } from './components/edit_forms/health-edit/health-edit.component';
import { RoleEditComponent } from './components/edit_forms/role-edit/role-edit.component';
const routes: Routes = [
  { path: 'health', component: HealthTableComponent },
  { path: 'data', component: DataTableComponent },
  { path: 'animal', component: AnimalTableComponent },
  { path: 'user', component: UserTableComponent },
  { path: 'role', component: RoleTableComponent },
  { path: 'add-role', component: RoleAddComponent },
  { path: 'add-cage', component: CageAddComponent },
  { path: 'add-animal', component: AnimalAddComponent },
  { path: 'add-health', component: HealthAddComponent },
  { path: 'add-user', component: UserAddComponent },
  { path: 'edit-user', component: UserEditComponent},
  { path: 'edit-cage', component: CageEditComponent},
  { path: 'edit-animal/:id', component: AnimalEditComponent},
  { path: 'edit-health', component: HealthEditComponent},
  { path: 'edit-role', component: RoleEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
