import { Injectable } from "@angular/core";
// import { decryptAES, encryptAES } from "./encrypt.utils";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private _cipherkey!: string;

  public setCipherKey(key: string) { this._cipherkey = key; }

  // --- Save to sessionStorage --- //

  public save(key: string, value: any, useEncrypt: boolean = false): any {
    // const v = (useEncrypt && !!this._cipherkey)
    //   ? encryptAES(value, this._cipherkey)
    //   : value;
    sessionStorage.setItem(key, value);
  }

  // --- Load from sessionStorage --- //

  public load<T>(key: string, useDecrypt: boolean = false): T | null {
    const storedVal = sessionStorage.getItem(key);

    if (storedVal == null)
      return null;

    // const v = (useDecrypt && !!this._cipherkey)
    //   ? decryptAES(storedVal, this._cipherkey).replaceAll('"','')
    //   : storedVal;

    return storedVal as T;
  }

  // --- Clear sessionStorage --- //

  public clear = () => sessionStorage.clear();
  public remove = (k: string) => sessionStorage.removeItem(k);
}