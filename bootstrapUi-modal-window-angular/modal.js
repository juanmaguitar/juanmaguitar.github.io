angular.module('ui.bootstrap.demo',['ui.bootstrap'])
	.controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {

		$scope.items = ['item1', 'item2', 'item3'];
		$scope.animationsEnabled = true;

		function clickOk(selectedItem) {
			console.log ("modalInstance.result");
			$scope.selected = selectedItem;
		};

		function clickCancel() {
			console.log (arguments);
			$log.info( 'Modal dismissed at: ' + new Date() );
		};

		function resolveModal() {
				return $scope.items;
			}

		function openModal(size) {
			var configModal = {
				animation: $scope.animationsEnabled,
				templateUrl: 'myModalContent.html',
				controller: 'ModalInstanceCtrl',
				size: size,
				resolve: { items: resolveModal }
			}
			var modalInstance = $uibModal.open( configModal );
			modalInstance.result.then( clickOk, clickCancel );
		};

		$scope.open = openModal;

		$scope.toggleAnimation = function () {
			$scope.animationsEnabled = !$scope.animationsEnabled;
		};

	});

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

angular.module('ui.bootstrap.demo')
	.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

		$scope.items = items;
		$scope.selected = {
			item: $scope.items[0]
		};

		$scope.ok = function () {
			$uibModalInstance.close($scope.selected.item);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	});