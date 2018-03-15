import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {ComponentBase} from '../base.component';
import {QuickSelectItemDirective} from './quick-select-item.directive';
import {QuickTableComponent} from '../quick-table/quick-table.component';
import {SmartTableComponent} from '../smart-table/smart-table.component';
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
    selector: 'quick-select',
    templateUrl: 'quick-select.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickSelectComponent
        }]
})
export class QuickSelectComponent extends ComponentBase implements OnInit {

    constructor(private quick_table: QuickTableComponent, private smart_table: SmartTableComponent) {
        super();
    }

    @Input()
    public source: any[];

    @Input('name-selector')
    public name_selector: string = 'name';

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

    public selected_item_list: any = [];

    private changed() {
        this.quick_table.current_page = 1;
        this.quick_table.getIndexNumberList(this.quick_table.current_page);
        this.item_selected.emit(this.selected_item);
        console.log('CHANGED');
        this.onChange(this.selected_item);
    }

    ngOnInit() {
        // this.smart_table.columns.forEach(column => {
        //     for (let param in this.smart_table.url_params) {
        //         if (column.property.includes('name')) {
        //             column.property = column.property.replace('name', 'id')
        //         }
        //         if (column.property === param) {
        //             this.selected_item = {value: this.smart_table.url_params[param], name: ''};
        //             console.log(this.selected_item);
        //             this.selected_item_list.push(this.selected_item);
        //         }
        //     }
        // });
    }
}
