(function () {
    "use strict";
    var tutorials = {};

    angular.module('tutorial', [])
        .run(['$rootScope', function ($rootScope) {
            var config, tutorialState;

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
                        content: gettext("Utilize este formulário para criar novas movimentaçoes.")
                    },
                    {
                        element: "#transaction-list-panel",
                        title: gettext("Lista de movimentações"),
                        content: gettext("Aqui você verá suas movimentações. Utilize os controles para customizar a listagem.")
                    },
                    {
                        element: "#balance-panel",
                        title: gettext("Balanço"),
                        content: gettext("Este painel mostrará seu balanço do mes atual."),
                        placement: 'left'
                    },
                    {
                        element: "#reports-link",
                        title: gettext("Seção de relatórios"),
                        content: gettext("Nesta seção do site você contrará relatórios."),
                        backdrop: false,
                        placement: 'bottom'
                    },
                    {
                        element: "#transaction-form-column",
                        title: gettext("Criar nova movimentação"),
                        content: gettext("Experimente criar sua primeira movimentação!")
                    }
                ]);

                var html = '<div>Welcome to Niqels, {0}!<br/>Gostaria de ver um tutorial?</div><div><button type="button" id="watch-tutorial" class="btn btn-primary">Sim</button><button type="button" id="do-nothing" class="btn btn-default">Não</button></div>'.format(window.userName);
                var toast = toastr.info(html, null, {"timeOut": "0", "extendedTimeOut": "0"});

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
