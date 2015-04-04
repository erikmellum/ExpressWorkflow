var ngConfirm = angular.module('ngConfirm', []);
ngConfirm.directive('ngConfirm', function () {
  return {
    priority: -1,
    terminal: true,
    link: {
      pre:function (scope, element, attr) {
        var msg = attr.ngConfirm || "Are you sure?";
        element.bind('click',function () {
          if ( window.confirm(msg) ) {
            scope.$eval(attr.ngClick);
          }
        });
      }
  }
  };
});