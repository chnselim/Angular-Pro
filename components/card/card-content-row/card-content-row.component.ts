import {Component, Input} from '@angular/core';

@Component({
    selector: 'card-content-row',
    templateUrl: './card-content-row.component.html'
})
export class CardContentRowComponent {
    @Input('title')
    public row_title: string;

    @Input('value')
    public row_value: string;

    @Input('sub-content')
    public row_sub_content: string;

    @Input('color')
    public row_value_color: string;
}
