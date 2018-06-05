import { TreeviewItem, TreeviewSelection, TreeviewI18nDefault } from "ngx-treeview";

export class EmpresaFilialSelect extends TreeviewI18nDefault {
    private internalSelectedItem: TreeviewItem;

    set selectedItem(value: TreeviewItem) {
        if (value && value.children === undefined) {
            this.internalSelectedItem = value;
        }
    }

    get selectedItem(): TreeviewItem {
        return this.internalSelectedItem;
    }

    getText(selection: TreeviewSelection): string {
        return this.internalSelectedItem ? this.internalSelectedItem.text : 'Selecione';
    }

    getFilterPlaceholder(): string {
        return 'Pesquisar';
    }

    getFilterNoItemsFoundText(): string {
        return 'Nenhum item encontrado';
    }
}