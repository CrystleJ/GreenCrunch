import { AuthConfig } from 'angular-oauth2-oidc';
 
export const authConfig: AuthConfig = {
  issuer: 'https://dev-872814.oktapreview.com/oauth2/default',
  redirectUri: window.location.origin,
  clientId: '0oahconykz3JdCVDD0h7',
  scope: 'openid profile email',
}