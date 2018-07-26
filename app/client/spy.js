//IFE that takes in the XMLHttpRequest prototype's open method as an argument
(function(open) {

	//reassigns XMLHttpRequest prototype's open method to a new function that takes all the same args
	XMLHttpRequest.prototype.open = function(method, url, async, user, pass) {
		console.log('xhr spy is working');
		const newUrl = 'http://localhost:9999/report'
		//call's the original open method (passed in through args) with function.prototype.call method, passing down all original args 
		//EXCEPT the url which is replaced with the newUrl we defined in the function body
		open.call(this, method, newUrl, async, user, pass);
	}
})(XMLHttpRequest.prototype.open);

//doing the same with fetch just involves adding a return in front of the call
(function(fetch) {

	window.fetch = function(input, init) {
		console.log('xhr spy is working');
		const newInput = 'http://localhost:9999/report'
		return fetch.call(this, newInput, init);
	}
})(window.fetch);