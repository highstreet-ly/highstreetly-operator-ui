import Controller from '@ember/controller';
import Env from 'highstreetly-operator-ui/config/environment';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginController extends Controller {
    @service
    session;

    @service
    ajax;

    email = null;
    password = null;
    env = Env;

    @action
    async login() {


        try {
            await this.ajax.request('/account/login', {
                method: 'POST',
                data: {
                    email: this.email,
                    password: this.password
                }
            });
        } catch (error) {
            this.set('authError', true);
            this.set('authErrorReason', error.payload.reason);

            if (error.payload.reason === 'Email not confirmed') {
                this.set('showResendConefirmEmail', true);
            }
            return;
        }

        this.set('authError', false);

        let randomString = function (length) {
            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (let i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        let clientId = "operator";
        let redirectURI = `${window.location.origin}/callback`;

        let responseType = `id_token token`;
        let nonce = randomString(32);
        let redirect = `${Env.sonatribe.authenticationURL}/connect/authorize?`
            + `client_id=${clientId}`
            + `&redirect_uri=${redirectURI}`
            + `&response_type=${responseType}&scope=${Env.sonatribe.requestedScopes}&nonce=${nonce}`;

        window.location.replace(redirect);
    }

    @action
    logOut() {
        this.session.invalidate();
    }

}
