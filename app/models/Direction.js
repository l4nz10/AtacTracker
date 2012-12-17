var Model = require('core/Model');

var Direction = Model.extend({
    defaults: {
        id: "",
        name: "",
        checked: false,
    },

    idAttribute: "id",

    changeChecked: function() {
        this.checked = !this.checked;
    }
});

module.exports = Direction;