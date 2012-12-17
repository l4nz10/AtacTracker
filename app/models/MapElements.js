var Model = require('core/Model');
var Stations = require('collections/Stations');
var Busses = require('collections/Busses');

var MapElements = Model.extend({
    defaults: {
        stations: null,
        busses: null
    }
});

module.exports = MapElements;