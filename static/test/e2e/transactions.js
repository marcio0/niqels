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
    });

    describe('transaction creation', function () {
        var form = 'form.transaction-form ';

        iit('should create a transaction', function () {
            // creating a transaction
            element(form + 'button[data-id="id_category"]').click();
            element(form + 'div.bootstrap-select > div.dropdown-menu li[rel=1] > a').click();
            input('formData.value').enter('-100');
            input('formData.description').enter('a transaction');
            element(form + 'button.btn-primary').click();

            expect(element('.toast.toast-success').count()).toBeTruthy();

            expect(element('table.transaction-table tr.transaction-row').count()).toBe(1);
            //expect(repeater('table.transaction-table tr.transaction-row').row(0)).toBe([-100, 'a transaction', 'Mercado']);

            expect(element('div#balance-panel .balance-info .renevues > .value').text()).toBe('R$0,00');
            expect(element('div#balance-panel .balance-info .expenses > .value').text()).toBe('- R$100,00');
            expect(element('div#balance-panel .balance-info .total > .value').text()).toBe('- R$100,00');
        });
    });
});
