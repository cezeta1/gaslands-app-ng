import { Injectable } from "@angular/core";
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Injectable()
export class CZMissingTranslationHandler implements MissingTranslationHandler {
  // private _loggerService = inject(LoggerService);

  public static readonly MISSING_KEY: string = 'Missing key';

  handle(params: MissingTranslationHandlerParams) {
    // this._loggerService.info(`Missing translation key: ${params.key}`);
    const intParams = params.interpolateParams ?? {};
    return Object.hasOwn(intParams, 'default') 
      ? intParams['default' as keyof typeof intParams] 
      : CZMissingTranslationHandler.MISSING_KEY;
  }
}