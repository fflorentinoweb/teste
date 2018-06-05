import { Component, OnInit, Input, Output, ViewChild, EventEmitter, SimpleChanges } from '@angular/core';
import { TreeviewI18n, TreeviewItem, TreeviewConfig, DropdownTreeviewComponent, TreeviewHelper } from "ngx-treeview";
import { EmpresaFilialService } from './empresa-filial.service';
import { EmpresaFilialSelect } from './empresa-filial-select';
import { EmpresaFilialDisabledOnSelectorDirective } from './empresa-filial-disabled-on-selector.directive';

@Component({
  selector: 'app-empresa-filial',
  templateUrl: './empresa-filial.component.html',
  styleUrls: ['./empresa-filial.component.scss'],
  providers: [
      { provide: TreeviewI18n, useClass: EmpresaFilialSelect }
  ]
})
export class EmpresaFilialComponent implements OnInit {

    @Input() config: TreeviewConfig;
    @Input() items: TreeviewItem[];
    @Input() dropdownDisabled:boolean = false;
    @Input() value: any;
    @Output() valueChange = new EventEmitter<any>();
    @ViewChild(DropdownTreeviewComponent) dropdownTreeviewComponent: DropdownTreeviewComponent;
    filterText: string;
    private empresaFilialSelect: EmpresaFilialSelect;    

    constructor(
        private service: EmpresaFilialService,
        public i18n: TreeviewI18n
    ) { 
        this.config = TreeviewConfig.create({
            hasAllCheckBox: false,
            hasCollapseExpand: false,
            hasFilter: true,
            maxHeight: 300
        });

        this.empresaFilialSelect = i18n as EmpresaFilialSelect;
    }

    ngOnInit() { }

    ngOnChanges(changes: SimpleChanges) {
        if(!this.value){
            this.selectAll();
        } else{
            this.updateSelectedItem();
        }
    }

    private updateSelectedItem() {
        if(this.items){
            const selectedItem = TreeviewHelper.findItemInList(this.items, this.value);

            if (selectedItem) {
                this.selectItem(selectedItem);
            } else {
                this.selectAll();
            }
        }
    }

    selectAll(){
        const allItem = this.dropdownTreeviewComponent.treeviewComponent.allItem;
        
        allItem.text = "Selecione";

        if (allItem) {
            this.select(allItem);
        }
    }

    obterGaragem(){
        return this.service.obterGaragem();
    }

    obterFuncionario(empresaAssociacaoId, matricula){
        return this.service.obterFuncionario(empresaAssociacaoId, matricula);
    }

    select(item: TreeviewItem) {
        if (item.children === undefined) {
            this.selectItem(item);
        }
    }

    private selectItem(item: TreeviewItem) {
        this.dropdownTreeviewComponent.dropdownDirective.close();

        if (this.empresaFilialSelect.selectedItem !== item) {
            this.empresaFilialSelect.selectedItem = item;
            if (this.value !== item.value) {
                this.value = item.value;
                this.valueChange.emit(item.value);
            }
        }
    }

}
