function addContent (destination, content) {
 document.addEventListener("DOMContentLoaded", function (event) {
  $ajaxUtils.sendGetRequest(content, function (responseText) {
   document.querySelector(destination).innerHTML = responseText;
  },false);
 });
}


(function (global) {
 
 // Name our AJAX utility & expose it to the global execution context.
 var ajaxUtils = {};
 global .$ajaxUtils = ajaxUtils;

 ajaxUtils.sendGetRequest = function(requestUrl, resultParser) {
 var xmlHttpRequest = getRequestObject();
 xmlHttpRequest.onreadystatechange = 
  function() { 
   handleResponse(xmlHttpRequest, resultParser); 
  }
 xmlHttpRequest.open("GET", requestUrl);
 xmlHttpRequest.send(null);
 }
 
 // Other functions our AJAX utility will need.
 // Return an HTTP request object.
 function getRequestObject() {
  if (global.XMLHttpRequest) return (new XMLHttpRequest());
  else if (global.ActiveXObject) return (new ActiveXObject("Microsoft.XMLHTTP"));
  else { // For the unlikely event that Ajax is not supported.
   global.alert("Ajax is not supported!");
   return(null);
  }
 }
 
 // Only calls the user-provided 'resultParser' function if the xmlHttpRequest is ready
 // and not an error
 var stateDone = 4;
 var statusOK = 200;
 
 function handleResponse(xmlHttpRequest, resultParser) {
  if ((xmlHttpRequest.readyState == stateDone) && (xmlHttpRequest.status == statusOK))
  resultParser(xmlHttpRequest.responseText);
 }
})(window);