import { DOCUMENT } from "@angular/common";
import { inject, Injectable, signal } from "@angular/core";
import { LocalStorageService } from "../browser-storage/local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  
  private _document: Document = inject(DOCUMENT);
  private _localStorageService = inject(LocalStorageService);

  private readonly _darkThemeClass = "dark-theme"; 

  public isDark = signal<boolean>(false);

  public initializeAppTheme() {
    var prefersDark = window?.matchMedia?.('(prefers-color-scheme: dark)')?.matches;
    const savedLumen = this._localStorageService.load<boolean>('dark');
    this._forceLumen(!!(savedLumen ?? prefersDark));
  }
    
  public toggleDarkMode() {
    this.isDark.set(this._getMainElement()?.classList.toggle(this._darkThemeClass) ?? false);
    this._saveToStorage();
  }

  private _forceLumen(isDark: boolean) {
    const cl = this._getMainElement()?.classList;
    isDark 
      ? cl.add(this._darkThemeClass) 
      : cl.remove(this._darkThemeClass);

    this.isDark.set(isDark);
    this._saveToStorage();
  }

  private _getMainElement = () => this._document.getElementById('theme-anchor') as HTMLElement;
  private _saveToStorage = () => this._localStorageService.save('dark', this.isDark()); 
}
