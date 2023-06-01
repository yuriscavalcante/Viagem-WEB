import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.page.html',
  styleUrls: ['./employees.page.scss'],
})
export class EmployeesPage implements OnInit {
  public employees = [
    {
      cpf: '390.831.020-25',
      nome: 'funcionario 1',
      email: 'funcionario1@email.com',
      cargo: 'ti'
    },
    {
      cpf: '744.810.610-49',
      nome: 'funcionario 2',
      email: 'funcionario2@email.com',
      cargo: 'rh'
    },
    {
      cpf: '332.658.150-56',
      nome: 'funcionario 3',
      email: 'funcionario3@email.com',
      cargo: 'viagens'
    },
    {
      cpf: '194.947.410-05',
      nome: 'funcionario 4',
      email: 'funcionario4@email.com',
      cargo: 'viagens'
    },
    {
      cpf: '194.947.410-05',
      nome: 'funcionario 5',
      email: 'funcionario5@email.com',
      cargo: 'viagens'
    },
    {
      cpf: '194.947.410-05',
      nome: 'funcionario 6',
      email: 'funcionario6@email.com',
      cargo: 'viagens'
    },
    {
      cpf: '194.947.410-05',
      nome: 'funcionario 7',
      email: 'funcionario7@email.com',
      cargo: 'viagens'
    },
    {
      cpf: '194.947.410-05',
      nome: 'funcionario 8',
      email: 'funcionario8@email.com',
      cargo: 'viagens'
    },
  ]
  constructor() { }

  ngOnInit() {
  }

}
