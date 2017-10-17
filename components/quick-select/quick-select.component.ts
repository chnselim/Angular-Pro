import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList} from '@angular/core';
import {ComponentBase} from '../base.component';
import {QuickSelectItemDirective} from './quick-select-item.directive';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
    selector: 'quick-select',
    templateUrl: 'quick-select.component.html',
    providers: [
        {
            provide: ComponentBase,
            useExisting: QuickSelectComponent
        },
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: QuickSelectComponent,
            multi: true
        }]
})
export class QuickSelectComponent extends ComponentBase implements ControlValueAccessor, OnInit {
    @Input()
    public source: any[];

    @Input('name-selector')
    public name_selector: string = 'name';

    @Input('has-option-all')
    public has_option_all: boolean = true;

    @Output('item-selected')
    public item_selected: EventEmitter<any> = new EventEmitter<any>();

    @ContentChildren(QuickSelectItemDirective)
    public item_list: QueryList<QuickSelectItemDirective>;

    public is_disabled = false;
    public selected_item: any;

    ngOnInit() {
        this.selected_item = "all";
    }
    get value(): any {
        return this.selected_item;
    }

    set value(value: any) {
        if (value !== this.selected_item) {
            this.selected_item = value;
            this.changed();
        }
    }

    public writeValue(obj: any): void {
        this.selected_item = obj;
        this.changed();
    }

    public registerOnChange(fn: (_: any) => void): void {
        this.onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    public setDisabledState(is_disabled: boolean): void {
        this.is_disabled = is_disabled;
    }

    private changed() {
        this.item_selected.emit(this.selected_item);
        this.onChange(this.selected_item);
        // console.log('selected_item', this.selected_item);
    }
}
