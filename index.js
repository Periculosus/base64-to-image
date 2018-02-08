//list of encoding
var encodings = "ascii/base64/binary/hex/ucs2/utf16le/utf8/latin1";
var encodingsArray = encodings.split("/");
for (var i = 0; i < encodingsArray.length; i++) {
    $("#encodingList").append("<option value='" + encodingsArray[i] + "'>" + encodingsArray[i].toUpperCase() + "</option>");
}
//list of extensions
var extensions = ".jpg/.jpeg/.png/.txt";
var extensionsArray = extensions.split("/");
for (var j = 0; j < extensionsArray.length; j++) {
    $("#extensionList").append("<option value='" + extensionsArray[j] + "'>" + extensionsArray[j] + "</option>");
}
//calling modules
var dragNDrop = require('drag-drop');
var fileServer = require('fs');
//read date and time of operation
function getTime() {
    var today = new Date(),
        date = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear(),
        time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds(),
        fullTime = "date_" + date + "-time_" + time;
        return fullTime;
}
//write/create files with selected options
function convertFile(filePath, savePath, fileId, fileName, extension, encoding) {
    fileServer.readFile(filePath, 'utf8', function (err, fileData) {
        if (err) throw err;
        // var txtToJpeg = (path.split(".txt") + ".jpeg").replace(/,/g, '');
        // fileServer.writeFile(savePath + "/screenshot" + fileId + ".jpeg", fileData, 'base64', function(err) {
        fileServer.writeFile(savePath + "/" + fileName + "-" + fileId + extension, fileData, encoding, function(err) {
            if(err) throw (err);
        });
    });
}
//to do emptiness test
function emptinessTest() {
    $("input").each(function () {
        var isEmpty = 1;
        if ($(this).val() === "") {
            isEmpty = 0;
        }
        return isEmpty;
    })
}

$("#convertFiles").click(function () {

    var filePath, savePath, fileName, encoding, extension;

    filePath = $("#filesPath").val();
    savePath = $("#savePath").val();
    fileName = $("#saveFileName").val();
    extension = $("#extensionList").val();
    encoding = $("#encodingList").val();

    if (emptinessTest() == 0) {
        alert("some fields is empty\nplease go back\nand check it out")
    }
    else {
        //creating folder at operation time
        var folderName = savePath + fileName + "-" + getTime();
        fileServer.mkdirSync(folderName);

        fileServer.readdir(filePath, function (error, files) {
            for (var i = 0; i <= files.length; i++) {
                convertFile(filePath + files[i], folderName, i, fileName, extension, encoding);
            }
        });
    }

    // convertFile("d:/trash/backup/1.txt", "d:/trash/", "1", "awesome", ".jpeg", "base64");
    //
    // alert("selected:\n" +
    //     "encoding is " + $("#encodingList").val() + "\n" +
    //     "file type is " + $("#extensionList").val() + "\n" +
    //     "file path is " + $("#filesPath").val() + "\n" +
    //     "save path is " + $("#savePath").val() + "\n" +
    //     "file name is " + $("#saveFileName").val())
});

dragNDrop('#dropArea', function (files) {

    var savePath, fileName, encoding, extension;

    savePath = $("#savePath").val();
    fileName = $("#saveFileName").val();
    extension = $("#extensionList").val();
    encoding = $("#encodingList").val();

    if (emptinessTest() == 0) {
        alert("some fields is empty\nplease go back\nand check it out")
    }
    else {
        //creating folder at operation time
        var folderName = savePath + fileName + "-" + getTime();
        fileServer.mkdirSync(folderName);

        for (var i = 0; i <= files.length; i++) {
            convertFile(files[i].path, folderName, i, fileName, extension, encoding);
        }
    }
});