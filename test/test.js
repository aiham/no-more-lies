var assert = require('assert');
var NoMoreLies = require('../no-more-lies');

describe('NoMoreLies', function () {
  describe('set fields', function () {
    it('should set the field options', function () {

      assert.doesNotThrow(function () {
        var noMoreLies = new NoMoreLies();
      });

      assert.doesNotThrow(function () {
        var noMoreLies = new NoMoreLies({
          name: NoMoreLies.dataTypes.string,
          age: NoMoreLies.dataTypes.int
        });
      });

      assert.doesNotThrow(function () {
        var noMoreLies = new NoMoreLies({name: 'string', age: 'int'});
      });

      assert.doesNotThrow(function () {
        var noMoreLies = new NoMoreLies();
        noMoreLies.fields = {name: 'string', age: 'int'};
      });

      assert.throws(function () {
        var noMoreLies = new NoMoreLies('foo');
      }, /^Invalid fields/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies();
        noMoreLies.fields = null;
      }, /^Invalid fields/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies();
        noMoreLies.fields = 'foo';
      }, /^Invalid fields/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies({name: null});
      }, /^Invalid field definition/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies({name: 'foo'});
      }, /^Invalid field type/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies({name: {}});
      }, /^Missing field type/);

      assert.throws(function () {
        var noMoreLies = new NoMoreLies({name: {type: null}});
      }, /^Invalid field type/);

      assert.doesNotThrow(function () {
        var noMoreLies = new NoMoreLies();
        noMoreLies.fields = {name: {type: 'string', max: 50}};
      });

    });
  });

  describe('#isField()', function () {
    it('should check if a field exists in the fields object', function () {

      var noMoreLies = new NoMoreLies({name: 'string'});
      assert.strictEqual(noMoreLies.isField('name'), true);
      assert.strictEqual(noMoreLies.isField('foo'), false);

    });
  });

  describe('#normalise()', function () {
    it('should normalise values based on the field options', function () {

      var normalised;
      var noMoreLies = new NoMoreLies();

      assert.doesNotThrow(function () {
        noMoreLies.fields = {name: 'string', age: {type: 'int', min: 18}};
        normalised = noMoreLies.normalise({name: 100, age: '7'});
        assert.strictEqual(normalised.name, '100');
        assert.strictEqual(normalised.age, 18);
      });

      assert.doesNotThrow(function () {
        noMoreLies.fields = {name: {type: 'string', max: 10}, age: {type: 'int', max: 29}};
        normalised = noMoreLies.normalise({name: '12345678901234567890', age: '35'});
        assert.strictEqual(normalised.name, '1234567890');
        assert.strictEqual(normalised.age, 29);
      });

    });
  });
});
