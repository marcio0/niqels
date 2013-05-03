$(function(){
    var $dateField = $('#id_date'),
        $categoryField = $('#id_category'),
        $valueField = $('#id_value');

    $dateField.datepicker({
        language: 'pt-BR',
        format: 'dd/mm/yyyy'
    });

    $categoryField.tooltip({
        placement: 'right',
        title: gettext('Example: "Groceries", "Lunch"')
    });

    $dateField.keydown(function(event) {
        if (event.keyCode == 9) {
            $(this).data('datepicker').hide();
        }
    });

    $valueField.tooltip({
        placement: 'right',
        title: gettext('Use a "+" sign to indicate positive values.')
    });

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
});
