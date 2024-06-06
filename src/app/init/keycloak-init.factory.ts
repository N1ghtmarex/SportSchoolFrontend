import { KeycloakService } from 'keycloak-angular';
import { keycloakUrl } from '../environments/dev';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: keycloakUrl,
        realm: 'SportSchool',
        clientId: 'SwaggerClient',
      },
      enableBearerInterceptor: true,
      bearerPrefix: 'Bearer',
      bearerExcludedUrls: ['/assets'],
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html',
      },
    });
}
