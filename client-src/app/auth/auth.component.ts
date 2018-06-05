import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, keyframes } from '@angular/animations';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service'
import { User } from './../models/user';

import { EmpresaFilialComponent } from './../empresa-filial/empresa-filial.component';
import { DialogMenuGestorComponent } from '../dialog-menu-gestor/dialog-menu-gestor.component';
import { AppComponent } from './../app.component';

import { Globals } from './../globals';
import { Apontador } from '../models/apontador';
import { ApontadorConteudo } from './../models/apontador-conteudo';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition('void => *', [
        animate('300ms ease-in', keyframes([
          style({opacity: 0, transform: 'translateY(35px)',  offset: 0.3}),
          style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
        ]))
      ])
    ])
  ],
  providers: [EmpresaFilialComponent,DialogMenuGestorComponent]
})

export class AuthComponent implements OnInit {
  @ViewChild('textInput') textInput;

  submitted: boolean = false;
  ativouCapsLock: boolean = false;  
  user: User;  
  process = false;
  usuarioSenhaInvalido = false;
  showAuth: boolean = false;
  popupVisible: boolean;
  cleanText: boolean;
  apontadorParam: Apontador;
  apontadorConteudo: ApontadorConteudo;

  constructor(
    private router: Router,
    private authService: AuthService,
    private globals: Globals,
    public appComponent: AppComponent) { 
      this.popupVisible = false;
      this.cleanText = false;
    }

  ngOnInit() {
    // reset login status
    this.authService.logout();
    this.user = new User();

    this.apontadorParam = new Apontador();
    this.apontadorConteudo = new ApontadorConteudo()
  }

  ngAfterViewChecked(){
    this.globals.processSpinner = false
  }

  login(form: FormGroup) {
    this.usuarioSenhaInvalido = false;
    this.submitted = true;

    if(form.valid){
      this.process = true;

      this.authService.login(this.user)
      .subscribe(res => {
        if(res){
          // login successful
          this.showAuth = true;
          this.process = false;
          
          this.appComponent.openMenu();   
          this.globals.processSpinner = false     
        } else{
          // login failed
          this.usuarioSenhaInvalido = true;
          this.process = false;
        }
      });
    }
  }



  onKeyPress(){
    this.usuarioSenhaInvalido = false;
  }

  capsLockEvent(e){
    this.ativouCapsLock = e;
  }

  onFocus(){
    this.popupVisible = true;
  }

  onBlur(){
    setTimeout(()=>{
      this.popupVisible = false;
    }, 500);
  }

  onClean(){
    this.cleanText = false;
    this.textInput.nativeElement.value = "";
  }
  onKeypress(e){
    if(e.target.value.length > 0){
      this.cleanText = true;
    } else{
      this.cleanText = false;
    }
  }
}
