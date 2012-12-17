var View     = require('core/View');
var DirectionView = require('views/DirectionView');
var template = require('templates/DirectionsTemplate');

var DirectionsView = View.extend ({

    tagName: "div",

    tagClass: "directions",

	template: template,

	events: {
		"click #select_directions" : "getSelected",
	},

    listViews: [],

	initialize: function (){
		_.bindAll(this, "addOne", "addAll", "render", "renderViews", "appendView");
		this.collection.on('add', this.addOne);
        this.collection.on('reset',this.render);
        this.collection.on('reset', this.addAll);
        this.collection.on('change', this.renderViews);

	},

	addOne: function(direction) {
        var direction_view = new DirectionView({model: direction});
        this.listViews.push(direction_view);
        this.appendView(direction_view);
        // this.$el.find('#input_directions').append(direction_view.render().el);
    },

    renderViews: function() {
        _.each(this.listViews, function(direction_view) {
            direction_view.render();
        });
    },

    appendView: function(direction_view) {
        this.$el.find('#input_directions').append(direction_view.render().el);
    },

    clearViews: function () {
        this.$el.find('#input_directions').empty();
    },

    addAll: function() {
        var that = this;
        this.listViews = [];
        this.collection.each(function (model) {
            that.addOne(model);
        });
        // this.$el.find('#input_directions').empty()  
        // this.collection.each(this.addOne)
    }, 

	render: function() {
		var that = this;
        this.$el.html(this.template);
		this.renderViews();
		return this;
	},

	getSelected: function() {
        this.collection.goToStation()
        return false;
	}

})

module.exports = DirectionsView;
