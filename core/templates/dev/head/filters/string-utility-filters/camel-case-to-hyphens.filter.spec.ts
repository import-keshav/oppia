// Copyright 2019 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Tests for CamelCaseToHyphens filter for Oppia.
 */

require('filters/string-utility-filters/camel-case-to-hyphens.filter.ts');

describe('Testing filters', function() {
  var filterName = 'camelCaseToHyphens';
  beforeEach(angular.mock.module('oppia'));

  it('should have all expected filters', angular.mock.inject(function($filter) {
    expect($filter(filterName)).not.toEqual(null);
  }));

  it('should convert camelCase to hyphens properly', angular.mock.inject(
    function($filter) {
      var filter = $filter('camelCaseToHyphens');
      expect(filter('test')).toEqual('test');
      expect(filter('testTest')).toEqual('test-test');
      expect(filter('testTestTest')).toEqual('test-test-test');
      expect(filter('aBaBCa')).toEqual('a-ba-b-ca');
      expect(filter('AbcDefGhi')).toEqual('abc-def-ghi');
    }
  ));
});
