import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';
import 'nglinq/linq';
declare const $: any;

@Component({
    selector: 'multi-select-box',
    templateUrl: './multi-select-box.component.html'
})
export class MultiSelectBoxComponent implements AfterViewInit {

    @Input('fa-icon')
    public fa_icon: string = 'fa-plus-square-o';

    @Input('color-class')
    public fa_icon_color: string;

    @Input('background-color')
    public background_color: string;

    @Output('selected-listChange')
    public selected_listChange: EventEmitter<any> = new EventEmitter();

    @Input('selected-list')
    public selected_list: any[] = [];

    @Input()
    public source: any[];

    @Input('value-selector')
    public value_selector: string = 'name';

    public selectOrDeselectData(data) {
        if (this.selected_list.contains(data)) {
            this.selected_list = this.selected_list.filter((value) => {
                return value !== data;
            });
        } else {
            this.selected_list.push(data);
        }
        this.selected_listChange.emit(this.selected_list);
    }

    public isSelected(data: any): boolean {
        return this.selected_list.contains(data);
    }

    ngAfterViewInit() {
        $('.dropdown-menu.dropdown-menu-form').on('click', function (e) {
            e.stopPropagation();
        });
    }
}
