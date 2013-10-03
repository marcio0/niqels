'use strict';

function type (value) {
    return function (elements, done) {
        for (var i in value.split('')) {
            $(elements).sendkeys(value[i]);
        }
        done();
    }
}

describe('transactions', function () {
    beforeEach(function() {
        browser().navigateTo('/test_login?email=existing@test.com');
        //browser().navigateTo('#/transactions');
    });

    describe('transaction creation', function () {
        var form = 'form.transaction-form ';

        it('should create a transaction', function () {
            element(form + 'button[data-id="id_category"]').click();
            element(form + 'div.bootstrap-select > div.dropdown-menu li[rel=1] > a').click();
            element(form + 'input#id_value').val('100.00');
            element(form + 'input#id_description').val('a transaction');
            element(form + 'button.btn-primary').click();
            
            expect(element('.toast.toast-success', 'toast').count()).toBeTruthy();

            expect(element('table.transaction-table tr.transaction-row').count()).toBe(1);
        });
    });
});
