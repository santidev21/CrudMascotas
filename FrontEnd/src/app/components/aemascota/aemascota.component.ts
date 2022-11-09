import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-aemascota',
  templateUrl: './aemascota.component.html',
  styleUrls: ['./aemascota.component.css']
})
export class AemascotaComponent implements OnInit{

  loading: boolean = false;
  form: FormGroup;
  id: number;
  operacion: string = "Agregar";

  constructor(private fb: FormBuilder, 
    private _mascotaServices: MascotaService,
    private _snackBar: MatSnackBar,
    private router: Router,
    private aRoute: ActivatedRoute) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      raza: ['', Validators.required],
      color: ['', Validators.required],
      edad: ['', Validators.required],
      peso: ['', Validators.required],
    })
    this.id = Number(this.aRoute.snapshot.paramMap.get('id'));
   }

  ngOnInit(): void {
    if(this.id != 0){
      this.operacion = "Editar";
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id: number){
    this.loading = true;
    this._mascotaServices.getMascota(id).subscribe(data=>{
      this.form.setValue({
        nombre: data.nombre,
        raza: data.raza,
        color: data.color,
        edad: data.edad,
        peso: data.peso
      })
      this.loading = false;
    })
  }
  agregarEditarMascota(){
    // const nombre = this.form.get('nombre')?.value;
    const mascota : Mascota = {
      nombre : this.form.value.nombre,
      raza: this.form.value.raza,
      color: this.form.value.color,
      edad: this.form.value.edad,
      peso: this.form.value.peso,
    }
    if(this.id != 0){
      mascota.id = this.id;
      this.editarMascota(this.id, mascota)
    } else{
      this.agregarMascota(mascota);
    }
  }

  agregarMascota(mascota: Mascota){
    // enviamos al backend
    this._mascotaServices.addMascota(mascota).subscribe(data=>{
      this.mensajeExito("registrada");
      this.router.navigate(['listMascotas']);
    })
  }
  editarMascota(id: number, mascota: Mascota){
    this.loading = true;
    this._mascotaServices.updateMascota(id, mascota).subscribe(()=>{
      this.loading = false;
      this.mensajeExito("actualizada");
      this.router.navigate(['listMascotas']);
    });
  }
  mensajeExito(texto: string){
    this._snackBar.open(`La mascota fue ${texto} exitosamente`, "",{
      duration: 2000,
      horizontalPosition: 'right'
    });
  }
}
