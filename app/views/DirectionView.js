var View     = require('core/View');
var template = require('templates/DirectionTemplate');

var DirectionView = View.extend({
	  
	  template: template,
	  
	  events: {
	  	"click .check"	: "checks", 
	  },

	  initialize: function() {
	  	_.bindAll(this, 'render');
	  	this.model.on("change", this.render);
	  },
	   	
	  pippo: function() {
	  	console.log("pippo")
	  },
	  render: function() {
	    this.$el.html(this.template(this.model.toJSON()));
	    return this
	  },

	  checks: function(e) {
	  	this.model.set("checked", !this.model.get("checked"))
	  }

	});

module.exports = DirectionView;