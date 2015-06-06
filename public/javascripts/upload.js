$(document).ready(function() {
 
    status('Choose a file :)');
  
    $('#uploadForm').submit(function(event) {
        status('uploading the file ...');
 
        var formData = $('#uploadForm').serialize();
        $('#uploadForm').attr("action", "/upload/" + g_fbResponse.id + "?name=" + g_fbResponse.name);
        $('#uploadForm').attr('action', $('#uploadForm').attr('action') + '&' + formData);
        $(this).ajaxSubmit({                                                                                                                 
 
            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
 
            success: function(response) {
                var imageUrlOnServer = response.path;
 
                status('Success, file uploaded to:' + imageUrlOnServer);
                $('#uploadedImage').attr(
                    {
                        src: imageUrlOnServer,
                        style: "width:256px;height:256px;border:0;"
                    });
                //$('<img/>').attr('src', imageUrlOnServer).attr('style', "width:256px;height:256px;border:0;").appendTo($('body'));
            }
        });

        event.preventDefault();
 
        // Have to stop the form from submitting and causing                                                                                                       
        // a page refresh - don't forget this                                                                                                                      
        return false;
    });
 
    function status(message) {
        $('#status').text(message);
    }
});
