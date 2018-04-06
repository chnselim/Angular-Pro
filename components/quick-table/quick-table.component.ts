import {
    AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnChanges, Output, QueryList
} from '@angular/core';
import {QuickTableColumnDirective} from './quick-table-column.directive';
import {ComponentBase} from '../base.component';
import {isNullOrUndefined} from "util";
import {QuickSelectItemDirective} from "bng-angular-base/components/quick-select/quick-select-item.directive";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {StorageServiceBase} from "../../services/storage.service";
import {CheckboxFilterModel} from '../../models/checkbox-filter/checkbox-filter.model';

@Component({
    selector: 'quick-table',
    templateUrl: 'quick-table.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickTableComponent
        }]
})
export class QuickTableComponent extends ComponentBase implements OnChanges, AfterContentInit {

    constructor(protected storage_service: StorageServiceBase) {
        super();
    }

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

    @Input('table-tag')
    public table_tag: string;

    @Output('onPageChanged')
    public current_page_changed: EventEmitter<number> = new EventEmitter<number>();

    @ContentChildren(QuickTableColumnDirective)
    public columns: QueryList<QuickTableColumnDirective>;

    public is_request_loading: boolean;

    public index_list = [];

    public sort_by: string;

    public is_column_sort_by_descending: boolean;

    public selected_per_page_number: QuickSelectItemDirective;

    public checkbox_filter_storage_list: CheckboxFilterModel[] = [];

    public selected_checkbox_filter_list: any[] = [];

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

    ngOnChanges() {
        this.checkbox_filter_storage_list = this.storage_service.getCheckboxFilter() || [];
    }

    ngAfterContentInit() {
        this.getIndexNumberList(this.current_page);
        this.selected_per_page_number = {value: this.per_page.toString(), name: this.per_page.toString()};
        this.selected_checkbox_filter_list = this.columns.filter(column => !this.checkbox_filter_storage_list
            .any(filter => filter.table_tag === this.table_tag && filter.columns.contains(column.property))).filter(column => column.visibility_status !== 'hidden');
        this.setCheckboxFilter(this.selected_checkbox_filter_list);
    }

    public checkColumnVisibilityStatus(column) {
        if (this.checkbox_filter_storage_list.any(filter => {
                return filter.table_tag === this.table_tag && filter.columns.contains(column.property)
            })) {
            return false;
        }
        return true;
    }

    public setCheckboxFilter(selected_column_list) {
        const checkbox_filter_storage_save_model: CheckboxFilterModel = new CheckboxFilterModel();
        let selected_columns_property_list: any[] = [];
        let reversed_selected_columns = this.columns.filter(column => !selected_column_list.any(selected_column => selected_column === column));
        if (this.checkbox_filter_storage_list.all(filter => {return this.table_tag !== filter.table_tag})) {
            checkbox_filter_storage_save_model.table_tag = this.table_tag;
            reversed_selected_columns.forEach(selected_column => {
                checkbox_filter_storage_save_model.columns.push(selected_column.property);
            });
            this.checkbox_filter_storage_list.push(checkbox_filter_storage_save_model);
        } else {
            reversed_selected_columns.forEach(selected_column => {
                selected_columns_property_list.push(selected_column.property);
            });
            this.checkbox_filter_storage_list.forEach(filter => {
                if (filter.table_tag === this.table_tag) {
                    filter.columns = selected_columns_property_list || [];
                }
            });
        }
        this.storage_service.setCheckboxFilter(this.checkbox_filter_storage_list);
    }

    public getFilterableColumns() {
        return this.columns.filter(column => column.visibility_status !== 'permanent');
    }
}
