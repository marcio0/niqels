'use strict';

describe('access', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    describe('account creation', function() {
        it('should not create account if passwords won\'t match', function() {
            var form = 'form#register-form ';

            element(form + 'input[name="name"]').val('Joe');
            element(form + 'input[name="email"]').val('user@email.com');
            element(form + 'input[name="password1"]').val('password');
            element(form + 'input[name="password2"]').val('different password');
            element(form + 'button[type="submit"]').click();

            sleep(1);
            expect(element(form + 'div.form-group.has-error input[name="password2"] + span.help-block').count()).toBeTruthy();
        });

        it('should create a account', function () {
            var form = 'form#register-form ';

            element(form + 'input[name="name"]').val('Joe');
            element(form + 'input[name="email"]').val('user@email.com');
            element(form + 'input[name="password1"]').val('password');
            element(form + 'input[name="password2"]').val('password');
            element(form + 'button[type="submit"]').click();

            sleep(1);
            expect(browser().window().hash()).toBe('/transactions');

            browser().navigateTo('/logout');
        });
    });

    describe('user authentication', function () {
        var form = 'form#login-inline ';

        it('should not login with the wrong credentials', function () {
            element(form + 'input[name="username"]').val('user@email.com');
            element(form + 'input[name="password"]').val('wrong password');
            element(form + 'button.btn-primary').click();

            sleep(1);
            expect(element('form#signin-form div.alert-error').count()).toBeTruthy();
        });

        it('should log in', function () {
            
            element(form + 'input[name="username"]').val('user@email.com');
            element(form + 'input[name="password"]').val('password');
            element(form + 'button.btn-primary').click();

            sleep(1);
            expect(browser().window().hash()).toBe('/transactions');
        });
    });
});
