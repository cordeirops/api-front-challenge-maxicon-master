import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]

})
export class UpdateClientComponent implements OnInit {
  client: Client = { id: 0, name: '', age: 0, email: '', cpf: '' };
  invalidAge: boolean = false; 

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.loadClientById(id);
  }

  loadClientById(id: number): void {
    this.clientService.getClientById(id).subscribe(
      (client) => {
        this.client = client;
      },
      (error) => {
        console.error('Erro ao carregar cliente:', error);
        alert('Erro ao carregar os dados do cliente.');
      }
    );
  }

  
  validateAge(): void {
    this.invalidAge = this.client.age < 18; 
  }

  // Função para formatar o CPF
  formatCPF(event: any): void {
    let cpf = event.target.value.replace(/\D/g, '');
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11); 
    }

    if (cpf.length <= 3) {
      cpf = cpf.replace(/(\d{1,3})/, '$1');
    } else if (cpf.length <= 6) {
      cpf = cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
    } else if (cpf.length <= 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
    } else if (cpf.length <= 11) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
    }

    event.target.value = cpf;  
  }

  onSubmit(): void {
    if (this.client.id) {
      this.clientService.updateClient(this.client.id, this.client).subscribe(
        () => {
          alert('Cliente atualizado com sucesso!');
          this.router.navigate(['/list-client']);  
        },
        (error) => {
          console.error('Erro ao atualizar cliente:', error);
          alert('Erro ao atualizar cliente.');
        }
      );
    }
  }
}
