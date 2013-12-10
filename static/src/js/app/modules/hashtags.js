(function () {
'use strict';

angular.module('hashtags', [])

    .directive('hashtagged', [function () {
        return {
            link: function (scope, element, attrs) {
                var re = /(#[a-zA-Zà-úÀ-Ú0-9\-]+)+/g;
                var span = '<span class="label label-primary">';

                scope.$watch(attrs.ngBind, function (newValue, oldValue) {
                    var hashtags = newValue.match(re);
                    var fullHtml = "";
                    var theHtml = newValue;

                    for (var i in hashtags) {
                        var ht = hashtags[i];
                        var hashtagHtml = span + ht + '</span>';
                        theHtml = theHtml.replace(
                            ht,
                            hashtagHtml
                        );
                        var idx = theHtml.indexOf(hashtagHtml) - 1 + hashtagHtml.length;
                        fullHtml += theHtml.substring(0, idx + 1);
                        theHtml = theHtml.substring(idx + 1);
                        element.html(fullHtml);
                    }
                });
            }
        };
    }]);

})();