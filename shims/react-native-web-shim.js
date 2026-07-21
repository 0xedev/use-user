const rnWeb = require('react-native-web');

rnWeb.codegenNativeComponent = function codegenNativeComponent() {
  return rnWeb.View;
};

module.exports = rnWeb;
