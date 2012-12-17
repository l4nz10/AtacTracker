var Model = require('core/Model');

var Line = Model.extend({
    defaults: {
        number: "",
        checked: false
    },

    idAttribute: "number",

    changeChecked: function() {
        this.checked = !this.checked;
    }

    
});

module.exports = Line;