var Model = require('core/Model');

var Station = Model.extend({
    defaults: {
        name: "",
        lat: null,
        lng: null,
    },

    idAttribute: "id"
})

module.exports = Station;