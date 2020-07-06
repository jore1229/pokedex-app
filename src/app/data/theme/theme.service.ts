import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isThemeLoaded = false;
  private isLightModeEnabled = true;
  private isThemeSettingsChanged = false;
  private messageSource = new BehaviorSubject(this.isThemeSettingsChanged);
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  SetThemeStatus(isThemeLoaded) {
    if(this.isThemeLoaded != isThemeLoaded) {
      this.isThemeLoaded = isThemeLoaded;
      this.isThemeSettingsChanged = true;
      this.messageSource.next(this.isThemeSettingsChanged);
    }
  }

  SetLightModeStatus(isLightModeEnabled: boolean) {
    if(this.isLightModeEnabled != isLightModeEnabled) {
      this.isLightModeEnabled = isLightModeEnabled;
      this.isThemeSettingsChanged = true;
      this.messageSource.next(this.isThemeSettingsChanged);
    }
  }

  GetThemeStatus() {
    return this.isThemeLoaded;
  }

  GetLightModeStatus() {
    return this.isLightModeEnabled;
  }
}
