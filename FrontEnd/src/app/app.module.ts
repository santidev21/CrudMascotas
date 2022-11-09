import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AemascotaComponent } from './components/aemascota/aemascota.component';
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { DetalleMascotaComponent } from './components/detalle-mascota/detalle-mascota.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    AemascotaComponent,
    ListadoMascotaComponent,
    DetalleMascotaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
