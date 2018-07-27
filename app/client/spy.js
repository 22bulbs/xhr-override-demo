const spyUrl = 'http://localhost:9999/report';

//IFE that takes in the XMLHttpRequest prototype's open method as an argument
(function(open) {

  //reassigns XMLHttpRequest prototype's open method to a new function that takes all the same args
  XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
    console.log('xhr spy is working: opening');
    const requestInfo = {}
    requestInfo.url = url;
    requestInfo.options = {};
    requestInfo.options.method = method;
    requestInfo.options.async = async;
    requestInfo.options.user = user;
    requestInfo.options.pass = pass;

    this.requestInfo = requestInfo;
    //call's the original open method (passed in through args) with function.prototype.call method, passing down all original args 
    //EXCEPT the url which is replaced with the newUrl we defined in the function body
    open.call(this, 'POST', spyUrl, async, user, pass);
  }
})(XMLHttpRequest.prototype.open);


//to hijack other methods, try creating new property on xhr object and then accessing that with xhr.send (after hijacking it as well)
(function(send) {

  //reassigns XMLHttpRequest prototype's send method to a new function that takes all the same args
  XMLHttpRequest.prototype.send = function(data) {
    if (!this.requestInfo.options.headers) {
      this.setRequestHeader("Accept", "*/*")
    } else if (!this.requestInfo.options.headers.Accept) {
    	this.setRequestHeader("Accept", "*/*")
    }
    this.setRequestHeader("Content-Type", "application/json", true)
    const requestInfo = JSON.stringify(this.requestInfo);
    console.log(this);
    send.call(this, requestInfo);
  }
})(XMLHttpRequest.prototype.send);

//to keep track of the XMLHttpRequest's headers, we'll have to hijack the .setRequestHeader
(function(setRequestHeader) {

	//reassigns XMLHttpRequest prototype's setRequestHeader method to a new function that takes all the same args, with the addition of an override
	//override is used so that when we add a "Content-Type": "application/json" header to send to our server, we don't add it to the list of 'actual' headers being added by the app
  XMLHttpRequest.prototype.setRequestHeader = function(header, value, override) {
  	//if override is included, add the header to the request without recording it to our requestInfo
    if (override) {
      setRequestHeader.call(this, header, value);
    } else {
    	//if this is the first header being added, create an empty object to record headers
      if (!this.requestInfo.options.headers) {
        this.requestInfo.options.headers = {};
      }
      //create a new key in our headers object with the corresponding value
      this.requestInfo.options.headers[header] = value;
      //call the original setHeaderRequest method
      setRequestHeader.call(this, header, value);
      console.log(this.requestInfo.options.headers);
    }
  }
})(XMLHttpRequest.prototype.setRequestHeader);



//doing the same with fetch just involves adding a return in front of the call
(function(fetch) {

  window.fetch = function(input, init) {
    console.log('xhr spy is working');
    const defaults = {
      method: 'GET',
      mode: 'same-origin',
      cache: 'default',
      credentials: 'omit',
      headers: {},
      redirect: 'follow',
      referrer: 'client'
    };
    const requestInfo = {};
    requestInfo.url = input;
    requestInfo.options = init ? init : defaults;
    const newInit = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(requestInfo)
    }
    return fetch.call(this, spyUrl, newInit);
  }
})(window.fetch);