import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppConfig } from '../../configurations/app-config/app.config';
import { ThemeService } from 'src/app/data/theme/theme.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit {
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private themeService: ThemeService) {
  }

  ngOnInit() {
    const headElement = this.document.getElementsByTagName('head')[0];
    const newPreconnectElement = this.document.createElement('link');
    newPreconnectElement.id = 'api-preconnect';
    newPreconnectElement.rel = 'preconnect';
    newPreconnectElement.href = AppConfig.settings.poke_api.base_url;
    headElement.appendChild(newPreconnectElement);

    this.themeService.currentMessage.subscribe(themeSettings => {
      this.LoadTheme(this.themeService.GetLightModeStatus());
    })

    this.LoadTheme(this.themeService.GetLightModeStatus());
  }


  UpdateThemeSettings(enableLightMode: boolean) {
    this.themeService.SetLightModeStatus(enableLightMode);
  }

  private LoadTheme(enableLightMode: boolean) {
    const headElement = this.document.getElementsByTagName('head')[0];
    const existingLinkElement = this.document.getElementById('site-theme-stylesheet') as HTMLLinkElement;

    let cssFile = "";
    if (enableLightMode) { cssFile = "lightstyle-theme.css"; }
    else { cssFile = "darkstyle-theme.css"; }

    if(existingLinkElement) {
      existingLinkElement.href = cssFile;
    }
    else {
      const newPreloadElement = this.document.createElement('link');
      newPreloadElement.id = 'site-theme-preload';
      newPreloadElement.rel = 'preload';
      newPreloadElement.href = cssFile;
      newPreloadElement.as = 'style';
      headElement.appendChild(newPreloadElement);

      const newStylesheetElement = this.document.createElement('link');
      newStylesheetElement.id = 'site-theme-stylesheet';
      newStylesheetElement.rel = 'stylesheet';
      newStylesheetElement.href = cssFile;
      newStylesheetElement.media = 'print';
      newStylesheetElement.onload = () => { newStylesheetElement.media = 'all'; }
      headElement.appendChild(newStylesheetElement);
    }

    this.themeService.SetLightModeStatus(enableLightMode);
  }
}
