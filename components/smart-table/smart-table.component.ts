import {
    Component, DoCheck, Input, IterableDiffer, IterableDiffers, KeyValueDiffer, KeyValueDiffers, OnInit, QueryList,
    SimpleChanges
} from '@angular/core';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {GeneralAPIServiceBase} from '../../services/general-api.service';
import 'nglinq/linq';
import {QuickTableColumnDirective} from '../quick-table/quick-table-column.directive';
import {StorageServiceBase} from "../../services/storage.service";
import {ActivatedRoute, NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
    selector: 'smart-table',
    templateUrl: '../quick-table/quick-table.component.html',
    providers: [{provide: QuickTableComponent, useExisting: SmartTableComponent}]
})
export class SmartTableComponent extends QuickTableComponent implements OnInit, DoCheck {

    public key_value_differ: any;

    @Input('api-source')
    public api_source: GeneralAPIServiceBase<any>;

    @Input('query-parameters')
    public query_parameters = new Map<string, string>();

    @Input()
    public tag: string = 'all';

    @Input('source-selector')
    public source_selector = null;

    public url_params = JSON.parse(JSON.stringify(this.router['currentUrlTree']['queryParams']));

    public constructor(protected storage_service: StorageServiceBase, private router: Router, private route: ActivatedRoute, private differs: KeyValueDiffers) {
        super(storage_service);
        this.key_value_differ = this.differs.find(this.query_parameters).create(null);
    }

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

    private applyQueryParameters(param) {
        if (this.query_parameters.get(param) !== this.url_params[param]) {
            this.query_parameters.set(param, this.url_params[param]);
        }
    }

    private applyURLParameters() {
        this.query_parameters.set('page', (parseInt(this.query_parameters.get('page')) + 1).toString());
        this.query_parameters.forEach((value, key) => {
            this.url_params[key] = value;
        });
        this.checkDeletableURLParameters();
    }

    private checkDeletableURLParameters() {
        for (let param in this.url_params) {
            if (!this.query_parameters.has(param)) {
                delete this.url_params[param];
            }
        }
    }

    private setDefaultURLParameters() {
        if (!this.url_params['page'] || !this.url_params['per_page']) {
            this.url_params['page'] = this.current_page;
            this.url_params['per_page'] = this.per_page;
        }
    }

    public getSourceFromAPI() {
        this.is_request_loading = true;
        if (this.query_parameters) {
            this.query_parameters.forEach((value,key) => {
                this.url_params[key] = value;
            });
        }
        this.setDefaultURLParameters();
        for (let param in this.url_params) {
            this.applyQueryParameters(param);
            if (!this.has_current_page_or_per_page_changed) {
                this.current_page = parseInt(this.url_params['page']);
                this.per_page = parseInt(this.url_params['per_page']);
            }
        }
        this.router.navigate([], {queryParams: this.url_params});
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
    }

    ngDoCheck(): void {
        const key_value_changed = this.key_value_differ.diff(this.query_parameters);
        if (key_value_changed) {
            this.applyURLParameters();
            this.refresh();
        }
    }
}
