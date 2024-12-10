import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';  // Importar RouterModule

@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
  imports: [RouterModule]  // Adicionar RouterModule nos imports
})
export class LoanComponent {
}
