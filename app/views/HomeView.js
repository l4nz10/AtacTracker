/**
 * View Description
 * 
 * @langversion JavaScript
 * 
 * @author 
 * @since  
 */

var View     = require('core/View');
var template = require('templates/homeViewTemplate');

HomeView = View.extend({

	//--------------------------------------
	//+ PUBLIC PROPERTIES / CONSTANTS
	//--------------------------------------

  	/*
   	 * @private
	 */
	id: 'home-view',
	/*
   	 * @private
   	*/
	template: template,

	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------

	/*
	 * @private
	 */
	initialize: function() {
		this.render = _.bind( this.render, this );
	},

	/*
	 * @private
	 */
	render: function() {
		this.$el.html( this.template( this.getRenderData() ) );

		return this;
	},

	/*
	 * @private
	 */
	getRenderData: function() {
		return {
			artist: "Robert Ashley",
			operas: [
				{nome: "Music with Roots in the Aether (television opera) (1976)"},
				{nome: "Perfect Lives (television opera) (1978–83)"},
				{nome: "Atalanta (Acts of God) (1982–91)"},
				{nome: "Improvement (Don Leaves Linda) (1985)"},
				{nome: "eL/Aficionado (1987)"},
				{nome: "Now Eleanor's Idea (1993)"},
				{nome: "Foreign Experiences (1994)"},
				{nome: "Celestial excursions (2003)"},
				{nome: "Concrete (2006)"}
			]
		}
	}

	//--------------------------------------
	//+ PUBLIC METHODS / GETTERS / SETTERS
	//--------------------------------------

	//--------------------------------------
	//+ EVENT HANDLERS
	//--------------------------------------

	//--------------------------------------
	//+ PRIVATE AND PROTECTED METHODS
	//--------------------------------------

});

module.exports = HomeView;

