angular
	.module('myAppControllers',[])
	.controller('TableCtrl', function ($scope, $filter, filteredListService, remotePeopleFactory) {

        $scope.pageSize = 10;
        $scope.reverse = true;

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
        	console.log ($scope.filteredList);
            $scope.ItemsByPage = filteredListService.paged($scope.filteredList, $scope.pageSize);
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



        $scope.setPage = function () {
            $scope.currentPage = this.n;
        };

        $scope.firstPage = function () {
            $scope.currentPage = 0;
        };

        $scope.lastPage = function () {
            $scope.currentPage = $scope.ItemsByPage.length - 1;
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

            if (sortBy === '_id') {
                $scope.Header[0] = iconName;
            } else if (sortBy === 'name') {
                $scope.Header[1] = iconName;
            } else {
                $scope.Header[2] = iconName;
            }



            pagination();
            showLog();
        };

        function showLog() {
            console.log ("reverse: " +$scope.reverse );
        }

    });