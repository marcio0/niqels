function CategoryEditCtrl ($scope) {
    'use strict';

    $scope.removeCategory = function removeCategory (category) {
        category.$delete();
        this.hide();
        $scope.$emit('categoryRemoved', category);
        $scope.loadCategories();
    };

    $scope.saveCategory = function saveCategory () {
        var scope = this;
        var action = this.editing_category.id ? '$update' : '$save';

        if (this.category_form.$valid) {
            this.editing_category[action](
                function success (value) {
                    scope.hide();
                    var eventName = (action === '$save') ? 'categoryCreated' : 'categoryUpdated';
                    scope.$emit(eventName, value);
                    scope.loadCategories();
                }
            );
        }
        else {
            toastr.warning(gettext('Please fill in the fields correctly.'));
        }
    };
}

CategoryEditCtrl.$inject = ['$scope'];
