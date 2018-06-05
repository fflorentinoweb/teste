import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

import { User } from './../models/user';

@Injectable()
export class AuthService {
    public token: string;

    constructor(private http: Http) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    public login(body: User){
        return this.http.post("/Authorization", body)
        .map((resp: Response) => {
            let token = resp.json() && resp.json().accessToken;

            if(token){
                // set token property
                this.token = token;

                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ token: token }));

                // return true to indicate successful login
                return true;
            } else{
                // return false to indicate failed login
                return false;
            }
        });
    }

    public logout(): void {
        // Limpar token remover o usuário do local storage para registrar o usuário
        this.token = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('empresaAssociacao');
    }

    public obterEmpresaAssociacao(){
        return this.http.get("/EmpresaAssociacao")
        .map(res => res.json());
    }

    public gravarParametros(body){
        return this.http.post("/Parametro/Usuario", body)
        .map(res => res.json());
    }

}
