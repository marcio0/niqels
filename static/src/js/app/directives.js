(function () {
'use strict';

angular.module('webapp')

    .directive('categoryCollapse', ['$rootScope', '$parse', function ($rootScope, $parse) {
        $rootScope.lastCreatedTransaction = null;

        function linkFn (scope, element, attrs) {
            element.collapse({toggle: false});

            function doCollapse (transaction) {
                if (!transaction) return;

                var groupName = $parse(attrs.categoryCollapse)(scope);
                if (transaction.category.name === groupName) {
                    element.collapse('show');
                }
                else {
                    element.collapse('hide');
                }
            }

            $rootScope.$on('transaction-created', function (e, transaction) {
                // When a transaction is created, check if is on this group.
                doCollapse(transaction);
            });

            // when rendering a new group, check if it's because a new transaction created
            doCollapse($rootScope.lastCreatedTransaction);
        }

        function compileFn (element, attrs) {
            $rootScope.$on('transaction-created', function (e, transaction) {
                $rootScope.lastCreatedTransaction = transaction;
            });

            return linkFn;
        }

        return {
            compile: compileFn
        };
    }])

    .directive('monthSelector', ['$locale', function ($locale) {
        return {
            scope: {
                date: '=monthSelector'
            },
            link: function linkFn (scope, element, attrs, controller) {
                var setElementText = function (value) {
                    var date = moment(value).format('MMMM - YYYY');
                    element.text(date);
                };

                var update = function (value) {
                    // updates the element text and the datepicker when the month is changed outside, ex: a controller
                    value = value.toDate();
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
                        scope.date = moment(ev.date);
                    });
                };

                element.datepicker({
                    format: "dd-mm-yyyy",
                    language: $locale.id,
                    keyboardNavigation: false,
                    startView: 1,
                    minViewMode: 1,
                    todayBtn: "linked",
                    todayHighlight: true
                }).on('changeDate', changeDate);
            }
        };
    }])

    .directive('isPositiveClass', ['$filter', '$parse', function ($filter, $parse) {
        return {
            //replace: true,
            //template: '<span><span ng-bind="value"></span> <i class="icon-caret-((dir)) ((colorCls))"></i></span>',
            link: function (scope, element, attrs) {
                var valueGetter = $parse(attrs.isPositiveClass),
                    value = parseFloat(valueGetter(scope)),
                    cls = '';

                if (value > 0) {
                    cls = 'renevue';
                }
                else if (value < 0) {
                    cls = 'expense';
                }
                element.addClass(cls);
            }
        };
    }])

    .directive('confirmationNeeded', function () {
        return {
            priority: 1,
            link: function (scope, element, attrs) {
                var msg = attrs.confirmationNeeded || gettext("Confirm action");
                var clickAction = attrs.ngClick;

                // removing ng-click so it won't be called twice.
                delete attrs.ngClick;

                element.bind('click', function () {
                    scope.$apply(function () {
                        if (window.confirm(msg)) {
                            element.tooltip('destroy');
                            scope.$eval(clickAction);
                        }
                    });
                });
                if (attrs.toggle === 'tooltip') {
                    // if the element has a tooltip configuration, initialize it
                    element.tooltip();
                }
            }
        };
    })

    .directive('categoryField', ['Category', '$rootScope', '$parse', function (Category, $rootScope, $parse) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                if ($rootScope.mobile) return; // don't use fancy selectpicker on mobile screens

                element.removeClass('form-control');
                element.addClass('selectpicker');

                element.selectpicker({
                    noneSelectedText: gettext('Select one')
                });

                scope.$watch('categories', function () {
                    element.selectpicker('refresh');
                });

                scope.$watch(attrs.ngModel, function (newValue, oldValue) {
                    element.selectpicker('render');
                });
            }
        };
    }])

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

    .directive('dateField', ['$locale', '$rootScope', function ($locale, $rootScope) {
        var mobile = $rootScope.mobile,
            template, linkFn, format;

        if (mobile) {
            if (Modernizr.inputtypes.date) {
                template = '<input type="date" ng-model="inputDate" pattern="dd/mm/yyyy" class="form-control" required></input>';
                format = 'YYYY-MM-DD';
            }
            else {
                // fallback for android 2.2 and windows phone 7
                // they don't support type=date
                template = '<input type="text" ng-model="inputDate" class="form-control" required></input>';
                format = 'DD/MM/YYYY';
            }

            linkFn = function (scope, element) {
                var icon = $('<i class="icon-calendar input-icon-prepend"></i>');
                icon.insertBefore(element);

                scope.inputDate = moment().format(format);

                scope.$watch('inputDate', function (newDate) {
                    scope.date = moment(newDate, format);
                });
            };
        }
        else {
            template = '<div></div>';
            linkFn = function linkFn (scope, element, attrs) {
                element.removeClass('form-control');

                var updateModel = function (ev) {
                    scope.$apply(function () {
                        scope.date = moment(ev.date);
                    });
                };

                element.datepicker({
                    language: $locale.id,
                    format: 'yyyy-mm-dd',
                    keyboardNavigation: false,
                    todayHighlight: true,
                    todayBtn: "linked"
                }).on('changeDate', updateModel);
            };
        }

        return {
            restrict: 'A',
            scope: {
                date: '=dateFieldModel'
            },
            replace: true,
            template: template,
            link: linkFn
        };
    }])

    ;
})();
