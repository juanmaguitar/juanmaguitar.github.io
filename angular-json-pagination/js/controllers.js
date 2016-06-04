angular
	.module('myAppControllers',[])
	.controller('TableCtrl', function ($scope, $filter, filteredListService, remotePeopleFactory) {

        $scope.pageSize = 10;
        $scope.reverse = true;
        $scope.numberLastPage = 0;

        remotePeopleFactory.getPeople()
            .then( function(result) {
                //promise complete
                $scope.allItems = result.data;
        		$scope.sort('name');

            })
            .catch( function(error) {
                console.log('error', error)
            });


        function resetAll() {
            $scope.filteredList = $scope.allItems;
            $scope.newEmpId = '';
            $scope.newName = '';
            $scope.newEmail = '';
            $scope.searchText = '';
            $scope.currentPage = 0;
            $scope.Header = ['', '', ''];
        }

        // Calculate Total Number of Pages based on Search Result
        function pagination() {

            $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
            $scope.numberLastPage = $scope.ItemsByPage.length - 1;
            showLog();
        };

        // $scope.add = function () {
        //     $scope.allItems.push({
        //         EmpId: $scope.newEmpId,
        //         name: $scope.newName,
        //         Email: $scope.newEmail
        //     });
        //
        //     resetAll();
        // }

        $scope.search = function () {
            $scope.filteredList = filteredListService.searched($scope.allItems, $scope.searchText);

            if ($scope.searchText == '') {
                $scope.filteredList = $scope.allItems;
            }
            pagination();
        }


        $scope.isActive = function ( pageNumber ) {
            console.log ( "pageNumber ->" + pageNumber );
            console.log ( "$scope.currentPage ->" + $scope.currentPage );
            return (pageNumber == $scope.currentPage);
        }

        $scope.setPage = function () {
            $scope.currentPage = this.n;
            showLog();
        };

        $scope.firstPage = function () {
            $scope.currentPage = 0;
            showLog();
        };

        $scope.lastPage = function () {
            $scope.currentPage = $scope.ItemsByPage.length-1;
            showLog();
        };

        $scope.range = function (input, total) {
            var ret = [];
            if (!total) {
                total = input;
                input = 0;
            }
            for (var i = input; i < total; i++) {
                if (i != 0 && i != total - 1) {
                    ret.push(i);
                }
            }
            return ret;
        };

        $scope.sort = function (sortBy) {

            resetAll();

            $scope.columnToOrder = sortBy;
            $scope.reverse = !$scope.reverse;

            //$Filter - Standard Service
            $scope.filteredList = $filter('orderBy')($scope.filteredList, $scope.columnToOrder, $scope.reverse);

            if ($scope.reverse) iconName = 'glyphicon glyphicon-chevron-up';
            else iconName = 'glyphicon glyphicon-chevron-down';

            if (sortBy === 'index') {
                $scope.Header[0] = iconName;
            }
            else if (sortBy === '_id') {
                $scope.Header[1] = iconName;
            }
            else if (sortBy === 'name') {
                $scope.Header[2] = iconName;
            }
            else {
                $scope.Header[3] = iconName;
            }

            pagination();
        };

        function showLog() {
            console.log ("reverse: " +$scope.reverse );
            console.log ("currentPage: " +$scope.currentPage );
            console.log ("numberLastPage: " +$scope.numberLastPage );
        }

    });