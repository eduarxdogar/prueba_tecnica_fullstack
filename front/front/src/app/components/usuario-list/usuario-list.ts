import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router,RouterLink } from '@angular/router';
import { Api } from '../../services/api';
import { Usuario } from '../../models/usuario';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './usuario-list.html',
  styleUrl: './usuario-list.css'
})
export class UsuarioListComponent implements OnInit {

  private apiService = inject(Api);
  private router = inject(Router);

  public displayedColumns: string[] = ['id', 'nombre', 'correo', 'edad', 'acciones'];
  
  public dataSource: Usuario[] = [];

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.apiService.getUsuarios().subscribe(data => {
      this.dataSource = data;
    });
  }

  editarUsuario(id: number): void {
    this.router.navigate(['/editar-usuario', id]);
  }

  eliminarUsuario(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.apiService.deleteUsuario(id).subscribe(() => {
        this.cargarUsuarios();
      });
    }
  }
}
