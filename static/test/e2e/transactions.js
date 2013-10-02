'use strict';

describe('transactions', function () {
    beforeEach(function() {
        browser().navigateTo('/test_login?email=existing@test.com');
        //browser().navigateTo('#/transactions');
    });

    describe('transaction creation', function () {
        it('should create a transaction', function () {
            element('form.transaction-form button[data-id="id_category"]').click();
            element('form.transaction-form div.bootstrap-select > div.dropdown-menu li[rel=1] > a').click();
        });
    });
});
