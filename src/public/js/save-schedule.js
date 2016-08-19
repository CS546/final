$('.save-form-button').click( function(){
    alert($(this).attr("value"));
    alert("Hey the buttons work");
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
            alert('Saved');
            //disable button
        }
    });
});
