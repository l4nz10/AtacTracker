var View     = require('core/View');
var template = require('templates/LegendItemTemplate');

var LegendItemView = View.extend({
      
      template: template,
      
      render: function(num) {

        var direction_name = this.model.get("name");
        var icon = /markers/+num+"_legend.png"
        console.log(icon);
        this.$el.html(this.template({name: direction_name, img: icon}));
        return this
      }

    });

module.exports = LegendItemView;