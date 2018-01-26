//calling modules
var dragNDrop = require('drag-drop');
var fileServer = require('fs');

dragNDrop('#dropArea', function (files) {

    //read date and time of operation
    var today = new Date(),
        date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(),
        time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds(),
        fullTime = "-date_" + date + "-time_" + time;

    //creating folder at operation time
    var folderName = "d:/0/" + fullTime;
    fileServer.mkdirSync(folderName);

    console.log(files);

    for (var i = 0; i <= files.length; i++) {
        convertFile(files[i].path, folderName, i);
    }

    function convertFile(path, savePath, fileId) {

        fileServer.readFile(path, 'utf8', function (err, fileData) {
            if (err) throw err;
            // var txtToJpeg = (path.split(".txt") + ".jpeg").replace(/,/g, '');
            fileServer.writeFile(savePath + "/screenshot" + fileId + ".jpeg", fileData, 'base64', function(err) {
                if(err) throw (err);
            });
        });

    }

});

$("button").click(function () {

});
