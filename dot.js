(function(){
  var dot = {}, root = this;

  function mapItemWithPath(path) {
    return function(item) {
      return dot.get(item, path);
    };
  }

  dot.get = function(obj, path) {
    path = path.split('.');

    while (obj && path.length) {
      if (path[0] === '$') {
        path = path.slice(1).join('.');
        return obj.map(mapItemWithPath(path));
      } else {
        obj = obj[path.shift()];
      }
    }

    return obj;
  };

  dot.set = function(obj, path, value) {
    path = path.split('.');
    for (;obj && path.length-1; path.shift()) {
      if (obj[path[0]]) {
        obj = obj[path[0]];
      } else {
        obj = obj[path[0]] = /^\d+$/.test(path[1]) ? [] : {};
      }
    }
    obj[path.shift()] = value;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dot;
  } else {
    root.dot = dot;
  }
})();
