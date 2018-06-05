import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgPipesModule} from 'ngx-pipes';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule, RequestOptions, XHRBackend} from '@angular/http';
import {Router} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExpansionPanelsModule} from 'ng2-expansion-panels';
import {TextMaskModule} from 'angular2-text-mask';
import {SwiperModule} from 'angular2-useful-swiper';
import {Ng2ScrollimateModule} from 'ng2-scrollimate';
import {CurrencyMaskModule} from "ng2-currency-mask";
import {DragulaModule} from 'ng2-dragula/ng2-dragula';
import {TreeviewModule} from 'ngx-treeview';
import * as Hammer from 'hammerjs';
import {breakpointsProvider} from 'angular-breakpoints';

import {
  MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdChipsModule,
  MdCoreModule, MdDatepickerModule, MdDialogModule, MdExpansionModule, MdGridListModule, MdIconModule, MdInputModule,
  MdListModule, MdMenuModule, MdNativeDateModule, MdPaginatorModule, MdProgressBarModule, MdProgressSpinnerModule,
  MdRadioModule, MdRippleModule, MdSelectModule, MdSidenavModule, MdSliderModule, MdSlideToggleModule,
  MdSnackBarModule, MdSortModule, MdTableModule, MdTabsModule, MdToolbarModule, MdTooltipModule
} from '@angular/material';
import { NgVirtualKeyboardModule }  from '@protacon/ng-virtual-keyboard';
import {
  DxAccordionModule, DxDataGridModule, DxLookupModule, DxPopoverModule, DxPopupModule, DxSelectBoxModule,
  DxTagBoxModule, DxTemplateModule, DxTextBoxModule, DxTreeViewModule, DxValidationSummaryModule, DxValidatorModule
} from 'devextreme-angular';

import {httpFactory} from "./http.factory";
import {
  ActiveCapsLock, BgmMaskCurrencyDirective, BgmMaskDirective, decimalsDirective, OnlyNumbersDirective,
  OnlyNumbersMessage
} from './directives';
//ROUTERS
import {AppRouting} from './app.routing';
//COMPONENT
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {TabsOverviewComponent} from './tabs-overview/tabs-overview.component';
import {FullscreenComponent} from './fullscreen/fullscreen.component';
import {LogoutComponent} from './logout/logout.component';
import {ExecucaoDaOsComponent} from './execucao-da-os/execucao-da-os.component';
import {CadastroDeValetaComponent} from './cadastro-de-valeta/cadastro-de-valeta.component';
import {CadastroDeGrupoDeValetaComponent} from './cadastro-de-grupo-de-valeta/cadastro-de-grupo-de-valeta.component';
import {ListaMecanicosComponent} from './lista-mecanicos/lista-mecanicos.component';
import {AdicionarFuncionarioComponent} from './adicionar-funcionario/adicionar-funcionario.component';
import {PausarOsComponent} from './pausar-os/pausar-os.component';
import {CronometroComponent} from './cronometro/cronometro.component';
import {OsMecanicosComponent} from './os-mecanicos/os-mecanicos.component';
import {DialogResultErrorComponent} from './dialog-result-error/dialog-result-error.component';
import {DialogCadastroDeValetaComponent} from './dialog-cadastro-de-valeta/dialog-cadastro-de-valeta.component';
import {DialogCadastroDeGrupoDeValetaComponent} from './dialog-cadastro-de-grupo-de-valeta/dialog-cadastro-de-grupo-de-valeta.component';
import {DialogSolucaoComponent} from './dialog-solucao/dialog-solucao.component';
import {DialogConfirmComponent} from './dialog-confirm/dialog-confirm.component';
import {DialogAutenticacaoFuncionarioComponent} from './dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.component';
import {DialogEncerramentoOsPendenciaComponent} from './dialog-encerramento-os-pendencia/dialog-encerramento-os-pendencia.component';
import {DialogConsultaSolucaoComponent} from './dialog-consulta-solucao/dialog-consulta-solucao.component';
import {DialogConfiguracoesVelatasComponent} from './dialog-configuracoes-velatas/dialog-configuracoes-velatas.component';
import {DialogSolucaoCarrosselComponent} from './dialog-solucao-carrossel/dialog-solucao-carrossel.component';
import {DialogCadastroTipoOleoComponent} from './dialog-cadastro-tipo-oleo/dialog-cadastro-tipo-oleo.component';
import {AcoesColetivasComponent} from './acoes-coletivas/acoes-coletivas.component';
import {IniciarTodosServicosComponent} from './iniciar-todos-servicos/iniciar-todos-servicos.component';
import {FinalizarTodosServicosComponent} from './finalizar-todos-servicos/finalizar-todos-servicos.component';
import {PausarTodosServicosComponent} from './pausar-todos-servicos/pausar-todos-servicos.component';
import {DesfazerTodosServicosComponent} from './desfazer-todos-servicos/desfazer-todos-servicos.component';
import {PainelDeValetasComponent} from './painel-de-valetas/painel-de-valetas.component';
import {CadastrarComponent} from './cadastrar/cadastrar.component';
import {AutenticacaoMecanicoComponent} from './autenticacao-mecanico/autenticacao-mecanico.component';
//SERVICE
import {AuthService} from './auth/auth.service';
import {TabsOverviewService} from './tabs-overview/tabs-overview.service';
import {ExecucaoDaOsService} from './execucao-da-os/execucao-da-os.service';
import {OsMecanicosService} from "./os-mecanicos/os-mecanicos.service";
import {DialogConfirmService} from './dialog-confirm/dialog-confirm.service';
import {DialogResultErrorService} from './dialog-result-error/dialog-result-error.service';
import {DialogCadastroDeValetaService} from './dialog-cadastro-de-valeta/dialog-cadastro-de-valeta.service';
import {DialogCadastroDeGrupoDeValetaService} from './dialog-cadastro-de-grupo-de-valeta/dialog-cadastro-de-grupo-de-valeta.service';
import {DialogAutenticacaoFuncionarioService} from './dialog-autenticacao-funcionario/dialog-autenticacao-funcionario.service';
import {DialogSolucaoService} from './dialog-solucao/dialog-solucao.service';
import {DialogEncerramentoOsPendenciaService} from './dialog-encerramento-os-pendencia/dialog-encerramento-os-pendencia.service';
import {PainelDeValetasService} from './painel-de-valetas/painel-de-valetas.service';
import {DialogCadastroTipoOleoService} from './dialog-cadastro-tipo-oleo/dialog-cadastro-tipo-oleo.service';
import {AgrupamentoMecanicoService} from './agrupamento-mecanico/agrupamento-mecanico.service';
import {RegistroDePresencaService} from './resgistro-de-presenca/registro-de-presenca.service';
import {DialogEditarGruposService} from './dialog-editar-grupos/dialog-editar-grupos.service';
import {DialogAtividadesExecutadasService} from './dialog-atividades-executadas/dialog-atividades-executadas.service';
import {AutenticacaoMecanicoService} from './autenticacao-mecanico/autenticacao-mecanico.service';
import {DialogComplementoDefeitoService} from './dialog-complemento-defeito/dialog-complemento-defeito.service';
import { DialogSolucaoCarouselService } from './dialog-solucao-carrossel/dialog-solucao-carousel.service'

import {AuthGuard} from './auth/auth.guard';
import {CanActivateOsMecanicos} from './can-activate-os-mecanicos';
import {CanDeactivateOsMecanicos} from './can-deactivate-os-mecanicos';
//import it to change locale and load localization messages
import {loadMessages, locale} from 'devextreme/localization';
import {AutosizeDirective} from './autosize.directive';
import {CountdownPipe} from './countdown.pipe';
import {AlocacaoOsVeiculoComponent} from './alocacao-os-veiculo/alocacao-os-veiculo.component';
import {AuthComponent} from './auth/auth.component';
import {EmpresaFilialGaragemComponent} from './empresa-filial-garagem/empresa-filial-garagem.component';
import {AgrupamentoMecanicoComponent} from './agrupamento-mecanico/agrupamento-mecanico.component';
import {ResgistroDePresencaComponent} from './resgistro-de-presenca/resgistro-de-presenca.component';
import {DialogAtividadesExecutadasComponent} from './dialog-atividades-executadas/dialog-atividades-executadas.component';
import {EmpresaFilialGaragemService} from './empresa-filial-garagem/empresa-filial-garagem.service';
import {FuncionarioMultiEmpresaService} from './funcionario-multi-empresa/funcionario-multi-empresa.service';
import {DialogConfiguracoesRegistroDePresencaService} from './dialog-configuracoes-registro-de-presenca/dialog-configuracoes-registro-de-presenca.service';
// Globals
import {Globals} from './globals';
import {FuncionarioMultiEmpresaComponent} from './funcionario-multi-empresa/funcionario-multi-empresa.component';
import {EmpresaFilialComponent} from './empresa-filial/empresa-filial.component';
import {EmpresaFilialService} from './empresa-filial/empresa-filial.service';
import {EmpresaFilialDisabledOnSelectorDirective} from './empresa-filial/empresa-filial-disabled-on-selector.directive';
import {EditarGruposComponent} from './editar-grupos/editar-grupos.component';
import {DialogEditarGruposComponent} from './dialog-editar-grupos/dialog-editar-grupos.component';
import {DialogConfiguracoesValetasService} from './dialog-configuracoes-velatas/dialog-configuracoes-valetas.service';
import {DialogConfiguracoesRegistroDePresencaComponent} from './dialog-configuracoes-registro-de-presenca/dialog-configuracoes-registro-de-presenca.component';
import {DialogMenuGestorComponent} from './dialog-menu-gestor/dialog-menu-gestor.component';
import {BtnMenuGestorComponent} from './btn-menu-gestor/btn-menu-gestor.component';
import {EmpresaFilialGaragemExecucaoDaOsComponent} from './empresa-filial-garagem-execucao-da-os/empresa-filial-garagem-execucao-da-os.component';
import {SelecaoGaragemRegistroPresencaComponent} from './selecao-garagem-registro-presenca/selecao-garagem-registro-presenca.component';
import {DialogComplementoDefeitoComponent} from './dialog-complemento-defeito/dialog-complemento-defeito.component';
import {LogoManuComponent} from './logo-manu/logo-manu.component';
import {TipoDeVisualizacaoComponent} from './tipo-de-visualizacao/tipo-de-visualizacao.component';
import {WindowRef} from './os-mecanicos/windowRef.service';

import { LeadingZeros } from './pipes/leading-zeros.pipe';


declare var require: any;
let messagesPtBr = require("./pt-br.json");
loadMessages(messagesPtBr);
//Set locale according the browser language
locale(navigator.language);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FullscreenComponent,
    LogoutComponent,
    ExecucaoDaOsComponent,
    TabsOverviewComponent,
    DialogResultErrorComponent,
    CadastroDeValetaComponent,
    CadastroDeGrupoDeValetaComponent,
    DialogCadastroDeValetaComponent,
    DialogCadastroDeGrupoDeValetaComponent,
    DialogSolucaoComponent,
    OnlyNumbersDirective,
    OnlyNumbersMessage,
    ActiveCapsLock,
    decimalsDirective,
    BgmMaskDirective,
    BgmMaskCurrencyDirective,
    DialogConfirmComponent,
    AutosizeDirective,
    DialogAutenticacaoFuncionarioComponent,
    DialogConsultaSolucaoComponent,
    DialogCadastroTipoOleoComponent,
    ListaMecanicosComponent,
    AdicionarFuncionarioComponent,
    PausarOsComponent,
    CronometroComponent,
    OsMecanicosComponent,
    AcoesColetivasComponent,
    IniciarTodosServicosComponent,
    FinalizarTodosServicosComponent,
    PausarTodosServicosComponent,
    DesfazerTodosServicosComponent,
    DialogEncerramentoOsPendenciaComponent,
    CountdownPipe,
    DialogSolucaoCarrosselComponent,
    CadastrarComponent,
    PainelDeValetasComponent,
    DialogConfiguracoesVelatasComponent,
    AlocacaoOsVeiculoComponent,
    AuthComponent,
    EmpresaFilialGaragemComponent,
    AgrupamentoMecanicoComponent,
    ResgistroDePresencaComponent,
    DialogAtividadesExecutadasComponent,
    FuncionarioMultiEmpresaComponent,
    EmpresaFilialComponent,
    EmpresaFilialDisabledOnSelectorDirective,
    EditarGruposComponent,
    DialogEditarGruposComponent,
    AutenticacaoMecanicoComponent,
    DialogConfiguracoesRegistroDePresencaComponent,
    DialogMenuGestorComponent,
    BtnMenuGestorComponent,
    EmpresaFilialGaragemExecucaoDaOsComponent,
    SelecaoGaragemRegistroPresencaComponent,
    DialogComplementoDefeitoComponent,
    LogoManuComponent, TipoDeVisualizacaoComponent,
    LeadingZeros
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRouting,
    FormsModule,
    Ng2ScrollimateModule,
    TextMaskModule,
    NgPipesModule,
    HttpModule,
    SwiperModule,
    CurrencyMaskModule,
    ExpansionPanelsModule,
    MdAutocompleteModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdCheckboxModule,
    MdChipsModule,
    MdCoreModule,
    MdDatepickerModule,
    MdDialogModule,
    MdExpansionModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdMenuModule,
    MdNativeDateModule,
    MdPaginatorModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,
    MdRadioModule,
    MdRippleModule,
    MdSelectModule,
    MdSidenavModule,
    MdSliderModule,
    MdSlideToggleModule,
    MdSnackBarModule,
    MdSortModule,
    MdTableModule,
    MdTabsModule,
    MdToolbarModule,
    MdTooltipModule,
    DxSelectBoxModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxAccordionModule,
    DxTagBoxModule,
    DxLookupModule,
    DxPopoverModule,
    DxTextBoxModule,
    DxTreeViewModule,
    DxPopupModule,
    DxTemplateModule,
    DragulaModule,
    DxDataGridModule,
    NgVirtualKeyboardModule,
    TreeviewModule.forRoot()
  ],
  providers: [
    {
      provide: Http,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, DialogResultErrorService, Router, Globals]
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: AppModule
    },
    DialogResultErrorService,
    TabsOverviewService,
    ExecucaoDaOsService,
    OsMecanicosService,
    DialogCadastroDeValetaService,
    DialogCadastroDeGrupoDeValetaService,
    DialogConfirmService,
    DialogAutenticacaoFuncionarioService,
    DialogEncerramentoOsPendenciaService,
    DialogCadastroTipoOleoService,
    AutenticacaoMecanicoService,
    DialogSolucaoService,
    AuthGuard,
    CanActivateOsMecanicos,
    CanDeactivateOsMecanicos,
    PainelDeValetasService,
    AuthService,
    AuthGuard,
    AgrupamentoMecanicoService,
    Globals,
    EmpresaFilialGaragemService,
    FuncionarioMultiEmpresaService,
    EmpresaFilialService,
    DialogEditarGruposService,
    RegistroDePresencaService,
    DialogAtividadesExecutadasService,
    Globals,
    breakpointsProvider(),
    DialogConfiguracoesValetasService,
    DialogConfiguracoesRegistroDePresencaService,
    DialogComplementoDefeitoService,
    WindowRef,
    DialogSolucaoCarouselService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogCadastroDeValetaComponent,
    DialogCadastroDeGrupoDeValetaComponent,
    DialogSolucaoComponent,
    DialogResultErrorComponent,
    DialogConfirmComponent,
    DialogAutenticacaoFuncionarioComponent,
    DialogConsultaSolucaoComponent,
    DialogCadastroTipoOleoComponent,
    DialogEncerramentoOsPendenciaComponent,
    DialogSolucaoCarrosselComponent,
    DialogConfiguracoesVelatasComponent,
    DialogEditarGruposComponent,
    DialogAtividadesExecutadasComponent,
    DialogConfiguracoesRegistroDePresencaComponent,
    DialogComplementoDefeitoComponent
  ]
})
export class AppModule extends HammerGestureConfig {
  overrides = <any>{
    'swipe': {direction: Hammer.DIRECTION_ALL}
  };
}
