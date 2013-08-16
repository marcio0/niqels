'use strict';

function CategoryListCtrl ($scope, Category, $modal, $q) {
    $scope.loadCategories = function loadCategories () {
        Category.query().$then(function (result) {
            var categories = result.resource;
            $scope.categories = categories;
        });
    };

    $scope.createCategory = function newCategory () {
        $scope.editCategory(new Category());
    };

    $scope.removeCategory = function removeCategory (category) {
        category.$delete();
        $scope.loadCategories();
        this.hide();
    };

    $scope.saveCategory = function saveCategory () {
        var scope = this;
        var action = this.editing_category.id ? '$update' : '$save';

        this.editing_category[action](
            function success () {
                scope.loadCategories();
                scope.hide();
            }
        );
    };

    $scope.editCategory = function editCategory (category) {
        var scope = this.$new();
        scope.editing_category = new Category(category);
        //arrumar um jeito de substituir a categoria sendo editada no save do modal

        var modalPromise = $modal({template: '/partials/category-edit/', persist: "false", show: false, backdrop: 'static', scope: scope});
        $q.when(modalPromise).then(function(modalEl) {
            modalEl.modal('show');
        });
    };

    $scope.loadCategories();
}

CategoryListCtrl.$inject = ['$scope', 'Category', '$modal', '$q'];
