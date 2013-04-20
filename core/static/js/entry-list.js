$(function(){
    var $dateField = $('#id_date');
        

    $dateField.datepicker({
        format: 'mm/dd/yyyy'
    });

    $dateField.focusout(function() {
        $(this).data('datepicker').hide();
    });
});
