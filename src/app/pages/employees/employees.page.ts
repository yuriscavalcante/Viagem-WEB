import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { loading } from 'src/app/shared/loading';
import { presentToast } from 'src/app/shared/toast';

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
  public isModalOpen = false;
  private loading = loading();
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    cpf: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
    cargo: ['', [Validators.required]],
    equipe: [''],
    company: [''],
    isAdmin: [false]
  });

  setOpen() {
    this.isModalOpen = !this.isModalOpen;
  }

  async register(){
    const session = JSON.parse(String(sessionStorage.getItem('userData')));
    
    try {
      await this.authService.register({
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        cpf: this.registerForm.value.cpf,
        isAdmin: false,
        companies: session.companies[0],
      });
      this.registerForm.reset();
      (await this.loading).dismiss();
    } catch (e: any) {
      if (String(e.message).includes('email-already-in-use')) {
        (await this.loading).dismiss();
        return (await presentToast('Email já cadastrado!', 3000, 'bottom', 'danger')).present();
      }
      console.error(e);
      (await this.loading).dismiss();
      return (await presentToast('Erro ao validar dados', 3000, 'bottom', 'danger')).present();
    }
  }

}
