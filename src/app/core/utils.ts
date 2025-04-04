import { CreateSignalOptions, DestroyRef, Injector, Pipe, PipeTransform, runInInjectionContext, signal, Signal, WritableSignal } from "@angular/core";
import { SIGNAL, SignalGetter, signalUpdateFn } from "@angular/core/primitives/signals";
import { takeUntilDestroyed, toSignal } from "@angular/core/rxjs-interop";
import { FormGroup } from "@angular/forms";
import * as _ from "lodash";
import { debounceTime, distinctUntilChanged, MonoTypeOperatorFunction, pipe } from "rxjs";
// import { ConsoleError } from "./services/error-handler/app-error.interface";

// --------------------------------------------- // 
//           Lodash Method Extensions            // 
// --------------------------------------------- // 

export const mapKeys = 
  <T>(obj: T, toCase: 'camelCase' | 'snake_case'): T => { 
    obj = _.mapKeys(obj as any, (__, key) => toCase !== 'camelCase' ? _.snakeCase(key) : _.camelCase(key)) as T;
    return _.mapValues(obj as any, (val, __) => {

      if (val == null)
        return val;

      const isArray = Array.isArray(val);
      const isObject = typeof val === "object";
      
      return isArray 
        ? [... val.map(x => mapKeys(x, toCase))]
        : isObject 
          ? mapKeys(val, toCase) 
          : val;
    }) as T; 
  }

export const keysToCamelCase = <T>(o: T): T => mapKeys(o, 'camelCase');
export const keysToSnakeCase = <T>(o: T): T => mapKeys(o, 'snake_case');

// --------------------------------------------- // 
//         Reactive Forms Signals Builder        // 
// --------------------------------------------- // 

export interface SignalBundle {
  [key: string] : Signal<any> | WritableSignal<any> | (() => Signal<any>);
  all: Signal<any>
}

export const buildReactiveFormSignalBundle = (injector: Injector, form: FormGroup): SignalBundle=> {
  var signalBundle = {} as SignalBundle;

  runInInjectionContext(injector, () => {
    
    const sgnls = _.mapValues(form.controls, 
      (formCtrl, __) => toSignal(formCtrl.valueChanges, { initialValue: formCtrl.value })
    )

    signalBundle = {
      ...sgnls,
      all: toSignal(form.valueChanges, { initialValue: form.value })
    };
  });
  return signalBundle;
}

// --------------------------------------------- // 
//               Patchable Signals               // 
// --------------------------------------------- // 

export type PatchableSignal<T extends ({} | null)> = 
  Signal<T> & 
  WritableSignal<T> & 
  {
    /* Updates properties on an object */
    patch(value: Partial<T>): void;
  };

export function patchableSignal<T extends ({} | null)>(initialValue: T, opts?: CreateSignalOptions<T>): PatchableSignal<T> {
  const internal = signal<T>(initialValue, opts) as SignalGetter<T> & WritableSignal<T>;
  const node = internal[SIGNAL];
  
  return Object.assign(internal, {
    patch: (v: Partial<T>) => signalUpdateFn(node, x => _patchMergeUpdate(x, v)),
  });
}

const _patchMergeUpdate = <T>(a: T, b:  Partial<T>) : T => {

  if (a == undefined || b == null) {
    return b as T;
  }

  if (typeof a !== 'object') {
    return b as T;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    return [...a, ...b] as T;
  }

  // Object.keys(a).forEach(k => { b[k as keyof T] = b[k as keyof T] ?? undefined });
  return _.merge({...a}, {...b});
}

// --------------------------------------------- // 
//               Bytes conversion                // 
// --------------------------------------------- // 

const units = ['bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
   
@Pipe({
  name: 'formatBytes',
  standalone: true
})
export class FormatBytesPipe implements PipeTransform {
  transform = (value: number): string => formatBytes(value);
}

function formatBytes(x: number) {
  let l = 0, n = parseInt(`${x}`, 10) || 0;
  while(n >= 1024 && ++l) { n = n/1024; }
  return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
}

// --------------------------------------------- // 
//             RXJS pipe operators               // 
// --------------------------------------------- // 

export const cz_debounceUntilChanged = <T>(
  milliseconds: number = 0, 
  eqFn: <T>(p: T, c: T) => boolean = (p, c)=> _.isEqual(p, c)
): MonoTypeOperatorFunction<T> => 
  pipe(
    debounceTime(milliseconds),
    distinctUntilChanged(eqFn)
  );

export const cz_takeUntilDestroyed = <T>(inj : Injector): MonoTypeOperatorFunction<T> => {
  const _destroyRef = inj.get(DestroyRef);
  
  if (!_destroyRef)
    throw new Error("cz_takeUntilDestroyed couldn't find a valid DestroyRef. Are you using the correct Injector?");
    // throw new ConsoleError("cz_takeUntilDestroyed couldn't find a valid DestroyRef. Are you using the correct Injector?");
  
  return takeUntilDestroyed(_destroyRef);
}