//XMLHttpRequest get request
const xhrApi = () => {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      document.getElementById('render-box').textContent = xhr.responseText;
    }
  }
  xhr.open('GET', '/api', true);
  xhr.send(null);
}

//fetch get request
const fetchApi = () => {
  fetch('/api')
    .then(res => {
      return res.json();
    })
    .then(data => {
      document.getElementById('render-box').textContent = data;
    })
}

//Axios get request
const axiosApi = () => {
  axios.get('/api')
    .then(res => {
      document.getElementById('render-box').textContent = res.data;
    })
}

//JQuery get request
const jQueryApi = () => {
  $.get('/api', data => {
    document.getElementById('render-box').textContent = data;
  });
}

window.onload = () => {
  document.getElementById('xhr-button').onclick = xhrApi;
  document.getElementById('fetch-button').onclick = fetchApi;
  document.getElementById('axios-button').onclick = axiosApi;
  document.getElementById('jquery-button').onclick = jQueryApi;
};