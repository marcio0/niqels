'use strict';

var existing = 'existing@test.com';

describe('access', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    afterEach(function () {
        browser().navigateTo('/logout');
    });

    describe('account creation', function() {
        it('should not create account if passwords won\'t match', function() {
            var form = 'form#register-form ';

            element(form + 'input[name="name"]').val('Joe');
            element(form + 'input[name="email"]').val('user@test.com');
            element(form + 'input[name="password1"]').val('password');
            element(form + 'input[name="password2"]').val('different password');
            element(form + 'button[type="submit"]').click();

            expect(waitFor('form#register-form div.form-group.has-error').count()).toBe(1);
        });

        it('should create a account', function () {
            var form = 'form#register-form ';

            element(form + 'input[name="name"]').val('Joe');
            element(form + 'input[name="email"]').val('user@test.com');
            element(form + 'input[name="password1"]').val('password');
            element(form + 'input[name="password2"]').val('password');
            element(form + 'button[type="submit"]').click();

            expect(waitFor('div[role="transactions"]').count()).toBeTruthy();
            expect(browser().window().hash()).toBe('/transactions');
        });
    });

    describe('user authentication', function () {
        var form = 'form#login-inline ';

        it('should not login with the wrong credentials', function () {
            element(form + 'input[name="username"]').val('user@test.com');
            element(form + 'input[name="password"]').val('wrong password');
            element(form + 'button.btn-primary').click();

            expect(waitFor('form#signin-form div.alert-error').count()).toBe(1);
        });

        it('should log in', function () {
            element(form + 'input[name="username"]').val('existing@test.com');
            element(form + 'input[name="password"]').val('password');
            element(form + 'button.btn-primary').click();

            expect(waitFor('div[role="transactions"]').count()).toBeTruthy();
            expect(browser().window().hash()).toBe('/transactions');
        });

        it('should log out', function () {
            browser().navigateTo('/test_login?email=existing@test.com');

            element('div.navbar .dropdown[name="user-menu"] > a').click();
            element('div.navbar .dropdown[name="user-menu"] > .dropdown-menu a[name="logout"]').click();

            expect(browser().window().path()).toBe('/');
        });
    });
});
