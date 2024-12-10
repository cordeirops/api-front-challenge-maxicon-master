import { Component } from '@angular/core';
import { ClientService } from '../client-service/client.service';
import { Client } from '../client-model/client.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-client',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent {
  client: Client = new Client();  // Cria uma nova instância do cliente
  successMessage: string = ''; // Variável para armazenar mensagem de sucesso
  invalidAge: boolean = false; // Variável para verificar se a idade é inválida

  constructor(private clientService: ClientService) {}

  onSubmit(clientForm: any): void {
    // Verifica se o formulário é válido antes de enviar
    if (clientForm.valid && this.client.age >= 18) {
      this.clientService.createClient(this.client).subscribe(
        (response) => {
          console.log('Cliente cadastrado com sucesso!', response);
          // Exibe o alert de sucesso
          this.successMessage = 'Cliente cadastrado com sucesso!';
          // Limpar o formulário ou redirecionar após sucesso
          this.client = new Client();  // Limpa os dados do formulário
          clientForm.reset(); // Limpa o formulário
        },
        (error) => {
          console.error('Erro ao cadastrar cliente:', error);
          // Exibir mensagem de erro
          this.successMessage = 'Erro ao cadastrar cliente!';
        }
      );
    } else {
      console.log("Erro ao tentar cadastrar, idade inválida ou formulário incompleto");
    }
  }

  // Valida a idade sempre que o usuário digitar
  validateAge(): void {
    this.invalidAge = this.client.age < 18; // Marca como inválido se a idade for menor que 18
  }

  formatCPF(event: any) {
    let cpf = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cpf.length > 11) {
      cpf = cpf.substring(0, 11); // Limita o CPF a 11 caracteres
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

    event.target.value = cpf; // Atualiza o campo com o valor formatado
  }
}

