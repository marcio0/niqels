'use strict';

function chain (steps) {
    for (var i in steps) {
        var step = steps[i],
            actions = ['element'],
            methods = ['val', 'click'],
            action, target, method, value;

        for (var i in actions) {
            if (actions[i] in step) {
                action = actions[i];
                target = step[actions[i]];
            }
        }

        for (var i in methods) {
            if (methods[i] in step) {
                method = methods[i];
                value = step[methods[i]];
            }
        }

        if (method === 'click') {
            window[action]([target])[method]();
        }
        else {
            window[action]([target])[method]([value]);
        }
    }
};

describe('access', function() {

    beforeEach(function() {
        browser().navigateTo('/');
    });

    describe('account creation', function() {
        it('should not create account if passwords won\'t match', function() {
            element('form#register-form input[name="name"]').val('Joe');
            element('form#register-form input[name="email"]').val('user@email.com');
            element('form#register-form input[name="password1"]').val('password');
            element('form#register-form input[name="password2"]').val('different password');
            element('form#register-form button[type="submit"]').click();

            sleep(1);
            expect(element('form#register-form div.form-group.has-error input[name="password2"] + span.help-block').count()).toBeTruthy();
        });

        it('should create a account', function () {
            element('form#register-form input[name="name"]').val('Joe');
            element('form#register-form input[name="email"]').val('user@email.com');
            element('form#register-form input[name="password1"]').val('password');
            element('form#register-form input[name="password2"]').val('password');
            element('form#register-form button[type="submit"]').click();

            sleep(3);
            expect(element('form[name="transactionForm"]').count()).toBeTruthy();
            
        });
    });
});
