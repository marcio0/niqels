'use strict';

angular.module('webapp')

    .directive('exCurrency', function ($filter) {
        return {
            replace: true,
            template: '<span class="text-{{color}}" ng-bind="value"></span>',
            scope: {
                rawValue: '=exCurrencyValue'
            },
            link: function (scope, element, attrs) {
                scope.$watch('rawValue', function (newValue, oldValue) {
                    scope.value = $filter('currency')(scope.rawValue);

                    if (scope.rawValue < 0) {
                        scope.color = 'error';
                    }
                    else if (scope.rawValue > 0) {
                        scope.color = 'success';
                    }
                    else {
                        scope.color = '';
                    }
                });
            }
        };
    })

    .directive('exDeviation', function ($filter) {
        return {
            replace: true,
            template: '<span class="text-{{color}}" >{{value}}% <i class="{{icon}} icon-large"></i></span>',
            scope: {
                rawValue: '@exDeviationValue'
            },
            link: function (scope, element, attrs) {
                scope.$watch('rawValue', function (newValue, oldValue) {
                    scope.value = $filter('number')(scope.rawValue, 2) * 100;

                    if (newValue == 0) {
                        scope.color = "";
                    }
                    else if (newValue > 0) {
                        scope.color = 'success';
                        scope.icon = 'icon-caret-up'
                    }
                    else if (newValue < 0) {
                        scope.color = 'error';
                        scope.icon = 'icon-caret-down'
                    }
                });
            }
        };
    })

    .directive('exConfirm', function ($compile) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                var title = attrs.exConfirmTitle || gettext('Confirm'),
                    okBtn = attrs.exConfirmOkBtn || gettext('Ok'),
                    cancelBtn = attrs.exConfirmCancelBtn || gettext('Cancel'),
                    message = attrs.exConfirmMessage || "";

                var dialog = '<div class="content">' +
                                '<span>' + message + '</span>' +
                                '<button class="btn small danger">{{okBtn}}</button><button class="btn small">'+cancelBtn+'</button>' +
                            '</div>';

                var config = {
                    title: title,
                    content: dialog,
                    html: true,
                    trigger: 'manual'
                };

                element.popover(config);

                element.on('click', function () {
                });
            }
        };
    })

    .directive('exCategory', function () {
        return {
            restrict: 'A',
            scope: {
                category: '=exCategory'
            },
            replace: true,
            template: '<span class="category-label" ng-bind="category.name" ng-style="{backgroundColor: category.color}"></span>'
        };
    })

    .directive('exCategoryfield', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                'use strict';

                element.typeahead({
                    source: user_categories,
                    items: 3
                });

                element.tooltip({
                    placement: 'right',
                    title: gettext('Example: "Groceries", "Lunch"')
                });
            }
        };
    })

    .directive('exActionbar', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                
                element.parent().hover(
                    function () {
                        $(this).addClass('tr-hover');
                    },
                    function () {
                        $(this).removeClass('tr-hover');
                    }
                );
            }
        };
    })

    .directive('exDatefield', function () {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {

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
                element.data('datepicker').setDate(new Date());
                controller.$setViewValue(element.val());

                controller.resetDate = function () {
                    element.data('datepicker').setDate(new Date());
                    controller.$setViewValue(element.val());
                };

            }
        };
    })

    .directive('exValuefield', function () {
        'use strict';
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

                    updateModel();

                    if (me.val().charAt(0) === '-') {
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
            }
        };
    });
