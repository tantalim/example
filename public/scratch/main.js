angular.module('tantalim.select', [])
    .directive('uiSelect', function () {
        return {
            restrict: 'E',
            controllerAs: '$select',
            controller: function ($scope, $timeout, $attrs, $element, $location, focus) {

                var EMPTY_SEARCH = '';

                var ctrl = this;
                ctrl.empty = false;
                ctrl.open = false;
                ctrl.activeIndex = undefined;
                ctrl.items = undefined;
                var itemKey = $attrs.itemKey || "key";
                var itemValue = $attrs.itemValue || "value";
                var instanceKey = $attrs.instanceKey;
                var instanceValue = $attrs.instanceValue;
                var otherMappings = $attrs.otherMappings;
                ctrl.id = instanceValue;

                var openItems = function (current) {
                    var items = ctrl.items;
                    ctrl.activeIndex = undefined;
                    for (var i = 0; i < items.length; i++) {
                        if (items[i][itemKey] === current[instanceKey]) {
                            ctrl.activeIndex = i;
                        }
                    }
                };

                ctrl.activate = function (current) {
                    var _promise = undefined;
                    if (ctrl.open) {
                        if (ctrl.loading) {
                            $timeout.cancel(_promise);
                        }
                        ctrl.loading = false;
                        ctrl.open = false;
                    } else {
                        ctrl.open = true;
                        ctrl.filter = EMPTY_SEARCH;
                        focus("select-search-" + ctrl.id);
                        if (ctrl.items === undefined) {
                            ctrl.loading = true;
                            _promise = $scope.loadRemoteStates(function (data) {
                                ctrl.items = data;
                                ctrl.loading = false;
                                openItems(current);
                            }, function () {
                                alert("Error");
                            });
                        } else {
                            openItems(current);
                        }
                    }
                };
                ctrl.choose = function (current, item) {
                    current[instanceValue] = item[itemValue];
                    current[instanceKey] = item[itemKey];
                    ctrl.display = current[instanceValue];
                    ctrl.open = false;
                    focus("select-button-" + ctrl.id);
                };

                var Key = {
                    Enter: 13,
                    Tab: 9,
                    Up: 38,
                    Down: 40,
                    Escape: 27
                };

                ctrl.keydown = function (key, current) {
                    switch (key) {
                        case Key.Down:
                            if (ctrl.activeIndex < ctrl.items.length - 1) {
                                ctrl.activeIndex++;
                            } else {
                                ctrl.activeIndex = 0;
                            }
                            break;
                        case Key.Up:
                            if (ctrl.activeIndex > 0) {
                                ctrl.activeIndex--;
                            } else {
                                ctrl.activeIndex = ctrl.items.length - 1;
                            }
                            break;
                        case Key.Tab:
                        case Key.Enter:
                            ctrl.choose(current, ctrl.items[ctrl.activeIndex]);
                            break;
                        case Key.Escape:
                            ctrl.open = false;
                            focus("select-button-" + ctrl.id);
                            break;
                        default:
                            return false;
                    }
                    return true;
                };

                var _scrollToActiveRow = function() {
                    if (ctrl.open && ctrl.items.length > 0 && ctrl.activeIndex !== undefined) {
                        var container = $element[0].querySelectorAll('.ui-select-choices-content')[0];
                        var rows = container.querySelectorAll('.ui-select-choices-row');

                        if (rows.length === 0) {
                            // the rows aren't there before it opens generated yet
                            container.scrollTop = 0;
                            return;
                        }
                        var highlighted = rows[ctrl.activeIndex];
                        var posY = highlighted.offsetTop + highlighted.clientHeight - container.scrollTop;
                        var height = container.offsetHeight;

                        if (posY > height) {
                            container.scrollTop += posY - height;
                        } else if (posY < highlighted.clientHeight) {
                            container.scrollTop -= highlighted.clientHeight - posY;
                        }
                    }
                };

                $scope.$watch('$select.activeIndex', function (newValue) {
                    _scrollToActiveRow();
                });

                $scope.$watch('current', function (newValue) {
                    ctrl.display = newValue[instanceValue];
                });
            },
            template: '<div class="ui-select-bootstrap dropdown" ng-class="{open: $select.open}">' +
            '<button type="button" class="btn btn-default dropdown-toggle form-control ui-select-match" focus-on="select-button-{{$select.id}}" data-ng-hide="$select.open" data-ng-click="$select.activate(current)">' +
            '<span ng-hide="$select.empty">{{$select.display}}</span><span ng-show="$select.empty" class="text-muted">Select...</span>' +
            '<i class="loading fa fa-spinner fa-spin" data-ng-show="$select.loading"></i><span class="caret"></span>' +
            '</button>' +
            '<input class="form-control" data-ng-show="$select.open" focus-on="select-search-{{$select.id}}" data-ng-model="$select.filter" select-keydown>' +
            '<ul class="ui-select-choices ui-select-choices-content dropdown-menu" role="menu" ng-show="$select.items.length> 0">' +
            '<li class="ui-select-choices-row" data-ng-repeat="item in $select.items | filter:$select.filter" ng-class="{active: $select.activeIndex===$index}" ng-mouseenter="$select.activeIndex = $index">' +
            '<a href="" data-ng-click="$select.choose(current, item)">{{item.value}}</a></li>' +
            '</ul>' +
            '</div>'
        };
    })
    .directive('selectKeydown', function () {
        return function (scope, element) {
            element.bind("keydown keypress", function (event) {
                scope.$apply(function () {
                    var processed = scope.$select.keydown(event.which, scope.current);
                    if (processed) {
                        event.preventDefault();
                    }
                });
            });
        };
    })
    .directive('focusOn', function () {
        return function (scope, elem, attr) {
            scope.$on('focusOn', function (e, name) {
                if (name === attr.focusOn) {
                    elem[0].focus();
                }
            });
        };
    })
    .factory('focus', function ($rootScope, $timeout) {
        return function (name) {
            $timeout(function () {
                $rootScope.$broadcast('focusOn', name);
            });
        }
    })
;

angular.module('codePen', ['tantalim.select'])
    .controller('Controller', function ($scope, $http) {
        $scope.loadStates = function (success_callback, error_callback) {
            var data = [
                {key: "AL", value: "Alabama"},
                {key: "WV", value: "West Virginia"}
            ];
            success_callback(data);
        };

        $scope.loadRemoteStates = function (success_callback, error_callback) {
            $http.get('states.json').
                success(function (data) {
                    success_callback(_.map(data, function (value, key) {
                        return {key: key, value: value};
                    }));
                }).
                error(error_callback);
        };

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
