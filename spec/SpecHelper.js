beforeEach(function () {
  jasmine.addMatchers({
    toOnlyContain: function(util, customEqualityTesters) {
      
      return {
        compare: function(actual, expected) {
          var result = {};
          for (var i = 0; i < actual.length(); i++) {
            result.pass = util.equals(actual[i], expected, customEqualityTesters);
          }
          if (result.pass) {
          }
        }
      };
    }
  });
});
