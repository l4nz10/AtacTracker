var View     = require('core/View');
var LineView = require('views/LineView');
var template = require('templates/LinesTemplate');
var application = require('Application');

var LinesView = View.extend ({

	tagName: "div",

    tagClass: "Lines",

	template: template,

	events: {
		"click #select_lines" : "getSelected",
	},

    listViews: [],

	initialize: function (){
		_.bindAll(this, "addOne", "addAll", "render", "renderViews", "appendView");
        this.collection.on('add', this.addOne);
		this.collection.on('reset',this.render);
        this.collection.on('reset', this.addAll);
        this.collection.on('change', this.renderViews);
        this.directions_view = application.directions_view;
	},

	addOne: function(linea) {
        var line_view = new LineView({model: linea});
        this.listViews.push(line_view);
        this.appendView(line_view);
    },

    renderViews: function () {
        _.each(this.listViews, function (line_view) {
            line_view.render();
        })
    },

    appendView: function (line_view) {
        this.$el.find('#input_lines').append(line_view.render().el);
    },

    // appendViews: function() {
    //     var that = this;
    //     this.clearViews();
    //     _.each(this.listViews, function (line_view) {
    //         that.appendView(line_view);
    //     })
    // },

    clearViews: function() {
        this.$el.find('#input_lines').empty()
    },

    addAll: function() {
        var that = this;
        this.listViews = [];
        this.collection.each(function (model) {
            that.addOne(model);
        });
    },

	render: function() {
        var that = this
		this.$el.html(this.template());
        this.renderViews()
		return this;
	},

	getSelected: function() {
		this.collection.goToDirections()
        this.directions_view.render()

        return false;
	}

})

module.exports = LinesView;
