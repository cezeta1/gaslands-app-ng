import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  // --- Save to localStorage --- //

  public save(key: string, value: any): any {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // --- Load from localStorage --- //

  public load<T>(key: string): T | null {
    const storedVal = localStorage.getItem(key);

    return (storedVal != null)
      ? JSON.parse(storedVal) as T
      : null;
  }

  // --- Clear localStorage --- //

  public clear = () => localStorage.clear();
  public remove = (k: string) => localStorage.removeItem(k);
}