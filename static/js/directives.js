angular.module('webapp')
    .directive('exDatefield', function () {
        return function (scope, element, attrs) {
            'use strict';
            element.datepicker({
                language: 'pt-BR',
                format: 'dd/mm/yyyy',
                keyboardNavigation: false,
                autoclose: true,
                todayHighlight: true
            });

            element.mask('11/11/1111');

            element.keydown(function(event) {
                if (event.keyCode == 9) {
                    $(this).data('datepicker').hide();
                }
            });
        };
    })

    .directive('exValuefield', function () {
        return function (scope, element, attrs) {
            /*
            element.maskMoney({allowNegative: true, thousands:'.', decimal:','});
            */
            element.tooltip({
                placement: 'right',
                title: gettext('Use a "+" sign to indicate positive values.')
            });

            element.keyup(function(event) {
                var me = $(this),
                    addon = me.siblings('span.add-on'),
                    color = "";

                if (me.val() === '') {
                    color = "#555555";
                }
                else if (me.val().charAt(0) === '-') {
                    color = '#b94a48';
                }
                else if (parseInt(me.val().charAt(0))) {
                    color = '#b94a48';
                }
                else if (me.val().charAt(0) === '+') {
                    color = '#468847';
                }
                else {
                    return;
                }
                me.css('color', color);
                addon.css('color', color);
            });
        };
    });
