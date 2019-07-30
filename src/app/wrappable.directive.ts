import { Directive, ElementRef, Input, OnInit } from '@angular/core';

/**
 * Shorthand directive to create a container where the children have constant margins between them,
 * but none to the container. Overwrites margin-top and margin-left by creating a class for this margin.
 */
@Directive({
    selector: '[appWrappable]'
})
export class WrappableDirective implements OnInit {
    public static list = [];
    @Input() public wrapMarginX: string;
    @Input() public wrapMarginY: string;
    @Input() public wrapMargin: string;

    public constructor(private el: ElementRef) {}

    public ngOnInit(): void {
        this.wrapMarginX = this.wrapMarginX || this.wrapMargin || '10px';
        this.wrapMarginY = this.wrapMarginY || this.wrapMargin || '10px';
        const classname = 'wrappable' + (this.wrapMarginX + this.wrapMarginY).replace(/[^a-z0-9\-_]/gi, '_');

        this.el.nativeElement.className += ' ' + classname;

        if (!WrappableDirective.list.includes(classname)) {
            const style = document.createElement('style');
            style.innerHTML = `
                .${classname} {
                    margin-top: -${this.wrapMarginY};
                    margin-left: -${this.wrapMarginX};
                }
                .${classname} > * {
                    margin-top: ${this.wrapMarginY};
                    margin-left: ${this.wrapMarginX};
                }
            `;
            document.getElementsByTagName('head')[0].appendChild(style);
            WrappableDirective.list.push(classname);
        }
    }
}
