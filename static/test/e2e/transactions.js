'use strict';

describe('transactions section', function () {

    beforeEach(function() {
        browser().navigateTo('/test_login?email=existing@test.com');
    });

    describe('transaction creation', function () {
        var form = 'form.transaction-form ';

        it('creating a negative transaction', function () {
            // creating a transaction
            element(form + 'button[data-id="id_category"]').click();
            element(form + 'div.bootstrap-select > div.dropdown-menu li[rel=1] > a').click();
            input('formData.value').enter('-100');
            input('formData.description').enter('a negative transaction');
            element(form + 'button.btn-primary').click();

            expect(element('.toast.toast-success').count()).toBeTruthy();

            expect(element('table.transaction-table tr.transaction-row').count()).toBe(1);

            var row = 'table.transaction-table tbody[rel=0] tr.transaction-row[rel=0] ';
            expect(element(row + 'td.value-column span').text()).toBe('- R$100,00');
            expect(element(row + 'td.category-column').text()).toBe('Mercado');
            expect(element(row + 'td.description-column').text()).toBe('a negative transaction');

            expect(element('div#balance-panel .balance-info .renevues > .value').text()).toBe('R$0,00');
            expect(element('div#balance-panel .balance-info .expenses > .value').text()).toBe('- R$100,00');
            expect(element('div#balance-panel .balance-info .total > .value').text()).toBe('- R$100,00');
        });

        it('creating a positive transaction', function () {
            // creating a transaction
            element(form + 'button[data-id="id_category"]').click();
            element(form + 'div.bootstrap-select > div.dropdown-menu li[rel=1] > a').click();
            input('formData.value').enter('+200');
            input('formData.description').enter('a positive transaction');
            element(form + 'button.btn-primary').click();

            expect(element('.toast.toast-success').count()).toBeTruthy();

            expect(element('table.transaction-table tr.transaction-row').count()).toBe(2);

            var row = 'table.transaction-table tbody[rel=0] tr.transaction-row[rel=0] ';
            expect(element(row + 'td.value-column span').text()).toBe('R$200,00');
            expect(element(row + 'td.category-column').text()).toBe('Mercado');
            expect(element(row + 'td.description-column').text()).toBe('a positive transaction');

            expect(element('div#balance-panel .balance-info .renevues > .value').text()).toBe('R$200,00');
            expect(element('div#balance-panel .balance-info .expenses > .value').text()).toBe('- R$100,00');
            expect(element('div#balance-panel .balance-info .total > .value').text()).toBe('R$100,00');
        });
    });
});
