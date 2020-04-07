import { Inject, Injectable, InjectionToken } from '@angular/core';

export const LOCAL_STORAGE_PREFIX = new InjectionToken(
  'serenity.support.local-storage-prefix'
);

export const nullLocalStorage = {
  get: (key, defaultValue?) => defaultValue,
  setItem: (key, value) => {},
  removeItem: (key) => {},
};

@Injectable()
export class LocalStorage {
  localStorage: any;

  constructor(@Inject(LOCAL_STORAGE_PREFIX) protected prefix = '') {
    this.localStorage = this.localStorageExists()
      ? localStorage
      : nullLocalStorage;
  }

  get(key: string, defaultValue?) {
    try {
      const value = JSON.parse(this.localStorage.getItem(this.getKey(key)));
      return value === null ? defaultValue : value;
    } catch (e) {
      return defaultValue;
    }
  }

  set(key: string, value: any) {
    this.localStorage.setItem(this.getKey(key), JSON.stringify(value));
  }

  remove(key: string) {
    this.localStorage.removeItem(this.getKey(key));
  }

  pluck(key: string, defaultValue?) {
    const value = this.get(key, defaultValue);
    this.remove(key);
    return value;
  }

  getKey(key: string) {
    if (this.prefix) {
      return `${this.prefix}:${key}`;
    }
    return key;
  }

  // @source https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
  localStorageExists() {
    const test = 'test';
    try {
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
}
