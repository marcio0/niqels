(function () {
    "use strict";
    var tutorials = {};
    var tutorialPath = '/tutorial/';

    function trackStep (stepName, stepValue) {
        stepName = stepName.split('_');
        var tourName = stepName.splice(0, 1);
        var action = stepName.join('_');

        //console.log(tourName, stepValue, action);
        // IDENTIFY WHEN ITS A PREMATURE END

        if (action === 'current_step' && stepValue === 0){
            //tutorial started
        }
        else if (action === 'end' && stepValue === 'yes') {
            //end of tutorial
        }
        else {
            // normal flow
        }

        //ga('send', 'pageview', 0);
    }

    angular.module('tutorial', [])
        .run(['$rootScope', function ($rootScope) {
            var config;

            config = {
                backdrop: true,
                template: function () {
                    var previousText = gettext('Anterior'),
                        nextText = gettext('Próximo'),
                        endText = gettext('Sair');

                    return "<div class='popover tour'>" +
                        "<div class='arrow'></div>" +
                        "<h3 class='popover-title'></h3>" +
                        "<div class='popover-content'></div>" +
                        "<div class='popover-navigation'>" +
                        "<button class='btn btn-link' data-role='prev'>« " + previousText + "</button>" +
                        "<span data-role='separator'>|</span>" +
                        "<button class='btn btn-link' data-role='next'>" + nextText + " »</button>" +
                        "<button class='btn btn-link' data-role='end'>" + endText + "</button>" +
                        "</div>" +
                        "</div>"
                },
                onStart: function (tour) {
                    return;
                    var name = tour._options.name;
                    var keyName = name + '_current_step';
                    trackStep(name, window.localStorage[keyName], tour);
                },
                afterSetState: trackStep
            };

            function startInterfaceTutorial () {
                var interfaceTutorialConfig = angular.copy(config);
                interfaceTutorialConfig.name = "interface-tutorial";

                var interfaceTutorial = new Tour(interfaceTutorialConfig);
                interfaceTutorial.addSteps([
                    {
                        title: gettext("Bem vindo!"),
                        orphan: true,
                        content: gettext("Seja bem vindo ao Niqels! Vamos lhe mostrar um breve tutorial sobre como utilizar o site.")
                    },
                    {
                        element: "#transaction-form-column",
                        title: gettext("Nova movimentação"),
                        content: gettext("Utilize este formulário para criar novas movimentaçoes."),
                        onShow: function () {
                            var form = $('form#transaction-form');

                            var select = $('select', form);
                            select.prop('disabled', true);
                            select.data('selectpicker').refresh();

                            $('input, button', form).prop('disabled', true);
                        },
                        onHidden: function () {
                            var form = $('form#transaction-form');

                            var select = $('select', form);
                            select.prop('disabled', false);
                            select.data('selectpicker').refresh();

                            $('input, button', form).prop('disabled', false);
                        }
                    },
                    {
                        element: "#transaction-list-panel",
                        title: gettext("Lista de movimentações"),
                        content: gettext("Aqui você verá suas movimentações. Utilize os controles para customizar a listagem."),
                        placement: 'bottom',
                        onShow: function () {
                            $('#transaction-list-panel .area-header a').prop('disabled', true);
                            $('#transaction-list-panel .month-selector button').prop('disabled', true);
                        },
                        onHidden: function () {
                            $('#transaction-list-panel .area-header a').prop('disabled', false);
                            $('#transaction-list-panel .month-selector button').prop('disabled', false);
                        }
                    },
                    {
                        element: "#balance-panel",
                        title: gettext("Balanço"),
                        content: gettext("Este painel mostrará seu balanço do mes atual."),
                        placement: 'left',
                        onShow: function (tour) {
                            var balanceLink = $('#balance-panel a');
                            tour.balanceLinkHref = balanceLink.prop('href');
                            balanceLink.prop('href', '');
                        },
                        onHidden: function (tour) {
                            var balanceLink = $('#balance-panel a');
                            balanceLink.prop('href', tour.balanceLinkHref);
                        }
                    },
                    {
                        element: "#reports-link",
                        title: gettext("Seção de relatórios"),
                        content: gettext("Nesta seção do site você contrará relatórios."),
                        backdrop: false,
                        placement: 'bottom',
                        onShow: function (tour) {
                            var reportsLink = $('.navbar #reports-link a');
                            tour.reportsLinkHref = reportsLink.prop('href');
                            reportsLink.prop('href', '');
                        },
                        onHidden: function (tour) {
                            var reportsLink = $('.navbar #reports-link a');
                            reportsLink.prop('href', tour.reportsLinkHref);
                        }
                    },
                    {
                        element: "#transaction-form-column",
                        title: gettext("Criar nova movimentação"),
                        content: gettext("Experimente criar sua primeira movimentação!")
                    }
                ]);

                var html = '<div>Welcome to Niqels, {0}!<br/>Gostaria de ver um tutorial?</div><div><button type="button" id="watch-tutorial" class="btn btn-primary">Sim</button><button type="button" id="do-nothing" class="btn btn-default">Não</button></div>'.format(window.userName);
                var toast = toastr.info(html, null, {
                    "timeOut": "0",
                    "extendedTimeOut": "0",
                    "onclick": function (e) {
                        // stopping toast dismissing on click
                        e.stopPropagation();
                    }
                });

                $('#watch-tutorial', toast).click(function () {
                    toast.remove();
                    interfaceTutorial.init();
                    interfaceTutorial.start();
                });
                $('#do-nothing', toast).click(function () {
                    toast.remove();
                });
            }

            tutorials.interfaceTutorial = startInterfaceTutorial;
        }])

        .directive('showTutorial', [function () {
            return {
                scope: {
                    tutorial: '@showTutorial'
                },
                link: function (scope) {
                    var tutorial = tutorials[scope.tutorial]();
                }
            };
        }])
    ;
})();
