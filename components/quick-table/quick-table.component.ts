import {
    AfterViewInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList
} from '@angular/core';
import {QuickTableColumnDirective} from './quick-table-column.directive';
import {ComponentBase} from '../base.component';
import {isNullOrUndefined} from "util";
import {QuickSelectItemDirective} from "bng-angular-base/components/quick-select/quick-select-item.directive";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'quick-table',
    templateUrl: 'quick-table.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickTableComponent
        }]
})
export class QuickTableComponent extends ComponentBase implements AfterViewInit {

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

    @Input('show-index-number')
    public show_index_number: boolean = false;

    @Output('onPageChanged')
    public current_page_changed: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(QuickTableColumnDirective)
    public columns: QueryList<QuickTableColumnDirective>;

    public is_request_loading: boolean;

    public index_list = [];

    public sort_by: string;

    public is_column_sort_by_descending: boolean;

    public selected_per_page_number: QuickSelectItemDirective;

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
        this.getIndexNumberList(page);
    }

    public changePerPage(selected_item: QuickSelectItemDirective) {
        this.selected_per_page_number = selected_item;
        const query_value = selected_item.value;
        this.per_page = parseInt(query_value);
        this.current_page = 1;
        this.getIndexNumberList(this.current_page);
    }

    public changeSortType(column) {
        this.sort_by = column.sort_by;
        if (column.is_column_sort_icon_descending) {
            this.is_column_sort_by_descending = false;
            column.is_column_sort_icon_descending = false;
        } else {
            this.is_column_sort_by_descending = true;
            column.is_column_sort_icon_descending = true;
        }
    }

    public getIndexNumberList(current_page: number) {
        this.index_list = [];
        for (let index = 0; index < this.per_page; index++) {
            this.index_list.push((current_page * this.per_page) - (this.per_page - 1) + index)
        }
    }

    ngAfterViewInit() {
        this.getIndexNumberList(this.current_page);
        this.selected_per_page_number = {value: this.per_page.toString(), name: this.per_page.toString()};
    }
}
