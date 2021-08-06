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
                // alert(JSON.stringify(data));
                window.location.reload();
            });
    })
});