// import {ContentChild, Directive, Input, OnInit} from '@angular/core';
//
// @Directive({
//     selector: 'quick-select-item',
// })
// export class QuickSelectItemDirective {
//     @Input()
//     public value: string;
//
//     @Input()
//     public name: string;
//
//     @Input()
//     public selected?: boolean = false;
// }


import {ContentChild, Directive, Input, OnInit} from '@angular/core';

@Directive({
    selector: 'quick-select-item',
})
export class QuickSelectItemDirective {
    @Input()
    public value: string;

    @Input()
    public name: string;
}