import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: false,
  
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent {
  cadastrarClientes(): void {
    console.log('Navegando para página de cadastro de clientes.');
    // Lógica para redirecionar ou exibir formulário de cadastro
  }

  listarClientes(): void {
    console.log('Navegando para a lista de clientes.');
    // Lógica para redirecionar ou exibir lista de clientes
  }
}
