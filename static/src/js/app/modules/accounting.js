(function () {
    angular.module('accounting', [])

    .directive('currencyField', function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function (scope, element, attrs, controller) {
                var decimalSymbol = accounting.settings.currency.decimal,
                    thousandSymbol = accounting.settings.currency.thousand;

                element.on('keydown', function (ev) {
                    ev.preventDefault();
                    var key = ev.keyCode,
                        actualVal = accounting.toFixed(accounting.unformat(element.val(), decimalSymbol), 2).replace('.', ''),
                        length = actualVal.length,
                        val;

                    if ((key >= 48) && (key <= 57)) {
                        var value = ev.keyCode - 48;
                        val = actualVal + value;
                    }
                    else if (key === 8) {
                        // handling backspace
                        val = actualVal.substr(0, actualVal.length-1)
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
                        newValue = accounting.formatNumber(accounting.unformat(newValue, decimalSymbol, thousandSymbol), 2);
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
    })
})();