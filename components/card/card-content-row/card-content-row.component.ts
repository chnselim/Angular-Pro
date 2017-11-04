import {Component, Input} from '@angular/core';

@Component({
    selector: 'card-content-row',
    templateUrl: './card-content-row.component.html'
})
export class CardContentRowComponent {
    @Input('title')
    public title: string;

    @Input('value')
    public value: string;

    @Input('sub-content')
    public sub_content: string;

    @Input('color')
    public value_color: string;
}
