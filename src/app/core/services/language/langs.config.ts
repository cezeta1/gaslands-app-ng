export type LangConfig = {
  flagEmoji?: string;
};

export enum AppLangsEnum {
  English = 'en',
  Spanish = 'es',
  French = 'fr',
  Italian = 'it',
  Japanese = 'ja',
  Portuguese = 'pt',
};

export var AppLangsConfig: { [key in AppLangsEnum]: LangConfig } = {
  [AppLangsEnum.English]: {
    flagEmoji: '🇦🇺'
  },
  [AppLangsEnum.Spanish]: {
    flagEmoji: '🇪🇸'
  },
  [AppLangsEnum.French]: {
    flagEmoji: '🇫🇷'
  },
  [AppLangsEnum.Italian]: {
    flagEmoji: '🇮🇹'
  },
  [AppLangsEnum.Japanese]: {
    flagEmoji: '🇯🇵'
  },
  [AppLangsEnum.Portuguese]: {
    flagEmoji: '🇧🇷'
  },
};