// RouterStore.js
var _router  = null;

exports.set = function(router) {
  _router = router;
};

exports.get = function() {
  return _router;
};