(function () {
    "use strict";

    angular.module('accounting', [])

        .config(function () {
            accounting.settings = {
                currency: {
                    symbol : "R$",
                    decimal : ",",
                    thousand: ".",
                    precision : 2,
                    format: {
                        pos : "%s %v",
                        neg : "- %s %v",
                        zero: "%s %v"
                    }
                },
                number: {
                    precision : 2,
                    thousand: ".",
                    decimal : ","
                }
            };
        })

        .directive('currencyField', function () {
            return {
                restrict: 'A',
                require: '?ngModel',
                link: function (scope, element, attrs, controller) {
                    var decimalSymbol = accounting.settings.currency.decimal,
                        thousandSymbol = accounting.settings.currency.thousand;

                    element.on('keydown', function (ev) {
                        var key = ev.keyCode,
                            actualVal = accounting.toFixed(accounting.unformat(element.val(), decimalSymbol), 2).replace('.', ''),
                            val, value;

                        if (key == 9 || key == 13) {
                            // tab or enter
                            return;
                        }

                        ev.preventDefault();

                        if ((key >= 48) && (key <= 57)) {
                            value = ev.keyCode - 48;
                            val = actualVal + value;
                        }
                        else if ((key >= 96) && (key <= 105)) {
                            // numeric pad
                            value = ev.keyCode - 96;
                            val = actualVal + value;
                        }
                        else if (key === 8) {
                            // handling backspace
                            val = actualVal.substr(0, actualVal.length-1);
                        }
                        else {
                            return;
                        }

                        val =  val.substring(0, val.length - 2) + '.' + val.substring(val.length - 2);
                        val = accounting.formatMoney(val);
                        element.val(val);
                        controller.$setViewValue(val);
                        scope.$apply();
                    });

                    controller.$parsers.push(
                        function (newValue) {
                            newValue = accounting.unformat(newValue, decimalSymbol, thousandSymbol);
                            return newValue;
                        }
                    );

                    controller.$formatters.push(
                        function (newValue) {
                            newValue = accounting.formatMoney(newValue);
                            return newValue;
                        }
                    );
                }
            };
        });
})();