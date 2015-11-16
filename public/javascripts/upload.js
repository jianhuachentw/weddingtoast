var clientId = 0;
var clientName = "";

function setClientId(id) {
    clientId = id;
}

function setClientName(name) {
    clientName = name;
}

$(document).ready(function() {
 
    $('#uploadForm').submit(function(event) {
        status('正在上傳...');
 
        var formData = $('#uploadForm').serialize();
        $('#uploadForm').attr("action", "/upload/" + clientId + "?name=" + clientName);
        $('#uploadForm').attr('action', $('#uploadForm').attr('action') + '&' + formData);
        $(this).ajaxSubmit({                                                                                                                 
            uploadProgress: function(event, position, total, percentComplete) {
                status('正在上傳...' + percentComplete + '%');
            },

            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
 
            success: function(response) {
                var imageUrlOnServer = response.path;
 
                status('上傳成功！');
            }
        });

        event.preventDefault();
 
        // Have to stop the form from submitting and causing                                                                                                       
        // a page refresh - don't forget this                                                                                                                      
        return false;
    });

    $('#photoBoothUpload').submit(function(event) {
        status('正在上傳...');
 
        var formData = $('#uploadForm').serialize();
        console.log(formData);
        $('#photoBoothUpload').attr("action", "/uploadPhotoBooth");
        $('#photoBoothUpload').attr('action', $('#photoBoothUpload').attr('action'));
        $(this).ajaxSubmit({                                                                                                                 
            uploadProgress: function(event, position, total, percentComplete) {
                status('正在上傳...' + percentComplete + '%');
            },

            error: function(xhr) {
                status('Error: ' + xhr.status);
            },
 
            success: function(response) {
                var imageUrlOnServer = response.path;
 
                status('上傳成功！');
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
