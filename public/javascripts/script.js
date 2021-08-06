$(function () {
    $('#doorStateButton').click(function () {
        var doorState = $('#doorStateButton').val();
        if(doorState === 'Up'){
            doorState = 'Down';
        }
        else if(doorState === 'Down'){
            doorState = 'Up';
        }

        $.post("./api/doorState", { doorState: doorState  })
            .done(function (data) {
                window.location.reload();
            });
    });

    setTimeout(function(){
        window.location.reload();
     }, 5000);
});