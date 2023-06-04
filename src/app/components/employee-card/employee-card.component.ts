import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { loading } from 'src/app/shared/loading';
import { presentToast } from 'src/app/shared/toast';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employees: any;
  @Output() isReloadEvent = new EventEmitter<boolean>();
  public isModalOpen = false;
  private loading = loading();
  public registerForm: any;
  public isAlertOpen = false;
  public header = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() { }

  setOpen() {
    this.registerForm = this.formBuilder.group({
      email: [this.employees.email, [Validators.required, Validators.email]],
      fullName: [this.employees.fullName, Validators.required],
      cpf: [this.employees.cpf, [Validators.required, Validators.minLength(11), Validators.maxLength(11)]],
      cargo: ['', [Validators.required]],
      equipe: [''],
      company: [''],
      isAdmin: [false]
    });
    this.isModalOpen = !this.isModalOpen;
  }

  openAlert() {
    this.isAlertOpen = true;
    if (this.employees.isActive) return this.header = 'Quer mesmo desativar o usuario?';
    return this.header = 'Quer mesmo reativar o usuario?';
  }

  public alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Confirmar',
      role: 'confirm',
      handler: async () => {
        await this.isActive();
      },
    },
  ];


  async isActive() {
    (await this.loading).present();
    try {
      if (this.employees.isActive) {
        await this.authService.isActive(this.employees.uid, !this.employees.isActive);
        (await this.loading).dismiss();
        this.isReloadEvent.emit(true);
        return;
      }
      await this.authService.isActive(this.employees.uid, true);
      (await this.loading).dismiss();
      this.isReloadEvent.emit(true);
      return;
    }catch (e: any) {
      console.error(e);
      (await this.loading).dismiss();
      return (await presentToast('Erro ao validar dados', 3000, 'bottom', 'danger')).present();
    }
  }

  async update() {
    const session = JSON.parse(String(sessionStorage.getItem('userData')));
    try {
      (await this.loading).present();
      await this.authService.updateUser(this.employees.uid, {
        fullName: this.registerForm.value.fullName,
        email: this.registerForm.value.email,
        cpf: this.registerForm.value.cpf,
        isAdmin: false,
        companies: session.companies,
      });
      this.registerForm.reset();
      this.setOpen();
      (await this.loading).dismiss();
      this.isReloadEvent.emit(true);
      return (await presentToast('Usuario atualizado com sucesso!', 3000, 'bottom', 'success')).present();
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
