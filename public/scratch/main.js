'use strict';

angular.module('codePen', ['tantalim.common'])
    .controller('Controller', function ($scope, ModelData) {
        $scope.model = ModelData.model;
        $scope.page = ModelData.page;
        console.log(ModelData.model);
    });
