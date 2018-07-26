# XHR Override Demo

This is a test of hijacking XMLHttpRequest, allowing us to redirect traffic from all AJAX requests, regardless of method (with the exception of fetch...)

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