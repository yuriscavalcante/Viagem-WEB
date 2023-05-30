import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { presentToast } from 'src/app/shared/toast';
import { CompanyService } from 'src/app/services/company.service';
import { LoadingController } from '@ionic/angular';
import { loading } from 'src/app/shared/loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isLogin = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private companyService: CompanyService
  ) { }
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  registerForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    fullName: ['', Validators.required],
    cpf: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confPassword: ['', [Validators.required, Validators.minLength(8)]],
    cnpj: ['', Validators.required],
    socialName: ['', Validators.required],
    acronym: [''],
    size: [''],
  });

  private loading = loading();

  ngOnInit() {
  }

  async login() {
    if (this.loginForm.status === 'INVALID') {
      return (await presentToast('Preencha todos os campos', 3000, 'bottom', 'danger')).present();
    }
    (await this.loading).present();
    const login = await this.authService.login(this.loginForm.value);
    login.subscribe(res => {
      sessionStorage.setItem('userData', JSON.stringify(res));
    })
    this.loginForm.reset();
    (await this.loading).dismiss();
    this.router.navigate(['home']);
  }
  async register() {
    if (this.registerForm.status === 'INVALID') {
      return (await presentToast('Campos marcados com * são obrigatorios', 3000, 'bottom', 'danger')).present();
    }
    if (this.registerForm.value.password !== this.registerForm.value.confPassword) {
      return (await presentToast('Senhas não combinam!', 3000, 'bottom', 'danger')).present();
    }

    (await this.loading).present()

    const user = await this.authService.register({
      fullName: this.registerForm.value.fullName,
      email: this.registerForm.value.email,
      cpf: this.registerForm.value.cpf,
      password: this.registerForm.value.password,
    });
    await this.companyService.createCompany({
      cnpj: String(this.registerForm.value.cnpj),
      size: String(this.registerForm.value.size),
      social_name: String(this.registerForm.value.socialName),
      acronym: (String(this.registerForm.value.acronym)),
      owner: user,
      createAt: new Date(),
      updatedAt: new Date()
    });
    this.changeForm();
    this.registerForm.reset();
    (await this.loading).dismiss();
  }

  changeForm() {
    this.isLogin = !this.isLogin;
  }

}
