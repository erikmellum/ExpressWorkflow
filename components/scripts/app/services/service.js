var service = angular.module('service', ['ngResource']);

service.factory('BlogPost', ['$resource',
  function($resource){
    return $resource('blogposts', {}, {
      find: {method:'GET', params:{postId: 'blogPost'}, isArray:true},
      //create: {method:'POST', params:{newIngredient: 'primitiveIngredients'}, isArray:true}
      //find: {method:'GET', params:{phoneId:'phones'}, isArray:true}
    });
}]);
