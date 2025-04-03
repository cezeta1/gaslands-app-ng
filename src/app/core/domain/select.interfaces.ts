export interface BaseSelect<T> {
  value: T,
  name: string,
  description?: string
}

export interface Select extends BaseSelect<number> {}