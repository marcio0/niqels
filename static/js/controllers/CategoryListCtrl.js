'use strict';

function CategoryListCtrl ($scope, Category, $modal, $q) {
    Category.query().$then(function (result) {
        var categories = result.resource;
        $scope.categories = categories;
    });

    $scope.editCategory = function editCategory (category) {
        var scope = $scope.$new();
        scope.category = category;

        var modalPromise = $modal({template: '/partials/category-edit/', persist: "false", show: false, backdrop: 'static', scope: scope});
        $q.when(modalPromise).then(function(modalEl) {
            modalEl.modal('show');
        });
    };
}

CategoryListCtrl.$inject = ['$scope', 'Category', '$modal', '$q'];
