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
  public employees: any;
  public isModalOpen = false;
  private loading = loading();
  private userData = JSON.parse(String(sessionStorage.getItem('userData')));
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  async ngOnInit() {
    this.employees = await this.authService.listEmployees(this.userData.companies);
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

  async reload(reload: boolean) {
    if(reload) {
      (await this.loading).present();
      this.employees = await this.authService.listEmployees(this.userData.companies);
      (await this.loading).dismiss();
    }
  }

  async register(){
    const session = JSON.parse(String(sessionStorage.getItem('userData')));
    (await this.loading).present();
    try {
      await this.authService.register({
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        cpf: this.registerForm.value.cpf,
        isAdmin: false,
        companies: session.companies,
      });
      this.registerForm.reset();
      this.setOpen();
      (await this.loading).dismiss();
      return (await presentToast('Usuario cadastrado com sucesso!', 3000, 'bottom', 'success')).present();
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
