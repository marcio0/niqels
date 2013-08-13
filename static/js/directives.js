'use strict';

angular.module('webapp')

    .directive('exMonthSelector', function ($locale) {
        return {
            scope: {
                date: '=exMonthSelector'
            },
            link: function linkFn (scope, element, attrs, controller) {
                var setElementText = function (value) {
                    var date = moment(value).format('MMMM - YYYY');
                    element.text(date);
                };

                var update = function (value) {
                    // updates the element text and the datepicker when the month is changed outside, ex: a controller
                    setElementText(value);
                    element.data('datepicker').update(value);
                };

                scope.$watch('date', update);

                var changeDate = function (ev) {
                    // updates the element text and the month variable when a date is selected on the datepicker
                    setElementText(ev.date);

                    var datepicker = element.data('datepicker');
                    datepicker.hide();

                    scope.$apply(function () {
                        scope.date = ev.date;
                    });
                };

                element.datepicker({
                    format: "dd-mm-yyyy",
                    language: $locale.id,
                    keyboardNavigation: false,
                    startView: 1,
                    minViewMode: 1,
                    todayBtn: "linked",
                    todayHighlight: true,
                }).on('changeDate', changeDate);
            }
        };
    })

    .directive('exCurrency', function ($filter) {
        return {
            replace: true,
            template: '<span class="text-((color))" ng-bind="value"></span>',
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
            template: '<span class="text-((color))" >((value))% <i class="((icon)) icon-large"></i></span>',
            scope: {
                rawValue: '@exDeviationValue'
            },
            link: function (scope, element, attrs) {
                scope.$watch('rawValue', function (newValue, oldValue) {
                    scope.value = $filter('number')(scope.rawValue * 100, 2);

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

    .directive('exConfirmationNeeded', function () {
        return {
            priority: 1,
            link: function (scope, element, attr) {
                var msg = attr.exConfirmationNeeded || gettext("Are you sure?");
                var clickAction = attr.ngClick;

                element.bind('click', function () {
                    scope.$apply(function () {
                        if (window.confirm(msg)) {
                            scope.$eval(clickAction);
                        }
                    });
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
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {

                element.typeahead({
                    source: user_categories,
                    items: 3,
                    matcher: function (item) {
                        return item.toLowerCase().indexOf(this.query.toLowerCase()) == 0;
                    },
                    highlighter: function (item) {
                        return item;
                    }
                });

                element.bind('change', function () {
                    scope.$apply(function () {
                        return controller.$setViewValue(element.val());
                    });
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

    .directive('exDatepicker', function ($locale) {
        return {
            restrict: 'A',
            scope: {
                date: '=exDatepicker'
            },
            link: function (scope, element, attrs) {
                var updateModel = function (ev) {
                    scope.$apply(function () {
                        scope.date = moment(ev.date).format('DD/MM/YYYY');
                    });
                };

                element.datepicker({
                    language: $locale.id,
                    format: 'yyyy-mm-dd',
                    keyboardNavigation: false,
                    todayHighlight: true,
                    todayBtn: "linked"
                }).on('changeDate', updateModel);

                scope.$watch('date', function (newValue, oldValue) {
                    if (newValue == undefined) {
                        var today = moment().format('YYYY-MM-DD');
                        element.data('datepicker').update(today);
                        scope.date = today;
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
                    return scope.$apply(function () {
                        return controller.$setViewValue(element.val());
                    });
                };

                element.maskMoney({
                    allowNegative: true,
                    allowZero: true,
                    thousands:'.',
                    decimal:',',
                    negativeDefault: true
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
