export class Client {
  id?: number;
  name: string;
  age: number;
  email: string;
  cpf: string;

  constructor(name: string = '', age: number = 0, email: string = '', cpf: string = '') {
    this.name = name;
    this.age = age;
    this.email = email;
    this.cpf = cpf;
  }
}
