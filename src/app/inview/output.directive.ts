import {Directive} from '@angular/core';

/* tslint:disable:directive-selector */
@Directive({
    selector: '[enter]',
})
export class EnterDirective {}

@Directive({
    selector: '[exit]',
})
export class ExitDirective {}

@Directive({
    selector: '[enterOnce]',
})
export class EnterOnceDirective {}

@Directive({
    selector: '[exitOnce]',
})
export class ExitOnceDirective {}
