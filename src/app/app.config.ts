import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withHashLocation } from '@angular/router';
import { HttpClient, provideHttpClient, withFetch } from '@angular/common/http';

import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { primeNGThemeConfig } from './primeng-theme.config';

import { routes } from './app.routes';
import { CZMissingTranslationHandler } from './core/services/language/cz-missing-translation.handler';
import { MissingTranslationHandler, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => 
  TranslateHttpLoader = (http: HttpClient) =>
    new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    
    provideRouter(
      routes,
      withHashLocation()
      // withNavigationErrorHandler((e: NavigationError) => 
      //   inject(AppErrorHandler).handleNavigationError(e))
    ),
      
    provideAnimationsAsync(),
    providePrimeNG(primeNGThemeConfig),
    
    provideHttpClient(
      withFetch(),
      // withInterceptors([
      //   httpLoggingInterceptor,
      //   httpAuthInterceptor
      // ])
    ),

    // --- Error Handler --- //
    // { provide: ErrorHandler, useClass: AppErrorHandler },

    importProvidersFrom([
      
      // --- i18n --- //
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: httpLoaderFactory,
          deps: [HttpClient],
        },
        missingTranslationHandler: { 
          provide: MissingTranslationHandler, 
          useClass: CZMissingTranslationHandler 
        },
      }),

      // --- logger --- //
      // LoggerModule.forRoot(
      //   { 
      //     level: NgxLoggerLevel.TRACE, 
      //     serverLogLevel: NgxLoggerLevel.TRACE, 
      //   }
      // )
    ]),
    
    // --- Standalone --- //

    MessageService,
    ToastModule,
  ]
};
