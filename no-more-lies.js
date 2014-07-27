var NoMoreLies = function (fields) {

  var _fields;

  Object.defineProperty(this, 'fields', {
    get: function () {

      return _fields;

    },

    set: function (fields) {

      if (!fields || typeof fields !== 'object') {
        throw 'Invalid fields: ' + fields;
      }

      var type, name, field;

      for (name in fields) {
        if (fields.hasOwnProperty(name)) {
          field = fields[name];

          if (!field) {
            throw 'Invalid field definition';
          }

          if (typeof field === 'string') {
            type = field;
          } else {
            if (!field.hasOwnProperty('type')) {
              throw 'Missing field type: ' + name;
            }
            type = field.type;
          }

          if (!type || typeof this.dataTypes[type] !== 'string') {
            throw 'Invalid field type: ' + type;
          }
        }
      }
      _fields = fields;

    }
  });

  this.fields = fields || {};

};

NoMoreLies.dataTypes = {
  string: 'string',
  int: 'int'
};

NoMoreLies.prototype = {

  constructor: NoMoreLies,

  dataTypes: NoMoreLies.dataTypes,

  isField: function (name) {

    return this.fields.hasOwnProperty(name);

  },

  normalise: function (values) {

    var name, field, value, normalised = {};

    for (name in values) {
      if (values.hasOwnProperty(name)) {
        value = values[name];

        if (!this.isField(name)) {
          normalised[name] = value;
          continue;
        }

        field = this.fields[name];
        if (typeof field === 'string') {
          field = {type: field};
        }

        switch (field.type) {
          case this.dataTypes.string:
            var s;
            if (value === undefined || value === null || isNaN(value) || value !== value) {
              s = '';
            } else {
              s = String(value);
            }
            if (typeof field.max === 'number') {
              s = s.substr(0, field.max);
            }
            normalised[name] = s;
            break;

          case this.dataTypes.int:
            var i = parseInt(value, 10);
            if (isNaN(i) && i !== i) {
              i = 0;
            }
            if (typeof field.max === 'number' && i > field.max) {
              i = field.max;
            }
            if (typeof field.min === 'number' && i < field.min) {
              i = field.min;
            }
            normalised[name] = i;
            break;

          default:
            throw 'Invalid field type: ' + field.type;
        }
      }
    }

    return normalised;

  }

};

module.exports = NoMoreLies;
