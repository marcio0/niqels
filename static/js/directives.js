angular.module('webapp')
    .directive('exDatefield', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                'use strict';

                var updateModel = function(ev) {
                    return scope.$apply(function() {
                        return controller.$setViewValue(element.val());
                    });
                };

                element.datepicker({
                    language: 'pt-BR',
                    format: 'dd/mm/yyyy',
                    keyboardNavigation: false,
                    autoclose: true,
                    todayHighlight: true
                }).on('changeDate', updateModel);

                element.mask('11/11/1111');

                element.keydown(function(event) {
                    if (event.keyCode == 9) {
                        $(this).data('datepicker').hide();
                    }
                });
            }
        };
    })

    .directive('exValuefield', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {

                var updateModel = function(ev) {
                    return scope.$apply(function() {
                        return controller.$setViewValue(element.val());
                    });
                };

                element.maskMoney({allowNegative: true, thousands:'.', decimal:','});
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

                element.on('blur', updateModel);
            }
        };
    });
