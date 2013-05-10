$(function(){
    var $dateField = $('#id_date'),
        $categoryField = $('#id_category'),
        $valueField = $('#id_value'),
        $balanceHelp = $('#balance-help');

    $categoryField.typeahead({
        source: user_categories,
        items: 3
    });

    $balanceHelp.popover({
        placement: 'left',
        trigger: 'hover',
        title: gettext('Month balance'),
        content: gettext('Shows the sum of all your transactions up to the current day, and the comparison with the previous months.')
    });

    $dateField.datepicker({
        language: 'pt-BR',
        format: 'dd/mm/yyyy',
        keyboardNavigation: false,
        autoclose: true,
        todayHighlight: true
    });
    $dateField.mask('11/11/1111');

    $categoryField.tooltip({
        placement: 'right',
        title: gettext('Example: "Groceries", "Lunch"')
    });

    $dateField.keydown(function(event) {
        if (event.keyCode == 9) {
            $(this).data('datepicker').hide();
        }
    });

    $valueField.maskMoney({allowNegative: true, thousands:'.', decimal:','});
    $valueField.tooltip({
        placement: 'right',
        title: gettext('Use a "+" sign to indicate positive values.')
    });
    //$valueField.mask('P000.000,00', {reverse: true, translation: {P: '\+'}});

    $valueField.keyup(function(event) {
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

    var clearControlGroup = function(){
        var me = $(this);
        me.removeClass('error');
        $('span.help-block', me).hide();
    };
    $('div.control-group.error').keydown(clearControlGroup);

    $('.entry-row').hover(
        function () {
            $(this).addClass('tr-hover');
        },
        function () {
            $(this).removeClass('tr-hover');
        }
    );
});
