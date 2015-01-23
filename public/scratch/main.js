angular.module('tantalim.select', [])
    .directive('uiSelect', function () {
        return {
            restrict: 'E',
            controllerAs: '$select',
            controller: function ($scope, $attrs) {
                var ctrl = this;
                ctrl.empty = false;
                ctrl.open = false;
                ctrl.activeIndex = undefined;
                ctrl.items = $scope[$attrs.items] || [];
                ctrl.instance = $scope[$attrs.instance] || {};
                var itemKey = $attrs.itemKey || "key";
                var itemValue = $attrs.itemValue || "value";
                var instanceKey = $attrs.instanceKey;
                var instanceValue = $attrs.instanceValue;
                var otherMappings = $attrs.otherMappings;
                ctrl.activate = function (current) {
                    if (ctrl.open) {
                        ctrl.open = false;
                    } else {
                        var items = ctrl.items;
                        ctrl.activeIndex = undefined;
                        for (var i = 0; i < items.length; i++) {
                            if (items[i][itemKey] === current[instanceKey]) {
                                ctrl.activeIndex = i;
                            }
                        }
                        ctrl.open = true;
                    }
                };
                ctrl.choose = function (current, item) {
                    current[instanceValue] = item[itemValue];
                    current[instanceKey] = item[itemKey];
                    ctrl.display = current[instanceValue];
                    ctrl.open = false;
                };
                $scope.$watch('current', function (newValue) {
                    ctrl.display = newValue[instanceValue];
                });
            },
            template: '<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}">' +
            '<button type="button" class="btn btn-default dropdown-toggle form-control ui-select-match" data-ng-click="$select.activate(current)">' +
            '<span ng-hide="$select.empty">{{$select.display}}</span><span ng-show="$select.empty" class="text-muted">Select...</span><span class="caret"></span>' +
            '</button>' +
            '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" aria-labelledby="dLabel" ng-show="$select.items.length> 0">' +
            '<li class="ui-select-choices-row" data-ng-repeat="item in $select.items" ng-class="{active: $select.activeIndex===$index}"><a href="" data-ng-click="$select.choose(current, item)">{{item.value}}</a></li>' +
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
        $scope.next = function () {
            currentRow = (currentRow >= people.length - 1) ? 0 : currentRow + 1;
            $scope.current = people[currentRow];
        };

        $scope.people = people;
        $scope.next();
    });
