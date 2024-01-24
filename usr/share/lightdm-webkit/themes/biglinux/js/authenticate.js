class Authenticate {
    constructor() {
        this._passwordBox = document.querySelector('#input-password-box');
        this._passwordInput = document.querySelector('#input-password');
        this._buttonAuthenticate = document.querySelector('#button-authenticate');
        this._passwordInputContainer = document.querySelector('#input-password-container');
        this._tooltipPassword = document.querySelector('#tooltip-password');
        this._password = '';
        this._init();
    }

    // Start authentication
    startAuthentication() {
        lightdm.cancel_authentication();
        lightdm.authenticate(String(accounts.getDefaultUserName()));
    }

    // Timer expired, create new authentication session
    _autologinTimerExpired() {
        window.autologin_timer_expired = () => {
            this.startAuthentication();
        };
    }

    // Authentication completed callback
    _authenticationComplete() {
        window.authentication_complete = () => {
            if (lightdm.is_authenticated) {
                this._authenticationSuccess();
            } else {
                // If you want to handle authentication failure, add your code here
            }
        };
    }

    // You passed to authentication
    _authenticationSuccess() {
        this._password = null;
        this._passwordInput.readOnly = true;
        this._passwordInput.blur();
        this._passwordBox.classList.add('authentication-success');

        setTimeout(() => {
            lightdm.start_session_sync(String(sessions.getDefaultSession()));
        }, 1000);
    }

    // Register keyup event
    _buttonAuthenticateClickEvent() {
        this._buttonAuthenticate.addEventListener(
            'click',
            () => {
                this._password = this._passwordInput.value;
                lightdm.respond(String(this._password));
            }
        );
    }

    // Register keydown event
    _passwordInputKeyDownEvent() {
        this._passwordInput.addEventListener(
            'keydown',
            e => {
                this._password = this._passwordInput.value;
                if (e.key === 'Enter') {
                    lightdm.respond(String(this._password));
                }
            }
        );
    }

    _init() {
        this._autologinTimerExpired();
        this._authenticationComplete();
        this._buttonAuthenticateClickEvent();
        this._passwordInputKeyDownEvent();
        if (!lightdm) {
            lightdm.onload = function() {
                console.log('Start authentication');
                this.startAuthentication();
            };
        } else {
            console.log('Start authentication');
            this.startAuthentication();
        }
    }
}
