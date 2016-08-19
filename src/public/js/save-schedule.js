$('.save-form-button').click( function(){
    let url = $(this).attr("value");
    $.ajax({
        url: '/scheduler/save',
        type:'POST',
        data:
        {
            url: url
        },
        success: function(msg)
        {
            alert("Hey there");
            $(this).prop("disabled",true);
        }
    });
});
