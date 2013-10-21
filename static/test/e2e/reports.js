'use strict';
moment.lang('pt-br');

describe('reports section', function () {
    beforeEach(function() {
        browser().navigateTo('/test_login?email=existing@test.com');
        browser().navigateTo('/#/reports');
    });

    describe('date selection', function () {
        it('the default period should be a year', function () {
            var start = moment().subtract('month', 11).format('MMMM - YYYY');
            var end = moment().format('MMMM - YYYY');
            expect(element('div#reports button#date-start').text()).toBe(start);
            expect(element('div#reports button#date-end').text()).toBe(end);
        });

        it('the maximun period allowed is 12 months', function () {
            // seleting the first datepicker
            element('div.month-selector button#date-start').click();

            // checking if the month menu is visible
            expect(element('div.datepicker .datepicker-months').attr('style')).toBe('display: block;');

            element('div.datepicker .datepicker-months tbody td span').query(function (elements, done) {
                elements[0].click();
                done();
            });

            // selecting the second datepicker
            element('div.month-selector button#date-end').click();
            element('div.datepicker .datepicker-months tbody td span').query(function (elements, done) {
                elements[1].click();
                done();
            });

            element('div.month-selector button.btn-primary').click();
            expect(element('.toast.toast-warning').count()).toBe(1);
        });

        it('should filter by the selected period', function () {
            
        });
    });
});
