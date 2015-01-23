angular.module('tantalim.select', [])
    .directive('uiSelect', function () {
        return {
            restrict: 'E',
            controllerAs: '$select',
            link: function (scope, element) {
                //console.info(scope);
                //console.info(element);
                //console.info(attrs);
                //console.info(controllers);
                var ctrl = this;
                ctrl.display = "Alabama";
                ctrl.empty = false;
                ctrl.open = false;
                ctrl.activeIndex = undefined;
                ctrl.items = [
                    {key: "AL", value: "Alabama"},
                    {key: "WV", value: "West Virginia"}
                ];
                ctrl.activate = function () {
                    ctrl.open = true;
                };
                ctrl.choose = function (item) {
                    console.info(item);
                    ctrl.display = item.value;
                    ctrl.open = false;
                };
                scope.$select = ctrl;
            },
            template: '<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}">' +
            '<button type="button" class="btn btn-default dropdown-toggle form-control ui-select-match" data-ng-click="$select.activate()">' +
            '<span ng-hide="$select.empty">{{$select.display}}</span><span ng-show="$select.empty" class="text-muted">Select...</span><span class="caret"></span>' +
            '</button>' +
            '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length> 0">' +
            '<li class="ui-select-choices-row" data-ng-repeat="item in $select.items" ng-class="{active: $select.activeIndex===$index}"><a href="" data-ng-click="$select.choose(item)">{{item.value}}</a></li>' +
            '</ul>' +
            '</div>'
        };
    });

angular.module('codePen', ['tantalim.select'])
    .controller('Controller', function ($scope) {
        $scope.states = [
            {key: "AL", value: "Alabama"},
            {key: "WV", value: "West Virginia"}
        ];
        var people = [
            {id: 1, name: "Trevor", stateCode: "AL", stateMeaning: "Alabama"},
            {id: 2, name: "Gretchen", stateCode: "WV", stateMeaning: "West Virginia"}
        ];
        var currentRow = 0;
        $scope.next = function() {
            currentRow = (currentRow >= people.length - 1) ? 0 : currentRow + 1;
            $scope.current = people[currentRow];
        };

        $scope.people = people;
        $scope.next();
    });
