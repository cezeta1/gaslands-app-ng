import { Component, inject, Injector, input, OnInit } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { Select } from "primeng/select";
import { AppLangsConfig, AppLangsEnum } from "../../services/language/langs.config";
import { LanguageService } from "../../services/language/language.service";
import { cz_takeUntilDestroyed } from "../../utils";
import { BaseSelect } from "../../domain/select.interfaces";
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem } from "primeng/api";

export interface CountrySelect extends BaseSelect<AppLangsEnum> {
  flag: string;
}

@Component({
  selector: 'lang-selector',
  imports: [
    FormsModule,
    Select,
    SplitButtonModule
  ],
  templateUrl: './lang-selector.component.html',
  styleUrl: './lang-selector.component.scss'
})
export class LangSelectorComponent implements OnInit {

  private _inj = inject(Injector);
  private _languageService = inject(LanguageService);

  public transparent = input<boolean>(false);

  protected selectedLang?: AppLangsEnum;
  protected options: CountrySelect[] = [];

  ngOnInit(): void {
    this.selectedLang = this._languageService.currentLang;

    this._updateOptions();

    this._languageService.onLangChange
      .pipe(cz_takeUntilDestroyed(this._inj))
      .subscribe(_ => this._updateOptions());
  }

  protected onLangChange = (lang: AppLangsEnum) => 
    this._languageService.switchLanguage(lang);

  // --- Private Methods --- //

  private _updateOptions() {
    this.options = Object.keys(AppLangsConfig)
      .map((key: string) => ({
        name: this._getTranslatedCountryName(key as AppLangsEnum),
        value: key as AppLangsEnum,
        flag: this._getCountryFlag(key)
      } as CountrySelect));
  }

  private _getCountryFlag = (key: string) => 
    AppLangsConfig[key as AppLangsEnum]?.flagEmoji ?? "";

  private _getTranslatedCountryName = (lang: AppLangsEnum) => 
    this._languageService.translate("i18n")[lang] 
      ?? Object.keys(AppLangsEnum).find(key => (AppLangsEnum as any)[key] === lang);
}
