import {Component, ContentChildren, Input, QueryList} from '@angular/core';
import {QuickTableColumnDirective} from "./quick-table-column.directive";

@Component({
    selector: 'quick-table',
    templateUrl: 'quick-table.component.html'
})
export class QuickTableComponent {
    @Input()
    public title: string;

    @Input()
    public contents: any[];

    @ContentChildren(QuickTableColumnDirective)
    public columns: QueryList<QuickTableColumnDirective>;
}
