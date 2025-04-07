
export interface ErrorMessageConfig {
  error: string,
  message: string,
  getInterpolationData?: (error: {}) => {}
}

export const CZErrorConfig: ErrorMessageConfig[] = [
  {
    error: 'default',
    message: 'cz-ui-components.cz-error-message.messages.default'
  },  
  {
    error: 'required',
    message: 'cz-ui-components.cz-error-message.messages.required'
  },
  {
    error: 'min',
    message: 'cz-ui-components.cz-error-message.messages.min',
    getInterpolationData: (e: any) => ({ minValue: e.min })
  },
  {
    error: 'max',
    message: 'cz-ui-components.cz-error-message.messages.max',
    getInterpolationData: (e: any) => ({ maxValue: e.max })
  },
  {
    error: 'minlength',
    message: 'cz-ui-components.cz-error-message.messages.minlength',
    getInterpolationData: (e: any) => ({ minValue: e.requiredLength })
  },
  {
    error: 'maxlength',
    message: 'cz-ui-components.cz-error-message.messages.maxlength',
    getInterpolationData: (e: any) => ({ maxValue: e.requiredLength })
  },
  {
    error: 'pattern',
    message: 'cz-ui-components.cz-error-message.messages.pattern',
  },
  {
    error: 'email',
    message: 'cz-ui-components.cz-error-message.messages.email',
  }
];

