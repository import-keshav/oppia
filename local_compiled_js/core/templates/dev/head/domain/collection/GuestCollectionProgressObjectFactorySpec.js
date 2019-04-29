// Copyright 2018 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Tests for GuestCollectionProgressObjectFactory.
 */
describe('Guest collection progress object factory', function () {
    var GuestCollectionProgressObjectFactory = null;
    var _collectionId0 = null;
    var _collectionId1 = null;
    var _expId0 = null;
    var _expId1 = null;
    beforeEach(angular.mock.module('oppia'));
    beforeEach(angular.mock.inject(function ($injector) {
        GuestCollectionProgressObjectFactory = ($injector.get('GuestCollectionProgressObjectFactory'));
        _collectionId0 = 'collection_id0';
        _collectionId1 = 'collection_id1';
        _expId0 = 'exploration_id0';
        _expId1 = 'exploration_id1';
    }));
    var _createEmptyProgressObject = function () {
        return GuestCollectionProgressObjectFactory.createFromJson(null);
    };
    describe('hasCompletionProgress', function () {
        it('should initially have no progress', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            expect(guestCollectionProgress.hasCompletionProgress(_collectionId0)).toBe(false);
        });
        it('should have progress after recording an exploration', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.hasCompletionProgress(_collectionId0)).toBe(true);
        });
        it('should have no progress for an unknown exploration', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0);
            expect(guestCollectionProgress.hasCompletionProgress(_collectionId0)).toBe(false);
        });
    });
    describe('getCompletedExplorationIds', function () {
        it('should initially have no completed exploration IDs', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            expect(guestCollectionProgress.getCompletedExplorationIds(_collectionId0)).toEqual([]);
        });
        it('should provide completed exploration ID', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.getCompletedExplorationIds(_collectionId0)).toEqual([_expId0]);
        });
        it('should not provide completed exp ID for other collection', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0);
            expect(guestCollectionProgress.getCompletedExplorationIds(_collectionId0)).toEqual([]);
        });
        it('should provide all completed exploration IDs in order', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId1);
            guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0);
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.getCompletedExplorationIds(_collectionId0)).toEqual([_expId1, _expId0]);
        });
    });
    describe('addCompletedExplorationId', function () {
        it('should successfully add exploration to empty collection', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            expect(guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0)).toBe(true);
        });
        it('should fail to re-add exploration to collection', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0)).toBe(false);
        });
        it('should successfully add exploration to second collection', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0)).toBe(true);
        });
    });
    describe('toJson', function () {
        it('should convert an empty progress object to simple JSON', function () {
            expect(_createEmptyProgressObject().toJson()).toEqual('{}');
        });
        it('should convert progress for one collection to JSON', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            expect(guestCollectionProgress.toJson()).toEqual('{"collection_id0":["exploration_id0"]}');
        });
        it('should convert progress for multiple collections to JSON', function () {
            var guestCollectionProgress = _createEmptyProgressObject();
            guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId1);
            guestCollectionProgress.addCompletedExplorationId(_collectionId0, _expId1);
            guestCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0);
            expect(guestCollectionProgress.toJson()).toEqual('{"collection_id1":["exploration_id1","exploration_id0"],' +
                '"collection_id0":["exploration_id1"]}');
        });
    });
    describe('createFromJson', function () {
        it('should create a new empty progress object from JSON', function () {
            var guestCollectionProgress = (GuestCollectionProgressObjectFactory.createFromJson('{}'));
            expect(guestCollectionProgress).toEqual(_createEmptyProgressObject());
        });
        it('should create a progress object from some progress JSON', function () {
            var expectedCollectionProgress = _createEmptyProgressObject();
            expectedCollectionProgress.addCompletedExplorationId(_collectionId0, _expId0);
            var guestCollectionProgress = (GuestCollectionProgressObjectFactory.createFromJson('{"collection_id0": ["exploration_id0"]}'));
            expect(guestCollectionProgress).toEqual(expectedCollectionProgress);
        });
        it('should create a progress object for multiple collections', function () {
            var expectedCollectionProgress = _createEmptyProgressObject();
            expectedCollectionProgress.addCompletedExplorationId(_collectionId1, _expId1);
            expectedCollectionProgress.addCompletedExplorationId(_collectionId0, _expId1);
            expectedCollectionProgress.addCompletedExplorationId(_collectionId1, _expId0);
            var guestCollectionProgress = (GuestCollectionProgressObjectFactory.createFromJson('{"collection_id1": ["exploration_id1", "exploration_id0"], ' +
                '"collection_id0": ["exploration_id1"]}'));
            expect(guestCollectionProgress).toEqual(expectedCollectionProgress);
        });
    });
});
