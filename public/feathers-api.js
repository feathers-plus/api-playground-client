
// Feathers
var SERVICES = {
  products: app.service('products'),
  stores: app.service('stores'),
  services: app.service('services'),
  categories: app.service('categories'),
};

function makeServiceRequest(serviceName, method) {
  return Promise.resolve() // trap any client errors within Promise
    .then(function () {
      var service = SERVICES[serviceName];
      
      switch (method) {
        case 'find':
          var query = convertStrToObj(queryEl.value);
          return service.find({ query: query });
        case 'get': // fall through
        case 'remove':
          return service[method](idEl.value);
        case 'create':
          var data = convertStrToObj(dataEl.value);
          return service.create(data);
        case 'update': // fall through
        case 'patch':
          data = convertStrToObj(dataEl.value);
          return service[method](idEl.value, data);
      }
    });
}

// DOM
var idGroupEl = document.getElementById('id-group');
var dataGroupEl = document.getElementById('data-group');
var queryGroupEl = document.getElementById('query-group');
var idEl = document.getElementById('id');
var dataEl = document.getElementById('data');
var queryEl = document.getElementById('query');
var resultsEl = document.getElementById('results');

setOnclickHandlers('services', function(ev) {
  selectedService = ev.target.value; }
);

setOnclickHandlers('methods', function(ev) {
  selectedMethod = ev.target.value;
  displayInputs();
});

setOnclickHandlers('run', function() {
  resultsEl.innerHTML = 'Waiting for response.';
  
  makeServiceRequest(selectedService, selectedMethod)
    .then(function (obj) {
      replaceWithJson(resultsEl, obj);
    })
    .catch(function (err) {
      if (!err.className) {
        err = { name: err.name, message: err.message, className: 'client-error' };
      }
      
      replaceWithJson(resultsEl, err);
    });
});

// Initialize

var selectedService = 'categories';
var selectedMethod = 'find';
displayInputs();

// Helpers

function setOnclickHandlers(name, func) {
  var els = document.getElementsByName(name);
  for (var i = 0, len = els.length; i <len; i += 1) {
    els[i].onclick = func;
  }
}

function convertStrToObj(str) {
  var obj = str ? eval('(' + str + ')') : {};
  
  if (typeof obj !== 'object') {
    throw new Error('Input is not a JavaScript object');
  }
  
  return obj;
}

function displayInputs() {
  idGroupEl.style.display = setDisplay('id');
  dataGroupEl.style.display = setDisplay('data');
  queryGroupEl.style.display = setDisplay('query');
}

function setDisplay(prop) {
  var showInputsOn = {
    id: ['get', 'update', 'patch', 'remove'],
    data: ['create', 'update', 'patch'],
    query: ['find']
  };
  
  return showInputsOn[prop].indexOf(selectedMethod) === -1 ? 'none' : 'inline';
}

function replaceWithJson(el, obj) {
  var str = JSON.stringify(obj, undefined, 2);
  var htmlJson = prettifyJsonStr(str);
  el.innerHTML = '<pre>' + htmlJson + '</pre>';
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
