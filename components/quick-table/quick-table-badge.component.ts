import {Component, Input} from '@angular/core';
import {QuickTableCell} from "./quick-table-cell.component";

@Component({
    selector: 'quick-table-badge',
    templateUrl: 'quick-table-badge.component.html',
    providers: [{provide: QuickTableCell, useExisting: QuickTableBadgeComponent}]
})
export class QuickTableBadgeComponent extends QuickTableCell {
    @Input()
    public backgroundColor: string;

    @Input()
    public color: string;
}
