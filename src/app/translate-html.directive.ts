import { ChangeDetectorRef, Directive, ElementRef, OnInit } from '@angular/core';

import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Directive({
    // tslint:disable-next-line
    selector: '[translateHtml]'
})
export class TranslateHtmlDirective extends TranslateDirective implements OnInit {
    public constructor(translate: TranslateService, private elem: ElementRef, _ref: ChangeDetectorRef) {
        super(translate, elem, _ref);
    }

    public ngOnInit(): void {
        const node = this.elem.nativeElement;
        let html: string = node.innerHTML;
        html = html.replace(/ _ngcontent.*?".*?"/g, '').trim(); // replace angular attributes and trim
        html = html.replace(/(<[^>\/ ]+)[^>]*?(\/?>)/g, '$1$2');
        node.lookupKey = html;
    }

    // adjusted from original code to just take the full text content as key
    public checkNodes(forceUpdate: boolean = false, translations?: any): void {
        const node = this.elem.nativeElement;
        if (forceUpdate) {
            node.lastKey = null;
        }
        if (typeof node.lookupKey === 'undefined' || node.lookupKey === null) {
            throw new Error('key not correctly set in onInit');
        }
        node.originalContent = node.lookupKey;
        this.updateValue(node.lookupKey, node, translations);
    }

    public setContent(node: HTMLElement, content: string): void {
        const split = content.split(/<[^<]+>/).filter(x => x);
        const textNodes: HTMLElement[] = Array.from<any>(node.childNodes).reduce(function gatherTextNodes(
            list: HTMLElement[],
            element: HTMLElement
        ): HTMLElement[] {
            if (element.nodeType === 3) {
                // nodeType 3 is a text node
                return list.concat([element]);
            } else if (element.childNodes.length) {
                return Array.from<any>(element.childNodes).reduce(gatherTextNodes, list);
            } else {
                return list;
            }
        },
        []);
        if (split.length !== textNodes.length) {
            throw new Error(`Invalid translation for ${node.innerHTML}: ${content}`);
        }
        for (let i = 0; i < textNodes.length; i++) {
            textNodes[i].textContent = split[i].replace('&lt;', '<');
        }
    }
}
