import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper } from "ngx-treeview";
import { FuncionarioMultiEmpresaService } from './funcionario-multi-empresa.service';
import { DropdownTreeviewSelectI18n } from './../empresa-filial-garagem/dropdown-treeview-select-i18n';

@Component({
  selector: 'app-funcionario-multi-empresa',
  templateUrl: './funcionario-multi-empresa.component.html',
  styleUrls: ['./funcionario-multi-empresa.component.scss'],
  providers: [
      { provide: TreeviewI18n, useClass: DropdownTreeviewSelectI18n }
  ]
})
export class FuncionarioMultiEmpresaComponent implements OnInit {

  @Input() config: TreeviewConfig;
  @Input() items: TreeviewItem[];
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();
  @Input() funcionariosMultiEmpresa:any;
  @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;

  filterText: string;
  private dropdownTreeviewSelectI18n: DropdownTreeviewSelectI18n;

  constructor(
      private service: FuncionarioMultiEmpresaService,
      public i18n: TreeviewI18n
  ) { 
      this.config = TreeviewConfig.create({
          hasAllCheckBox: false,
          hasCollapseExpand: false,
          hasFilter: true,
          maxHeight: 300
      });

      this.dropdownTreeviewSelectI18n = i18n as DropdownTreeviewSelectI18n;
  }

  ngOnInit() {  }

  obterEmpresaAssociacao(){
    this.items = this.funcionariosMultiEmpresa;
  }

  select(item: TreeviewItem) {
      if (item.children === undefined) {
          this.selectItem(item);
      }
  }

  private selectItem(item: TreeviewItem) {
      this.dropdownTreeviewComponent.dropdownDirective.close();
      if (this.dropdownTreeviewSelectI18n.selectedItem !== item) {
          this.dropdownTreeviewSelectI18n.selectedItem = item;
          if (this.value !== item.value) {
              this.value = item.value;
              this.valueChange.emit(item.value);
          }
      }
  }

}
