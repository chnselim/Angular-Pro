import {ContentChild, ContentChildren, Directive, Input, QueryList} from '@angular/core';
import {QuickTableCell} from "./quick-table-cell.component";

@Directive({
    selector: 'quick-table-column'
})
export class QuickTableColumnDirective {
    @Input()
    public title: string;

    @Input()
    public property: string;

    @ContentChild(QuickTableCell)
    public content: QuickTableCell;
}
