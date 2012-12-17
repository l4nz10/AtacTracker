var View     = require('core/View');
var template = require('templates/MainTemplate');
var LegendView = require('views/LegendView');

var MainView = View.extend({
      
      template: template,
      
      el: 'body',

      render: function(linesView, directionsView, mapView) {
        this.$el.html(this.template());
        this.$el.find("#lines").html(linesView.render().el)
        this.$el.find("#directions").html(directionsView.render().el)
        mapView.render()
        return this
      },

      showLegend: function(directions) {
        console.log("dentro showLegend")
        var legend_view = new LegendView();
        this.$el.find('#legend').html(legend_view.render(directions).el);
      }

    });

module.exports = MainView;