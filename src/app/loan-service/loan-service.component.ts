import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Client } from '../client-model/client.model';

export interface Loan {
  date_start: string;
  amount_pv: number | null;
  fees_i: number | null;
  period_n: number | null;
  ptax: number | null;
  currency: string;
  loanType: string;
  client_id: Client["id"] | null;
}

@Injectable({
  providedIn: 'root'
})

export class LoanService {

  constructor(private http: HttpClient) { }


  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`http://localhost:8080/clients`);
  }

  getLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`http://localhost:8080/loan/list-loan`);
  }
  

  getCurrencies(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/currency/get-currencies`);
  }

  getTypes(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/loan/types`);
  }

  getPtax(currency: string, date: string): Observable<number | null> {
    const ptaxDTO = { currency, date };
    return this.http.post<any>(`http://localhost:8080/currency/get-ptax`, ptaxDTO).pipe(
      map(response => {
        if (response && Array.isArray(response) && response.length > 0) {
          // Acessa o primeiro item do array, que contém os dados relevantes
          const fechamento = response.find(
            (item: any) => item.tipoBoletim === 'Fechamento PTAX'
          );
          return fechamento ? fechamento.cotacaoVenda : null;
        }
        return null; // Retorna null se não houver resultados
      })
    );
  }

  // Método para criar um novo empréstimo
  calculateLoanPrice(loan: Loan): Observable<Loan> {
    const url = 'http://localhost:8080/loan/calculate-price';
    return this.http.post<Loan>(url, loan);
  }

  // Método para criar um novo empréstimo
  saveLoan(loan: Loan): Observable<Loan> {
    const url = 'http://localhost:8080/loan/save-loan';
    return this.http.post<Loan>(url, loan);
  }

  deleteLoan(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/loan/${id}`);
  }

}


