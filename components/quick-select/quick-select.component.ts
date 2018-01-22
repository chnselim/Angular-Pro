import {AfterViewInit, Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {ComponentBase} from '../base.component';
import {QuickSelectItemDirective} from './quick-select-item.directive';
import {QuickTableComponent} from '../quick-table/quick-table.component';
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
export class QuickSelectComponent extends ComponentBase {

    constructor(private quick_table: QuickTableComponent) {
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

    private changed() {
        this.quick_table.current_page = 1;
        this.quick_table.getIndexNumberList(this.quick_table.current_page);
        this.item_selected.emit(this.selected_item);
        this.onChange(this.selected_item);
    }
}
