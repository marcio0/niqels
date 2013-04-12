$(function(){
    $('.datepicker').datepicker({
        format: 'mm/dd/yyyy'
    });

    $('#id_value').tooltip();

    $('.entry-row').click(function(){
        $('#mymodal').modal('show');
    });

    //$(".entry-form input,select,textarea").not("[type=submit]").jqBootstrapValidation();
});
