import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HealthTableComponent } from './components/health-table/health-table.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { AnimalTableComponent } from './components/animal-table/animal-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { RoleTableComponent } from './components/role-table/role-table.component';
const routes: Routes = [
  { path: 'health', component: HealthTableComponent },
  { path: 'data', component: DataTableComponent },
  { path: 'animal', component: AnimalTableComponent },
  { path: 'user', component: UserTableComponent },
  { path: 'role', component: RoleTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
