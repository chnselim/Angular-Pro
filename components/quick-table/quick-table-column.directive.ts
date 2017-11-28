import {ContentChild, Directive, Input, TemplateRef} from '@angular/core';
import {ComponentBase} from '../base.component';

@Directive({
    selector: 'quick-table-column',
})
export class QuickTableColumnDirective {
    @Input()
    public title: string;

    @Input()
    public property: string;

    @Input('sort-by')
    public sort_by: string;

    @ContentChild('filter')
    public filter_template: TemplateRef<ComponentBase>;

    @ContentChild('cell')
    public cell_template: TemplateRef<ComponentBase>;

    public is_column_sort_icon_descending: boolean;
}
