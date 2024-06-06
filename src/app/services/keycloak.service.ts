import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';
import { frontendUrl } from '../environments/dev';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  constructor(private readonly keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout(window.location.href = frontendUrl);
  }
  login(): Promise<void> {
    return this.keycloak.login();
  }
  getUserProfile(): any {
    return this.keycloak.loadUserProfile();
  }
  getUserRoles(): any {
    return this.keycloak.getUserRoles();
  }
  getToken(): any {
    return this.keycloak.getToken();
  }
}
