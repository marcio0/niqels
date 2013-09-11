'use strict';

angular.module('webapp')

    .directive('colorpicker', ['$parse', function ($parse) {
        return {
            require: 'ngModel',
            restrict: 'A',
            link: function linkFn (scope, element, attrs, controller) {
                element.spectrum({
                    showInitial: true,
                    showPalette: true,
                    showPaletteOnly: true,
                    preferredFormat: "hex",
                    change: function(color) {
                        scope.$apply(function () {
                            var getter = $parse(attrs.ngModel);
                            getter.assign(scope, color.toHexString());
                        });
                    },
                    palette: [
                        ["rgb(0, 0, 0)", "rgb(67, 67, 67)", "rgb(102, 102, 102)",
                        "rgb(204, 204, 204)", "rgb(217, 217, 217)","rgb(255, 255, 255)"],
                        ["rgb(152, 0, 0)", "rgb(255, 0, 0)", "rgb(255, 153, 0)", "rgb(255, 255, 0)", "rgb(0, 255, 0)",
                        "rgb(0, 255, 255)", "rgb(74, 134, 232)", "rgb(0, 0, 255)", "rgb(153, 0, 255)", "rgb(255, 0, 255)"], 
                        ["rgb(230, 184, 175)", "rgb(244, 204, 204)", "rgb(252, 229, 205)", "rgb(255, 242, 204)", "rgb(217, 234, 211)", 
                        "rgb(208, 224, 227)", "rgb(201, 218, 248)", "rgb(207, 226, 243)", "rgb(217, 210, 233)", "rgb(234, 209, 220)", 
                        "rgb(221, 126, 107)", "rgb(234, 153, 153)", "rgb(249, 203, 156)", "rgb(255, 229, 153)", "rgb(182, 215, 168)", 
                        "rgb(162, 196, 201)", "rgb(164, 194, 244)", "rgb(159, 197, 232)", "rgb(180, 167, 214)", "rgb(213, 166, 189)", 
                        "rgb(204, 65, 37)", "rgb(224, 102, 102)", "rgb(246, 178, 107)", "rgb(255, 217, 102)", "rgb(147, 196, 125)", 
                        "rgb(118, 165, 175)", "rgb(109, 158, 235)", "rgb(111, 168, 220)", "rgb(142, 124, 195)", "rgb(194, 123, 160)",
                        "rgb(166, 28, 0)", "rgb(204, 0, 0)", "rgb(230, 145, 56)", "rgb(241, 194, 50)", "rgb(106, 168, 79)",
                        "rgb(69, 129, 142)", "rgb(60, 120, 216)", "rgb(61, 133, 198)", "rgb(103, 78, 167)", "rgb(166, 77, 121)",
                        "rgb(91, 15, 0)", "rgb(102, 0, 0)", "rgb(120, 63, 4)", "rgb(127, 96, 0)", "rgb(39, 78, 19)", 
                        "rgb(12, 52, 61)", "rgb(28, 69, 135)", "rgb(7, 55, 99)", "rgb(32, 18, 77)", "rgb(76, 17, 48)"]
                    ]
                });

                scope.$watch(attrs.ngModel, function (value) {
                    element.spectrum('set', value);
                });
            }
        };
    }])

    .directive('exMonthSelector', ['$locale', function ($locale) {
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
                    cls = 'value-column-income';
                }
                else if (value < 0) {
                    cls = 'value-column-outgo';
                }
                element.addClass(cls);
            }
        };
    }])

    .directive('exDeviation', ['$filter', function ($filter) {
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

    .directive('exCategoryfield', ['Category', '$rootScope', '$cacheFactory', function (Category, $rootScope, $cacheFactory) {
        return {
            require: '?ngModel',
            restrict: 'A',
            link: function (scope, element, attrs, controller) {
                Category.query().$then(function (result) {
                    element.data('typeahead').source = result.resource;
                });

                element.typeahead({
                    items: 3,
                    matcher: function (item) {
                        return $.fn.typeahead.Constructor.prototype.matcher.call(this, item.name);
                    },
                    sorter: function (items) {
                        var names = [];
                        for (var i=0; i<items.length; i++) {
                            names.push(items[i].name);
                        }
                        return $.fn.typeahead.Constructor.prototype.sorter.apply(this, [names]);
                    },
                    updater: function (item) {
                        return item;
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

    .directive('exDatepicker', ['$locale', function ($locale) {
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
    }])

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
