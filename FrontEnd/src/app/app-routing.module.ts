import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AemascotaComponent } from './components/aemascota/aemascota.component';
import { DetalleMascotaComponent } from './components/detalle-mascota/detalle-mascota.component';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';

const routes: Routes = [
  {path: '', redirectTo: 'listMascotas', pathMatch: "full"},
  {path: 'listMascotas', component: ListadoMascotaComponent},
  {path: 'agregarMascota', component: AemascotaComponent},
  {path: 'verMascota/:id', component: DetalleMascotaComponent},
  {path: 'editarMascota/:id', component: AemascotaComponent},
  {path: '**', redirectTo: 'listMascotas', pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
