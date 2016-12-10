
/* global apiType, app, VerifyReset */
/* eslint consistent-return: 0, no-console: 0 */

// Feathers
var services = {
  products: app.service('products'),
  stores: app.service('stores'),
  services: app.service('services'),
  categories: app.service('categories'),
};

function makeServiceRequest(service, selectedMethod) {
  switch (selectedMethod) {
    case 'find':
      return service.find({ query: queryEl.value });
    case 'get': // fall through
    case 'remove':
      return service[selectedMethod](idEl.value);
    case 'create':
      return service.create(dataEl.value);
    case 'update': // fall through
    case 'patch':
      return service[selectedMethod](idEl.value, dataEl.value);
  }
}

// DOM
const idGroupEl = document.getElementById('id-group');
const dataGroupEl = document.getElementById('data-group');
const queryGroupEl = document.getElementById('query-group');
const idEl = document.getElementById('id');
const dataEl = document.getElementById('data');
const queryEl = document.getElementById('query');
const resultsEl = document.getElementById('results');

var selectedService = 'categories';
var selectedMethod = 'find';
displayInputs();

setOnclickHandlers('services', function(ev) {
  selectedService = ev.target.value; }
);

setOnclickHandlers('methods', function(ev) {
  selectedMethod = ev.target.value;
  displayInputs();
});

setOnclickHandlers('run', function(ev) {
  makeServiceRequest(services[selectedService], selectedMethod)
    .then(obj => replaceWithJson(resultsEl, obj))
    .catch(err => replaceWithJson(resultsEl, err));
});

// Helpers

function setOnclickHandlers(name, func) {
  var els = document.getElementsByName(name);
  for (var i = 0, len = els.length; i <len; i += 1) {
    els[i].onclick = func;
  }
}

function displayInputs() {
  var SHOW_INPUTS_ON = {
    id: ['get', 'update', 'patch', 'remove'],
    data: ['create', 'update', 'patch'],
    query: ['find']
  };
  
  idGroupEl.style.display = SHOW_INPUTS_ON.id.indexOf(selectedMethod) === -1 ? 'none' : 'inline';
  dataGroupEl.style.display = SHOW_INPUTS_ON.data.indexOf(selectedMethod) === -1 ? 'none' : 'inline';
  queryGroupEl.style.display = SHOW_INPUTS_ON.query.indexOf(selectedMethod) === -1 ? 'none' : 'inline';
}

function replaceWithJson(el, obj) {
  var str = JSON.stringify(obj, undefined, 2);
  var htmlJson = prettifyJsonStr(str);
  resultsEl.innerHTML = `<pre>${htmlJson}</pre>`;
}

function prettifyJsonStr(str) {
  str = str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return str.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}
