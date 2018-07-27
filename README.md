# XHR Override Demo

This is a test of hijacking XMLHttpRequest, allowing us to redirect traffic from all AJAX requests, regardless of method. Fetch is defined at a native level, so it has to be hijacked seperately.

## Use
Install dependencies
```
npm install
```

Run spy/spyServer.js (the server our spy will redirect to) with 
```
npm run spy
```

Run app/server.js (the server for our sample application) with 
```
npm start
```

Point your browser to localhost/3000 and test the app, then open app/client/index.html and uncomment the spy script.
Reload the page and try again.


### Use in Other Apps

Copy spy.js  from the root of this directory into your app and include it as a script tag at the beginning of the <head> of your index.html