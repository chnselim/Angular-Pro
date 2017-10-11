import {Component, ContentChildren, EventEmitter, Input, Output, QueryList} from '@angular/core';
import {QuickTableColumnDirective} from './quick-table-column.directive';
import {ComponentBase} from '../base.component';
import {isNullOrUndefined} from "util";
import {QuickSelectItemDirective} from "bng-angular-base/components/quick-select/quick-select-item.directive";

@Component({
    selector: 'quick-table',
    templateUrl: 'quick-table.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickTableComponent
        }]
})
export class QuickTableComponent extends ComponentBase {

    @Input()
    public title: string;

    @Input()
    public source: any[];

    @Input('total-count')
    public total_count: number;

    @Input('per-page')
    public per_page = 20;

    @Input('current-page')
    public current_page = 1;

    @Output('onPageChanged')
    public current_page_changed: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(QuickTableColumnDirective)
    public columns: QueryList<QuickTableColumnDirective>;

    public is_request_loading: boolean;

    public get renderFilter(): boolean {
        return this.columns.some((column) => {
            return column.filter_template != null;
        });
    }

    public get renderPagination(): boolean {
        return this.total_count > this.per_page;
    }

    public changePage(page: number) {
        this.current_page = page;
        this.current_page_changed.emit(page);
    }

    public changePerPage(selected_item: QuickSelectItemDirective) {
        const query_value = selected_item.value;
        this.per_page = parseInt(query_value);
    }
}