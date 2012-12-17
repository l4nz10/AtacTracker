var View     = require('core/View');
var template = require('templates/LegendTemplate');
var LegendItemView = require('views/LegendItemView')

var LegendView = View.extend({
      
      template: template,
      
      render: function(directions) {
        this.$el.html(this.template);
        console.log("dentro legend view")
        that = this;
        num = 0;
        directions.each(function (model) {
            if (model.get('checked')) {
                num++;
                that.addOne(model, num);
            };
        });
        return this
      },

      addOne: function(model, num) {
        var legend_item_view = new LegendItemView({model: model});
        this.$el.find('#legend_list').append(legend_item_view.render(num).el);
      }

    });

module.exports = LegendView;