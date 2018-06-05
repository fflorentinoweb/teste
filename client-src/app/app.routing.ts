import { RouterModule } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { ExecucaoDaOsComponent } from './execucao-da-os/execucao-da-os.component';
import { OsMecanicosComponent } from './os-mecanicos/os-mecanicos.component';
import { PainelDeValetasComponent } from './painel-de-valetas/painel-de-valetas.component';
import { AlocacaoOsVeiculoComponent } from './alocacao-os-veiculo/alocacao-os-veiculo.component';
import { CanActivateOsMecanicos } from './can-activate-os-mecanicos';
import { CanDeactivateOsMecanicos } from './can-deactivate-os-mecanicos';
import { AgrupamentoMecanicoComponent } from './agrupamento-mecanico/agrupamento-mecanico.component';
import { ResgistroDePresencaComponent } from './resgistro-de-presenca/resgistro-de-presenca.component';
import { AutenticacaoMecanicoComponent } from './autenticacao-mecanico/autenticacao-mecanico.component';
import { EmpresaFilialGaragemExecucaoDaOsComponent } from './empresa-filial-garagem-execucao-da-os/empresa-filial-garagem-execucao-da-os.component';
import { SelecaoGaragemRegistroPresencaComponent } from './selecao-garagem-registro-presenca/selecao-garagem-registro-presenca.component';



const routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'AutenticacaoMecanico/:garagemId',
        component: AutenticacaoMecanicoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'AlocacaoOsVeiculo/:garagemId',
        component: AlocacaoOsVeiculoComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'cadastrar',
        component: CadastrarComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'EmpresaFilialGaragemExecucaoDaOs',
        component: EmpresaFilialGaragemExecucaoDaOsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'SelecionaGaragem',
        component: SelecaoGaragemRegistroPresencaComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'ExecucaoDaOs/:osId',
        component: ExecucaoDaOsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'OsMecanicos/:osId/:funcionarioId',
        component: OsMecanicosComponent,
        canActivate: [CanActivateOsMecanicos],
        canDeactivate: [CanDeactivateOsMecanicos]
    },
    {
        path: 'PainelDeValetas',
        component: PainelDeValetasComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'AgrupamentoMecanico',
        component: AgrupamentoMecanicoComponent
    },
    {
        path: 'RegistroPresenca',
        component: ResgistroDePresencaComponent
    },
    { path: '**', component: LoginComponent }
];

export const AppRouting = RouterModule.forRoot(routes, {
  useHash: true
});
