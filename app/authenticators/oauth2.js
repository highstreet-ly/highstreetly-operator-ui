import OAuth2ImplicitGrant from 'ember-simple-auth/authenticators/oauth2-implicit-grant';
import classic from 'ember-classic-decorator';

@classic
export default class OAuth2Authenticator extends OAuth2ImplicitGrant {}
