function CategoryListCtrl ($scope, Category, $modal, $q) {
    'use strict';

    $scope.loadCategories = function loadCategories () {
        Category.query().$then(function (result) {
            var categories = result.resource;
            $scope.categories = categories;
        });
    };

    $scope.createCategory = function newCategory () {
        $scope.editCategory(new Category());
    };

    $scope.editCategory = function editCategory (category) {
        var scope = this.$new();
        scope.editing_category = new Category(category);
        //arrumar um jeito de substituir a categoria sendo editada no save do modal

        var modalPromise = $modal({template: 'category-edit.html', persist: "false", show: false, backdrop: true, scope: scope});
        $q.when(modalPromise).then(function(modalEl) {
            modalEl.modal('show');
        });
    };

    $scope.loadCategories();
}

CategoryListCtrl.$inject = ['$scope', 'Category', '$modal', '$q'];
