'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = UpdateNode;

var _GenerateDefaultValues = require('./GenerateDefaultValues');

var _GenerateDefaultValues2 = _interopRequireDefault(_GenerateDefaultValues);

var _Validator = require('./Validator');

var _Validator2 = _interopRequireDefault(_Validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function UpdateNode(neode, model, identity, properties) {
    var query = '\n        MATCH (node) \n        WHERE id(node) = {identity} \n        SET node += {properties} \n        RETURN properties(node) as properties\n    ';

    properties.isUpdate = true;
    return (0, _GenerateDefaultValues2.default)(neode, model, properties, true).then(function (properties) {
        return (0, _Validator2.default)(neode, model, properties);
    }).then(function (properties) {
        return neode.writeCypher(query, { identity: identity, properties: properties }).then(function (res) {
            return res.records[0].get('properties');
        });
    });

}