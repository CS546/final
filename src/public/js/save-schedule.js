$('.save-form-button').click( function(){
    let saveData = $(this).attr("value");
    $.ajax({
        url: '/scheduler/save',
        type:'POST',
        data:
        {
            saveData: saveData
        },
        success: function(msg)
        {
            $(this).prop("disabled",true);
        }
    });
});
