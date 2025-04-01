import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DarkModeSwitchComponent } from "./core/components/dark-mode-switch/dark-mode-switch.component";
import { ThemeService } from './core/services/themes/theme.service';
import { LayoutComponent } from "./core/layout/layout.component";

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LayoutComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'gaslands-app-ng';

  // private _languageService = inject(LanguageService);
  private _themeService = inject(ThemeService);

  ngOnInit(): void {
    // this._languageService.initializeAppLanguage();
    this._themeService.initializeAppTheme();
  }
}
