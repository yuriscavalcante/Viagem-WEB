import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
 
  public arr = [
    {
      name: 'teste 1'
    },
    {
      name: 'teste 2'
    },
    {
      name: 'teste 3'
    },
    {
      name: 'teste 4'
    },
    {
      name: 'teste 5'
    }
  ];
  public status = [
    'Finalizado', 'Agendado', 'Em Aguardo'
  ]
  constructor(
  ) { }

  ngOnInit() {
  }

}
