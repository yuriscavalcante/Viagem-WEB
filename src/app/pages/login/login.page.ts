import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loading } from 'src/app/shared/loading';
import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';

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
    private router: Router
  ) { }
  loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })
  registerForm = this.formBuilder.group({
    email: ['', Validators.required],
    fullName: ['', Validators.required],
    cpf: ['', Validators.required],
    password: ['', Validators.required],
    confPassword: ['', Validators.required],
    cnpj: ['', Validators.required],
    socialName: ['', Validators.required],
    acronym: [''],
    size: ['', Validators.required],
  })


  ngOnInit() {
  }

  async login() {
    (await loading()).present();
    const login = await this.authService.login(this.loginForm.value);
    login.subscribe(res => {
      sessionStorage.setItem('userData', JSON.stringify(res));
    })
    this.loginForm.reset();
    (await loading()).dismiss();
    this.router.navigate(['home']);
  }
  async register() {
    console.log(this.registerForm.value)
    // (await loading()).present();

    // const user = await this.authService.register({
      
    // });
  }
  changeForm() {
    this.isLogin = !this.isLogin;
  }

}
