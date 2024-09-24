import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthTableComponent } from './components/health-table/health-table.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
import { RoleAddComponent } from './components/addforms/role-add/role-add.component';
import { CageAddComponent } from './components/addforms/cage-add/cage-add.component';
import { AnimalAddComponent } from './components/addforms/animal-add/animal-add.component';
import { HealthAddComponent } from './components/addforms/health-add/health-add.component';
import { UserAddComponent } from './components/addforms/user-add/user-add.component';
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
  { path: 'add-user', component: UserAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
