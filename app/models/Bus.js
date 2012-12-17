var Model = require('core/Model');

var Bus = Model.extend({
    defaults: {
        name: "",
        lat: null,
        lng: null
    },

    idAttribute: "id"
});

module.exports = Bus;