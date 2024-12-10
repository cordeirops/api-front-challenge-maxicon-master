import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClientsComponent } from './clients/clients.component';
import { LoanComponent } from './loan/loan.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { LoanPriceComponent } from './loan-price/loan-price.component';
import { ListLoanComponent } from './list-loan/list-loan.component';
import { UpdateClientComponent } from './update-client/update-client.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, 
  { path: 'clientes', component: ClientsComponent },
  { path: 'emprestimos', component: LoanComponent },
  { path: 'create-client', component: CreateClientComponent },
  { path: 'list-client', component: ListClientComponent },
  { path: 'update-client/:id', component: UpdateClientComponent },  // Rota para a atualização do cliente
  { path: 'loan-price', component: LoanPriceComponent },
  {path: 'list-loan', component: ListLoanComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
