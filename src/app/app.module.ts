import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientsComponent } from './clients/clients.component';
import { HomeComponent } from './home/home.component';
import { CreateClientComponent } from './create-client/create-client.component';
import { ListClientComponent } from './list-client/list-client.component';
import { LoanPriceComponent } from './loan-price/loan-price.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ClientService } from './client-service/client.service';
import { LoanComponent } from './loan/loan.component';
import { ListLoanComponent } from './list-loan/list-loan.component';
import { UpdateClientComponent } from './update-client/update-client.component'; // Import the standalone LoanComponent here

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClientsComponent,


    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbDatepickerModule,
    LoanComponent,
    LoanPriceComponent,
    CreateClientComponent,
    ListClientComponent,
    ListLoanComponent,
    UpdateClientComponent,
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]  // Only AppComponent should be bootstrapped here
})
export class AppModule {}
