(function () {
    "use strict";
    var tutorials = {};


    angular.module('tutorial', [])
        .run(['$rootScope', function ($rootScope) {
            var config, tutorialState;

            tutorialState = {};

            config = {
                backdrop: true,
                storage: false,
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
                }
            };

            function startInterfaceTutorial () {
                var interfaceTutorialConfig = angular.copy(config);
                interfaceTutorialConfig.onEnd = function () {
                    tutorialState.interfaceTutorial = true;

                    var de = $rootScope.$on('transaction-created', function () {
                        startTransactionListTutorial();
                        de();
                    });
                };

                var interfaceTutorial = new Tour(interfaceTutorialConfig);
                interfaceTutorial.addSteps([
                    {
                        title: gettext("Bem vindo!"),
                        orphan: true,
                        content: gettext("Seja bem vindo ao Niqels! Vamos lhe mostrar um breve tutorial sobre como utilizar o site.")
                    },
                    {
                        element: ".left-column",
                        title: gettext("Nova movimentação"),
                        content: gettext("Utilize este formulário para criar novas movimentaçoes.")
                    },
                    {
                        element: "form#transaction-form button.btn-primary",
                        title: gettext("Criar nova movimentação"),
                        content: gettext("Experimente criar sua primeira movimentação!")
                    }
                ]);
                interfaceTutorial.init();
                interfaceTutorial.start();
            }

            function startTransactionListTutorial () {
                var transactionListTutorial = new Tour(config);
                transactionListTutorial.addSteps([
                    {
                        element: '#transaction-groups',
                        title: gettext('Lista de movimentações'),
                        content: gettext('Essas são suas movimentações desde mês.')
                    }
                ]);

                transactionListTutorial.init();
                transactionListTutorial.start();

            }

            tutorials.interfaceTutorial = startInterfaceTutorial;
            tutorials.transactionListTutorial = startTransactionListTutorial;
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
