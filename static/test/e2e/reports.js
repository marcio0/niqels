'use strict';
moment.lang('pt-br');

describe('reports section', function () {
    beforeEach(function() {
        browser().navigateTo('/test_login?email=existing@test.com');
        browser().navigateTo('/#/reports');
    });

    describe('date selection', function () {
        it('the default period should be a year', function () {
            var start = moment().subtract('month', 12).format('MMMM - YYYY');
            var end = moment().format('MMMM - YYYY');
            expect(element('div#reports button#date-start').text()).toBe(start);
            expect(element('div#reports button#date-end').text()).toBe(end);
        });

        it('should filter by the selected period', function () {
        });
    });
});
