(function(){
  var dot = {}, root = this;

  dot.get = function(obj, path) {
    path = path.split('.');

    while (obj && path.length) {
      if (path[0] == '$') {
        path = path.slice(1).join('.');
        return obj.map(function(item){
          return dot.get(item, path);
        });
      } else {
        obj = obj[path.shift()];
      }
    }

    return obj;
  };

  dot.set = function(obj, path, value) {
    for (path = path.split('.'); obj && path.length-1; obj = obj[path.shift()] = (obj[path[0]] || (/^\d+$/.test(path[0]) ? [] : {})));
    obj[path.shift()] = value;
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = dot;
  } else {
    root.dot = dot;
  }
})();
