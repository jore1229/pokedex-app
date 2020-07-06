import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private isThemeLoaded = false;
  private isLightModeEnabled = true;
  private isThemeSettingsChanged = false;
  private notificationSource = new BehaviorSubject(this.isThemeSettingsChanged);
  themeNotification = this.notificationSource.asObservable();

  constructor() { }

  SetThemeStatus(isThemeLoaded) {
    if(this.isThemeLoaded != isThemeLoaded) {
      this.isThemeLoaded = isThemeLoaded;
      this.isThemeSettingsChanged = true;
      this.notificationSource.next(this.isThemeSettingsChanged);
    }
  }

  SetLightModeStatus(isLightModeEnabled: boolean) {
    if(this.isLightModeEnabled != isLightModeEnabled) {
      this.isLightModeEnabled = isLightModeEnabled;
      this.isThemeSettingsChanged = true;
      this.notificationSource.next(this.isThemeSettingsChanged);
    }
  }

  GetThemeStatus() {
    return this.isThemeLoaded;
  }

  GetLightModeStatus() {
    return this.isLightModeEnabled;
  }
}
