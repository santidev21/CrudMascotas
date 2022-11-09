import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-detalle-mascota',
  templateUrl: './detalle-mascota.component.html',
  styleUrls: ['./detalle-mascota.component.css']
})
export class DetalleMascotaComponent implements OnInit {

  id : number;
  mascota!: Mascota;
  loading: boolean = false;

  constructor(private _mascotaServices: MascotaService,
    private aRoute: ActivatedRoute) { 
      this.id = parseInt(this.aRoute.snapshot.paramMap.get('id')!);
      
    }

  ngOnInit(): void {
    this.obtenerMascota();
  }

  obtenerMascota(){
    this.loading = true;
    this._mascotaServices.getMascota(this.id).subscribe(data=>{
      this.mascota = data;
      this.loading = false;
    })
  }
}
