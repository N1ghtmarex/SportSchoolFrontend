import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class KeycloakOperationService {
  constructor(private readonly keycloak: KeycloakService) {}

  isLoggedIn(): boolean {
    return this.keycloak.isLoggedIn();
  }
  logout(): void {
    this.keycloak.logout(window.location.href = 'http://localhost:4200/');
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
  register(): any {
    return this.keycloak.register({
      redirectUri: "http://localhost:4200/registered"
    });
  }
  getToken(): any {
    return this.keycloak.getToken();
  }
  // Add other methods as needed for token access, user info retrieval, etc.}
}
