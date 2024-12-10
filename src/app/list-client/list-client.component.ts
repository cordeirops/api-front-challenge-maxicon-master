import { Component, OnInit,ChangeDetectorRef  } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-client',
  templateUrl: './list-client.component.html',
  styleUrls: ['./list-client.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class ListClientComponent implements OnInit {
  clients: Client[] = [];

  constructor(private clientService: ClientService, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getClients().subscribe(
      (data) => {
        console.log(data);  // Verifique o que está sendo retornado pela API
        this.clients = data;  // Atualiza a lista de clientes
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
  }

  editClient(id: number): void {
    this.router.navigate(['/update-client', id]);  // Passa o id para a rota de atualização
  }
  
  
  

  deleteClient(id: number): void {
    if (id != null) {
      if (confirm('Tem certeza que deseja excluir este cliente?')) {
        this.clientService.deleteClient(id).subscribe(
          () => {
            alert('Cliente excluído com sucesso!');
            this.loadClients();  // Recarrega a lista de clientes
            this.cdr.detectChanges();  // Força a detecção de mudanças
          },
          (error) => {
            console.error('Erro ao excluir cliente:', error);
            alert('Erro ao excluir cliente.');
          }
        );
      }
    } else {
      console.error('Cliente ID não encontrado.');
    }
  }
  
  
}
