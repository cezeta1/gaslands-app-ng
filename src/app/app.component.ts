import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/themes/theme.service';
import { LayoutComponent } from "./core/layout/layout.component";
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    LayoutComponent,
    Toast
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
