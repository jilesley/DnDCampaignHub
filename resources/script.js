gapi.load("client");


function listFolderContents(folderId) {
  gapi.client.setApiKey("AIzaSyDOfiBfhLMNVEW97kB4_dDsIU6J0N3Z5BU");
  return gapi.client.load("https://content.googleapis.com/discovery/v1/apis/drive/v3/rest")
      .then(
        function() {
          console.log("GAPI client loaded for API");

          return gapi.client.drive.files.list({
            "orderBy": "name_natural",
            "q": "'" + folderId + "' in parents"
          })
              .then(function(response) {
                      // Handle the results here (response.result has the parsed body).
                      console.log("Response", response);

                      var files = response.result.files;

                      var fileListDivHTML = "";

                      for (var iFile = 0; iFile < files.length; iFile++) {
                        var file = files[iFile];
                        console.log(file.name, file);

                        fileListDivHTML += "<p><button " +
                          // open preview of document
                          "onclick='createPreview(\"https://drive.google.com/file/d/" + file.id + "/preview\")'>" +
                          file.name +"</button></p>";
                      }

                      document.getElementById("fileList").innerHTML = fileListDivHTML;

                    },
                    function(err) { console.error("Execute error", err); });

        },
        function(err) { console.error("Error loading GAPI client for API", err); });
}


function createPreview(url) {
  document.getElementById("content").innerHTML = "<iframe src='" +
    url + "' scrolling='yes' allowfullscreen></iframe>";
}
