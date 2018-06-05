import { Component, OnInit, trigger, transition, animate, style, state } from '@angular/core';
import { routerTransition } from './../router.transition';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
		'[@slideInOutAnimation]': ''
  },
  animations:[routerTransition]
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
