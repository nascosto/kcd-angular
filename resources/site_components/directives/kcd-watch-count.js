angular.module('kcd.site').directive('kcdWatchCount', function() {
  'use strict';
  return {
    link: function(scope, el) {
      function watchCountWatcher() {
        return getWatcherCount(el);
      }
      scope.$watch(watchCountWatcher, function(count) {
        setTimeout(function() {
          scope.$apply(function() {
            el.find('.watch-count-container').text(count || '0');
          });
        },20); // give angular some time to bindonce...
      });

      function getWatcherCount(root) {
        root = angular.element(root || document.documentElement);
        var watcherCount = 0;

        function getWatchers(element) {
          var isolateWatchers = getWatchersFromScope(element.data().$isolateScope);
          var scopeWatchers = getWatchersFromScope(element.data().$scope);
          var watchers = scopeWatchers.concat(isolateWatchers);
          watcherCount += watchers.length;
          angular.forEach(element.children(), function (childElement) {
            getWatchers(angular.element(childElement));
          });
        }

        getWatchers(root);

        return watcherCount;
      }

      function getWatchersFromScope(scope) {
        return scope && scope.$$watchers ? scope.$$watchers : [];
      }
    }
  };
});