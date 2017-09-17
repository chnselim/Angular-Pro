import {
    Component, DoCheck, Input, IterableDiffer, IterableDiffers, OnChanges, OnInit,
    SimpleChanges
} from '@angular/core';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {GeneralAPIServiceBase} from '../../services/general-api.service';

@Component({
    selector: 'smart-table',
    templateUrl: '../quick-table/quick-table.component.html',
    providers: [{provide: QuickTableComponent, useExisting: SmartTableComponent}]
})
export class SmartTableComponent extends QuickTableComponent implements OnInit, OnChanges, DoCheck {

    private key_iterable_differ: IterableDiffer<string>;
    private value_iterable_differ: IterableDiffer<string>;

    public constructor(private iterable_differs: IterableDiffers) {
        super();
        this.key_iterable_differ = this.iterable_differs.find([]).create(null);
        this.value_iterable_differ = this.iterable_differs.find([]).create(null);
    }

    @Input('api-source')
    public api_source: GeneralAPIServiceBase<any>;

    @Input('query-parameters')
    public query_parameters = new Map<string, string>();

    protected changePage(page: number) {
        super.changePage(page);
        this.getSourceFromAPI();
    }

    protected getSourceFromAPI() {
        this.api_source
            .getResponseModel(this.current_page, this.per_page, this.query_parameters)
            .then(source_response => {
                this.source = source_response.getBody();
                this.total_count = parseInt(source_response.getHeaders().get('x-total-count'), 10);
            });
    }

    refresh(): void {
        this.getSourceFromAPI();
    }

    ngOnInit(): void {
        this.refresh();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ('api_source' in changes || 'query_parameters' in changes) {
            this.refresh();
        }
    }

    ngDoCheck(): void {
        const key_changes = this.key_iterable_differ.diff(this.query_parameters.keys());
        const value_changes = this.value_iterable_differ.diff(this.query_parameters.values());

        if (key_changes || value_changes) {
            // console.log('key_changes', key_changes);
            // console.log('value_changes', value_changes);
            // this.current_page = 1;todo
            this.refresh();
        }
    }
}
