import { inject, Injectable, Injector } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { cz_takeUntilDestroyed } from "../../utils";
import { LocalStorageService } from "../browser-storage/local-storage.service";
import { AppLangsEnum } from "./langs.config";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private _inj = inject(Injector);
  private _translate = inject(TranslateService); 
  private _localStorageService = inject(LocalStorageService); 

  public get currentLang() { return this._translate.currentLang as AppLangsEnum };
  public get onLangChange() { return this._translate.onLangChange };

  public initializeAppLanguage() {
    this._translate.addLangs([...Object.values(AppLangsEnum)]);
    this._translate.setDefaultLang(AppLangsEnum.English);
    const userLang = this._localStorageService.load<AppLangsEnum>('userLanguage');
    this._translate.use(userLang || this._translate.getBrowserLang() || AppLangsEnum.English);

    this._translate.onLangChange
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(_ => this._localStorageService.save('userLanguage', this._translate.currentLang));
  }

  public switchLanguage = (lang: AppLangsEnum) => this._translate.use(lang);
  public translate = (key: string) => this._translate.instant(key);
}
