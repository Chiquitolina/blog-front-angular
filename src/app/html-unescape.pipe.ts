import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'htmlUnescape',
})
export class HtmlUnescapePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    const txt = document.createElement('textarea');
    txt.innerHTML = value;
    const unescaped = txt.value;

    return this.sanitizer.bypassSecurityTrustHtml(unescaped);
  }
}
