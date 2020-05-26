import { Directive, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
import { TranslateDirective, TranslateService } from '@ngx-translate/core';

@Directive({
    selector: '[translateHtml]'
})
export class TranslateHtmlDirective extends TranslateDirective implements OnInit {
    constructor(translate: TranslateService, private elem: ElementRef, _ref: ChangeDetectorRef) {
        super(translate, elem, _ref);
    }

    ngOnInit() {
        const node = this.elem.nativeElement;
        let html: string = node.innerHTML;
        html = html.replace(/ _ngcontent.*?".*?"/g, '').trim(); // replace angular attributes and trim
        html = html.replace(/(<[^>\/ ]+)[^>]*?(\/?>)/g, "$1$2");
        node.lookupKey = html;
        console.log(node.lookupKey);
    }

    // adjusted from original code to just take the full text content as key
    checkNodes(forceUpdate = false, translations?: any) {
        const node = this.elem.nativeElement;
        if (forceUpdate) {
            node.lastKey = null;
        }
        if (typeof node.lookupKey === 'undefined' || node.lookupKey === null) {
            throw new Error("key not correctly set in onInit");
        }
        node.originalContent = node.lookupKey;
        this.updateValue(node.lookupKey, node, translations);
    }

    setContent(node: any, content: string) {
        const split = content.split(/<[^<]+>/).filter(x => x);
        const textNodes = Array.from<any>(node.childNodes).reduce(function gatherTextNodes(list, element) {
            if (element.nodeType === 3) {   // nodeType 3 is a text node
                return list.concat([element]);
            } else if (element.childNodes.length) {
                return Array.from<any>(element.childNodes).reduce(gatherTextNodes, list);
            } else {
                return list;
            }
        }, []);
        console.log(split, textNodes);
        if (split.length != textNodes.length) {
            throw new Error(`Invalid translation for ${node.innerHTML}: ${content}`)
        }
        for (let i = 0; i < textNodes.length; i++) {
            textNodes[i].textContent = split[i].replace("&lt;", "<");
        }
    }
}