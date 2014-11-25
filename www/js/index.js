/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    }
};

function recVideo(hq, preferVideo)
{
    navigator.device.capture.captureVideo(
      captureSuccess,
      captureError,
      {
        limit: 1,
        duration: 10,
        highquality: hq,
        frontcamera: false,
        preferformatvideo: preferVideo
      }
  );
}

var m_file;

function captureSuccess(mediaFiles) {
  document.getElementById('fnametarget').innerHTML = 'Start<br />';
  document.getElementById('fnametarget').innerHTML += JSON.stringify(mediaFiles) + '<br />';
  var i, len;
  for (i = 0, len = mediaFiles.length; i < len; i++) {
    var mediaFile = mediaFiles[i];
    try
    {
        m_file = mediaFile;
        document.getElementById('fnametarget').innerHTML += 'Got video...<br />';
        mediaFile.getFormatData(getFormatDataSuccess, getFormatDataError);
        document.getElementById('fnametarget').innerHTML += 'Gimme sec...<br />';
        document.getElementById('fnametarget').innerHTML += mediaFile.fullPath;
    }
    catch(e)
    {
        document.getElementById('fnametarget').innerHTML = "Error when retrieving format data";
    }
  }
}

function getFormatDataSuccess(mediaFileData) {
    document.getElementById('fnametarget').innerHTML += '<br />Got data, yay!<br />';
    document.getElementById('fnametarget').innerHTML += JSON.stringify(mediaFileData);
}

function captureError(error)
{
    //
}

function getFormatDataError(error)
{
    document.getElementById('fnametarget').innerHTML = "Error when retrieving format data (callback)";
}

function uploadVideo()
{
    document.getElementById('fuptarget').innerHTML = 'Uplading...<br />';

    var fileURI = m_file.fullPath;

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = fileURI.substr(fileURI.lastIndexOf('/')+1);
    options.mimeType = "application/octet-stream";
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(fileURI, "http://pond5.dev.eman.cz/form.php", win, fail, options);
}

function win(r)
{
    document.getElementById('fuptarget').innerHTML = 'SUCCESS! Code '+r.responseCode.toString()+'<br />';
}

function fail(error)
{
    document.getElementById('fuptarget').innerHTML = 'ERROR: '+error.code+'<br />';
}