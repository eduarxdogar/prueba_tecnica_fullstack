import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Api } from '../../services/api';
import { Usuario } from '../../models/usuario';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-usuario-form',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule],
  templateUrl: './usuario-form.html',
  styleUrl: './usuario-form.css'
})
export class UsuarioFormComponent implements OnInit {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute); 
  private apiService = inject(Api);

  usuarioForm: FormGroup;
  
  public editMode = false;
  private currentUserId: number | null = null;

  constructor() {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      edad: [null, [Validators.required, Validators.min(18)]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.currentUserId = +id; 
        
        this.apiService.getUsuarioById(this.currentUserId).subscribe(usuario => {
          this.usuarioForm.patchValue(usuario); 
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) {
      return; 
    }

    const usuarioData: Usuario = this.usuarioForm.value;

    if (this.editMode && this.currentUserId) {
      this.apiService.updateUsuario(this.currentUserId, usuarioData).subscribe(() => {
        this.router.navigate(['/usuarios']); 
      });
    } else {
      this.apiService.createUsuario(usuarioData).subscribe(() => {
        this.router.navigate(['/usuarios']); 
      });
    }
  }
}
