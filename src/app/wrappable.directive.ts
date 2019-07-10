import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
    selector: '[appWrappable]'
})
/**
 * Shorthand directive to create a container where the children have constant margins between them,
 * but none to the container. Overwrites margin-top and margin-left by creating a class for this margin.
 */
export class WrappableDirective {
    @Input() wrapMarginX: string;
    @Input() wrapMarginY: string;
    @Input() wrapMargin: string;

    static list = [];

    constructor(private el: ElementRef) {}

    ngOnInit() {
        this.wrapMarginX = this.wrapMarginX || this.wrapMargin || "10px";
        this.wrapMarginY = this.wrapMarginY || this.wrapMargin || "10px";
        var classname = "wrappable" + (this.wrapMarginX + this.wrapMarginY).replace(/[^a-z0-9\-_]/gi, "_");
        
        this.el.nativeElement.className += " " + classname;

        if (!WrappableDirective.list.includes(classname)) {
            var style = document.createElement("style");
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
            document.getElementsByTagName("head")[0].appendChild(style);
            WrappableDirective.list.push(classname);
        }
    }
}
