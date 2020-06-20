import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-dynamic-style',
  templateUrl: './dynamic-style.component.html',
  styleUrls: ['./dynamic-style.component.scss']
})
export class DynamicStyleComponent implements OnInit {

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.loadTheme('lightstyle-theme.css')
  }

  ngOnInit() {
  }

  loadTheme(cssFile: string) {
    const headElement = this.document.getElementsByTagName('head')[0];
    const existingLinkElement = this.document.getElementById('site-theme') as HTMLLinkElement;

    if(existingLinkElement) {
      existingLinkElement.href = cssFile;
    }
    else {
      const newLinkElement = this.document.createElement('link');

      newLinkElement.id = 'site-theme';
      newLinkElement.rel = 'stylesheet';
      newLinkElement.href = cssFile;
      headElement.appendChild(newLinkElement);
    }
  }
}
