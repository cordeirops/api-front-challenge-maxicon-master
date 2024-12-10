import { Component, OnInit } from '@angular/core';
import { Loan, LoanService } from '../loan-service/loan-service.component'; // Make sure the path is correct
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';



interface Currency {
  simbolo: string;
  nomeFormatado: string;
}

interface PtaxItem {
  paridadeCompra: number;
  paridadeVenda: number;
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHoraCotacao: string;
  tipoBoletim: string;
  type: string;
}

@Component({
    selector: 'app-loan-price',
    imports: [CommonModule, FormsModule],
    templateUrl: './loan-price.component.html',
    styleUrls: ['./loan-price.component.css']
})
export class LoanPriceComponent implements OnInit {

  // Inicializando diretamente na declaração
  minDate: string = '';
  currentDate: string = '';
  type: string[] = [];
  selectedType: string = '';

  clientOptions: { id: number; name: string }[] = []; // Lista de opções de cliente
  selectedClientId: number | null = null; // ID do cliente selecionado


  currencies: Currency[] = [];
  selectedCurrency: string = '';
  ptax: number | null = null; // Certifique-se de que a variável "ptax" esteja definida

  amount_pv: number | null = null;
  fees_i: number | null = null;
  period_n: number | null = null;

  currency: string = '';


  amount_pvFormatted = ''; // Valor formatado para exibição
  feesIFormatted = ''; // Taxa de juros formatada para exibição

  loanResult: any = null; // Adicionando a variável para armazenar o resultado

  validationErrors: { [key: string]: string } = {};


  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    // Define a data mínima e a data atual
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.currentDate = this.minDate; // A data atual
    this.fees_i = null;
    this.period_n = null;

    this.loanService.getClients().subscribe(
      (clients) => {
        this.clientOptions = clients.map((client: any) => ({
          id: client.id,
          name: client.name,
        }));
        console.log('Clientes carregados:', this.clientOptions);
      },
      (error) => {
        console.error('Erro ao carregar clientes:', error);
      }
    );
    

    this.loanService.getTypes().subscribe(
      (data: string[]) => {
        console.log('Tipos de empréstimo:', data);
        this.type = data; // data deve ser um array de strings
      },
      (error) => {
        console.error('Erro ao buscar tipos de empréstimo:', error);
        this.type = []; // Garanta que seja um array vazio em caso de erro
      }
    );

    this.loanService.getCurrencies().subscribe(
      (data) => {
        console.log('Moedas recebidas:', data);  // Verifique o que está sendo retornado
        this.currencies = data;  // Armazena a lista de moedas
      },
      (error) => {
        console.error('Erro ao buscar moedas:', error);
      }
    );
  }

  onSubmit() {
    // Resetar erros anteriores
    this.validationErrors = {};
  
    if (!this.currentDate) this.validationErrors['currentDate'] = 'Data não preenchida.';
    if (!this.selectedClientId) this.validationErrors['selectedClientId'] = 'Cliente não selecionado.';
    if (!this.selectedType) this.validationErrors['selectedType'] = 'Tipo de empréstimo não selecionado.';
    if (!this.selectedCurrency) this.validationErrors['selectedCurrency'] = 'Moeda não selecionada.';
    if (this.ptax === null) this.validationErrors['ptax'] = 'PTAX não preenchido.';
    if (this.period_n === null) this.validationErrors['period_n'] = 'Período não preenchido.';
    if (this.amount_pv === null) this.validationErrors['amount_pv'] = 'Valor presente não preenchido.';
    if (this.fees_i === null) this.validationErrors['fees_i'] = 'Taxa de juros não preenchida.';
  
  if (Object.keys(this.validationErrors).length > 0) {
    let errorMessages = Object.values(this.validationErrors).join('\n');
    alert('Por favor, preencha todos os campos obrigatórios:\n' + errorMessages);
    return;
  }
  
    this.calculateLoan();
  }
  


  calculateLoan() {
    if (
      !this.currentDate ||
      !this.selectedClientId ||
      !this.selectedType ||
      !this.selectedCurrency ||
      this.ptax === null ||
      this.period_n === null ||
      this.amount_pv === null ||
      this.fees_i === null
    ) {
      alert('Por favor, preencha todos os campos obrigatórios antes de calcular.');
      return;
    }
  
    // Cria o objeto Loan com os dados fornecidos
    const loan: Loan = {
      date_start: this.currentDate,
      amount_pv: this.amount_pv,
      fees_i: this.fees_i,
      period_n: this.period_n,
      ptax: this.ptax,
      currency: this.selectedCurrency,
      loanType: this.selectedType,
      client_id: this.selectedClientId,
    };
  
    console.log('Envio para API:', loan);
  
    // Chama o método do serviço para calcular o preço do empréstimo
    this.loanService.calculateLoanPrice(loan).subscribe(
      (result) => {
        this.loanResult = result; // Atualizando o loanResult com a resposta
        console.log('Resultado do empréstimo:', this.loanResult);
      },
      (error) => {
        console.error('Erro ao calcular o empréstimo:', error);
      }
    );
  }
  

  onClick() {
  
    console.log('Envio para API no onClick:', this.loanResult); // Logando o objeto antes de enviar
  
    // Chama o serviço para salvar o empréstimo
    this.loanService.saveLoan(this.loanResult).subscribe(
      (response) => {
        alert('Empréstimo salvo com sucesso!');
        console.log('Empréstimo salvo com sucesso:', response);
        location.reload();  // Isso irá atualizar a página
              },
      (error) => {
        alert('Erro ao salvar o empréstimo!');
        console.error('Erro ao salvar o empréstimo:', error);
      }
    );
  }

  saveLoan() {
    // Lógica para salvar o empréstimo
    console.log('Empréstimo salvo!');
  }

  // Chama o serviço para pegar a PTAX
  onCurrencyChange() {
    if (!this.currentDate || !this.selectedCurrency) {
      console.log('Selecione uma moeda e uma data válida.');
      return;
    }
  
    // Formatar a data para o formato MM-dd-yyyy
    const date = new Date(this.currentDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${month}-${day}-${year}`;
  
    console.log('Formatted Date:', formattedDate);
  
    // Chama o serviço para obter o PTAX
    this.loanService.getPtax(this.selectedCurrency, formattedDate).subscribe(
      (response: number | null) => {
        this.ptax = response; // Atualiza o valor de "ptax"
        console.log('PTAX (Fechamento):', this.ptax);
      },
      error => {
        console.error('Erro ao buscar PTAX:', error);
        this.ptax = null; // Define como null em caso de erro
      }
    );
  }

  onLoanTypeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedType = target.value; // Atualiza o tipo de empréstimo selecionado
    console.log('Tipo de Empréstimo Selecionado:', this.selectedType);
  }

  onClientChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const value = target.value ? Number(target.value) : null; // Converte o valor para número
    this.selectedClientId = value; // Atribui o ID selecionado
    console.log('Cliente Selecionado:', this.selectedClientId);
  }


  // Manipulador de entrada para campos numéricos formatados
  // Manipulador de entrada
  onInputCurrency(event: Event, field: 'amount_pv' | 'fees_i'): void {
    const input = event.target as HTMLInputElement;
  
    const rawValue = input.value.replace(/[^\d,]/g, '');
  
    if (field === 'amount_pv') {
      this.amount_pvFormatted = rawValue;
    } else if (field === 'fees_i') {
      this.feesIFormatted = rawValue;
    }
  }
  
  onBlurCurrency(field: 'amount_pv' | 'fees_i'): void {
    let rawValue: string;
    if (field === 'amount_pv') {
      rawValue = this.amount_pvFormatted.replace(/\./g, '').replace(',', '.');
    } else {
      rawValue = this.feesIFormatted.replace(/\./g, '').replace(',', '.');
    }
  
    const numericValue = parseFloat(rawValue);
  
    if (!isNaN(numericValue)) {
      if (field === 'amount_pv') {
        this.amount_pv = numericValue;
        this.amount_pvFormatted = this.formatDisplayValue(numericValue);
      } else if (field === 'fees_i') {
        this.fees_i = numericValue;
        this.feesIFormatted = this.formatDisplayValue(numericValue);
      }
    } else {
      if (field === 'amount_pv') {
        this.amount_pv = null;
        this.amount_pvFormatted = '';
      } else if (field === 'fees_i') {
        this.fees_i = null;
        this.feesIFormatted = '';
      }
    }
  }

  // Formata o valor para exibição (ex.: 1.234,56)
  formatDisplayValue(value: number | null): string {
    if (value === null) return '';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  }
  
  
}