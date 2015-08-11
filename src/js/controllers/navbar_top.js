'use strict';

/**
 * @ngdoc function
 * @name Pear2Pear.controller:NavbarTopCtrl
 * @description
 * # NavbarTop Ctrl
 */

angular.module('Pear2Pear')
  .controller(
    'NavbarTopCtrl', [
      'pear', '$scope', '$route',
      function(pear, $scope, $route){

        var getSharedMode = function(){
          if ($scope.project){
            return $scope.project.shareMode;
          }
          return null;
        };

        $scope.$on('$locationChangeStart', function(event) {
          pear.onLoad(function(){
            if ($route.current.params.id){
              $scope.project = pear.projects.find($route.current.params.id)
                .then(function(proxy) {
                  console.log(proxy);
                  $scope.project = proxy;
                });
            }
          });
        });

        $scope.shareIcon = function shareIcon(project) {
          switch (getSharedMode()) {
            case 'link':
              return 'fa-link';
            case 'public':
              return 'fa-globe';
            default:
              return '';
          }
        };

        $scope.isShared = function(mode) {
          if ($scope.project){
            return getSharedMode() === mode;
          }
          return false;
        };

        $scope.setShared = function setShared(mode){
          pear.projects.setShareMode($route.current.params.id, mode);
        };
  }]);