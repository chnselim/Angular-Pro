import {ActivatedRoute, NavigationEnd, Params, Router} from '@angular/router';
import {Component, DoCheck, Input, KeyValueDiffer, KeyValueDiffers, OnInit} from '@angular/core';
import {GeneralAPIServiceBase} from '../../services/general-api.service';
import {HttpParams} from '@angular/common/http';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {QuickTableColumnDirective} from '../quick-table/quick-table-column.directive';
import {StorageServiceBase} from '../../services/storage.service';
import {UrlUtility} from '../../utilities/url.utility';
import 'nglinq/linq';

@Component({
    selector: 'smart-table',
    templateUrl: '../quick-table/quick-table.component.html',
    providers: [{provide: QuickTableComponent, useExisting: SmartTableComponent}]
})
export class SmartTableComponent extends QuickTableComponent implements OnInit, DoCheck {

    public constructor(protected storage_service: StorageServiceBase,
                       protected route: ActivatedRoute,
                       protected router: Router,
                       private differs: KeyValueDiffers) {
        super(storage_service, route, router);
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.pushURLToQueryParams();
            }
        });
    }

    public initialized: boolean = false;

    public key_value_differ: KeyValueDiffer<any, any> = null;

    @Input('api-source')
    public api_source: GeneralAPIServiceBase<any>;

    @Input()
    public tag: string = 'all';

    @Input('source-selector')
    public source_selector = null;

    @Input('show-url-params')
    public show_url_params: boolean = true;

    @Input('table-route')
    public table_route: string;

    ngOnInit() {
        this.is_request_loading = true;
        this.pushURLToQueryParams();
        this.refresh();
        setTimeout(() => {
            this.initialized = true;
        });
    }

    ngDoCheck(): void {
        if (this.isQueryParamsChanged && this.initialized) {
            this.refresh();
        }
    }

    refresh(): void {
        this.getSourceFromAPI();
        if (this.key_value_differ === null) {
            this.key_value_differ = this.differs.find(this.query_parameters).create<any, any>();
        }
        this.pushQueryParamsToURL();
    }

    public changeSortType(column: QuickTableColumnDirective) {
        super.changeSortType(column);
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

    private pushURLToQueryParams() {
        if (this.show_url_params) {
            const url_params = this.route.snapshot.queryParams;
            for (const key in url_params) {
                this.query_parameters.set(key, url_params[key]);
                if (key === 'page') {
                    this.current_page = parseInt(url_params['page']);
                    this.getIndexNumberList(this.current_page);
                } else if (key === 'per_page') {
                    this.per_page = url_params['per_page'];
                }
                this.query_parameters.forEach((value, key) => {
                    if (!Object.keys(url_params).contains(key)) {
                        this.query_parameters.delete(key);
                    }
                });
            }
        }
    }

    private pushQueryParamsToURL() {
        if (this.show_url_params) {
            const url_params: Params = {};
            url_params['page'] = this.current_page;
            url_params['per_page'] = this.per_page;
            this.query_parameters.forEach((value, key) => {
                if (key !== 'page' && key !== 'per_page') {
                    url_params[key] = value;
                }
            });
            this.router.navigate([], {queryParams: url_params});
        }
        this.table_share_link = this.generateResponseURL();
    }

    private generateResponseURL(): string {
        let params: HttpParams;
        this.query_parameters.set('page', this.current_page.toString());
        if (this.query_parameters !== null && this.query_parameters !== undefined) {
            params = UrlUtility.buildURLSearchParams(this.query_parameters);
        }
        return this.table_route + '?' + params;
    }

    private get isQueryParamsChanged(): boolean {
        if (this.key_value_differ !== null) {
            if (this.key_value_differ.diff(this.query_parameters)) {
                return true;
            }
        }
        return false;
    }
}
