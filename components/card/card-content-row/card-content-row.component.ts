import {Component, Input} from '@angular/core';

@Component({
    selector: 'card-content-row',
    templateUrl: './card-content-row.component.html',
    styleUrls: ['./card-content-row.component.css']
})
export class CardContentRowComponent {
    @Input('title')
    public title: string;

    @Input('value')
    public value: string;

    @Input('sub-content')
    public sub_content: string;

    @Input('is-sub-menu')
    public is_sub_menu: boolean = false;

    @Input('color')
    public value_color: string;

    @Input('bg-color')
    public background_color: string;
}
