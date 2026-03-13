import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly USER_NAME_KEY = 'presence-user-name';

  constructor() {}

  setUserName(name: string): void {
    localStorage.setItem(this.USER_NAME_KEY, name.trim());
  }

  getUserName(): string | null {
    const name = localStorage.getItem(this.USER_NAME_KEY);
    return name ? name : null;
  }

  hasUserName(): boolean {
    return this.getUserName() !== null;
  }

  clearUserName(): void {
    localStorage.removeItem(this.USER_NAME_KEY);
  }
}
