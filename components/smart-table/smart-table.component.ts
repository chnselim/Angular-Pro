import {
    AfterContentInit, Component, DoCheck, Input, KeyValueDiffers, OnInit, SimpleChanges
} from '@angular/core';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {GeneralAPIServiceBase} from '../../services/general-api.service';
import 'nglinq/linq';
import {QuickTableColumnDirective} from '../quick-table/quick-table-column.directive';
import {StorageService} from '../../../../src/app/services/storage.service';
import {CheckboxFilterModel} from '../../../../src/app/models/common/checkbox-filter/checkbox-filter.model';

@Component({
    selector: 'smart-table',
    templateUrl: '../quick-table/quick-table.component.html',
    providers: [{provide: QuickTableComponent, useExisting: SmartTableComponent}]
})
export class SmartTableComponent extends QuickTableComponent implements OnInit, DoCheck, AfterContentInit {

    public key_value_differ: any;

    public constructor(private differs: KeyValueDiffers, private storage_service: StorageService) {
        super();
        this.key_value_differ = this.differs.find(this.query_parameters).create(null);
    }

    @Input('api-source')
    public api_source: GeneralAPIServiceBase<any>;

    @Input('query-parameters')
    public query_parameters = new Map<string, string>();

    @Input()
    public tag: string = 'all';

    @Input('source-selector')
    public source_selector = null;

    @Input('table-tag')
    public table_tag: string;

    public checkbox_filter_list: CheckboxFilterModel[] = [];

    public changePage(page: number) {
        super.changePage(page);
        this.refresh();
    }

    public changeSortType(column: QuickTableColumnDirective) {
        super.changeSortType(column);
        this.refresh();
    }

    public changePerPage(per_page) {
        super.changePerPage(per_page);
        this.refresh();
    }

    public getSourceFromAPI() {
        this.is_request_loading = true;
        this.api_source
            .getResponseModel(this.current_page, this.per_page, this.query_parameters, this.tag, this.sort_by, this.is_column_sort_by_descending)
            .then(source_response => {
                this.is_request_loading = false;
                let source = source_response.getBody();
                if (this.source_selector != null) {
                    this.source = [];
                    for (let content of source) {
                        const selected_contents = this.source_selector(content);
                        this.source = this.source.concat(selected_contents);
                    }
                } else {
                    this.source = source;
                }
                this.total_count = parseInt(source_response.getHeaders().get('x-total-count'), 10);
            });
    }

    refresh(): void {
        this.getSourceFromAPI();
    }

    ngOnInit() {
        this.refresh();
        this.key_value_differ.diff(this.query_parameters);
        if (this.storage_service.getCheckboxFilter()) {
            this.checkbox_filter_list = this.storage_service.getCheckboxFilter();
        }
    }

    ngAfterContentInit() {
        this.columns.forEach(column => {
            setTimeout(() => Object.assign(column, {'selected': true}));
            this.checkbox_filter_list.forEach(filter => {
                if (filter.table === this.table_tag) {
                    if (!filter.columns.contains(column.property)) {
                        setTimeout(() => Object.assign(column, {'selected': true}));
                    } else {
                        setTimeout(() => Object.assign(column, {'selected': false}));
                    }
                }
            });
        });
    }

    ngDoCheck(): void {
        const key_value_changed = this.key_value_differ.diff(this.query_parameters);
        if (key_value_changed) {
            this.refresh();
        }
    }

    public setCheckboxFilter(column) {
        column['selected'] = !column['selected'];
        if (column['selected']) { // seçtiysek storageden sil
            this.checkbox_filter_list.forEach(filter => {
                if (filter.table === this.table_tag) {
                    filter.columns.splice(filter.columns.indexOf(column.property), 1);
                }
            });
        } else { // seçimi kaldırdıysak storage ekle
            const checkbox_filter: CheckboxFilterModel = new CheckboxFilterModel();
            if (this.checkbox_filter_list.every(filter => {
                    return this.table_tag !== filter.table
                })) { // önceden table ekli dğeilse
                checkbox_filter.table = this.table_tag;
                checkbox_filter.columns.push(column.property);
                this.checkbox_filter_list.push(checkbox_filter);
            } else { // table ekli ancak column ekli değilse
                this.checkbox_filter_list.forEach(filter => {
                    if (filter.table === this.table_tag) {
                        filter.columns.push(column.property);
                    }
                });
            }
        }
        this.storage_service.setCheckboxFilter(this.checkbox_filter_list);
    }
}
