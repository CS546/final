$('.save-form-button').click( function(){
    let saveData = $(this).attr("value");
    let userID = sessionStorage.getItem("user_id");
    $.ajax({
        url: '/scheduler/save',
        type:'POST',
        data:
        {
            saveData: saveData,
            userID: userID
        },
        success: function(msg)
        {
            console.log(msg);
            $(this).prop("disabled",true);
        }
    });
});
