import {Component, ContentChildren, EventEmitter, Input, Output, QueryList, AfterViewInit} from '@angular/core';
import {ComponentBase} from '../base.component';
import {QuickSelectItemDirective} from './quick-select-item.directive';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
    selector: 'quick-select',
    templateUrl: 'quick-select.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickSelectComponent
        }]
})
export class QuickSelectComponent extends ComponentBase implements AfterViewInit {

    constructor(private quick_table: QuickTableComponent,
                private route: ActivatedRoute,
                private router: Router) {
        super();
        this.router.events.forEach((event) => {
            if (event instanceof NavigationEnd) {
                this.selected_item = null;
                this.setSelectedFilters();
                this.setSelectedSourceFilters();
            }
        });
    }

    @Input()
    public source: any[];

    @Input('name-selector')
    public name_selector: string = 'name';

    @Input('value-selector')
    public value_selector: string = 'id';

    @Input('value')
    public default_value: string;

    @Input('disabled')
    public is_disabled: boolean = false;

    @Output('item-selected')
    public item_selected: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(QuickSelectItemDirective)
    public item_list: QueryList<QuickSelectItemDirective>;

    @Input('selected-item')
    public selected_item: QuickSelectItemDirective;

    @Input()
    public key: string;

    private changed() {
        this.quick_table.current_page = 1;
        this.quick_table.getIndexNumberList(this.quick_table.current_page);
        this.item_selected.emit(this.selected_item);
        this.onChange(this.selected_item);
    }

    ngAfterViewInit() {
        this.selected_item = null;
        this.setSelectedFilters();
        setTimeout(() => {
            this.setSelectedSourceFilters();
        }, 1000);
    }

    private setSelectedFilters() {
        this.quick_table.query_parameters.forEach((value, key) => {
            this.item_list.forEach(item => {
                if (this.key) {
                    if (value === item.value && key === this.key) {
                        this.selected_item = item;
                    }
                } else if (!this.key) {
                    if (value === item.value) {
                        this.selected_item = item;
                    }
                }
            });
        });
    }

    private setSelectedSourceFilters() {
        this.quick_table.query_parameters.forEach((value, key) => {
            if (this.source) {
                this.source.forEach(source_item => {
                    if (this.key) {
                        if (value === source_item[this.value_selector] && key === this.key) {
                            this.selected_item = source_item;
                        }
                    } else if (!this.key) {
                        if (value === source_item[this.value_selector]) {
                            this.selected_item = source_item;
                        }
                    }
                });
            }
        });
    }
}
