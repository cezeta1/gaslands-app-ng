import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { routes } from './app.routes';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { primeNGThemeConfig } from './primeng-theme.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    provideRouter(routes, withHashLocation()),

    // --- PrimeNG --- //
    
    provideAnimationsAsync(),
    providePrimeNG(primeNGThemeConfig),
  ]
};
