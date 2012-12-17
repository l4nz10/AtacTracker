(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle) {
    for (var key in bundle) {
      if (has(bundle, key)) {
        modules[key] = bundle[key];
      }
    }
  }

  globals.require = require;
  globals.require.define = define;
  globals.require.brunch = true;
})();

window.require.define({"Application": function(exports, require, module) {
  //JavaScript////////////////////////////////////////////////////////////////////
  // 
  // Copyright 2012 
  // 
  ////////////////////////////////////////////////////////////////////////////////

  /**
   * Application Bootstrapper
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */
  Application = {

      //--------------------------------------
      //+ PUBLIC PROPERTIES / CONSTANTS
      //--------------------------------------

      //--------------------------------------
      //+ INHERITED / OVERRIDES
      //--------------------------------------

      initialize: function() {

          // Import views
          var ApplicationRouter = require('routers/ApplicationRouter');
          var LinesView = require('views/LinesView');
          var Lines = require('collections/Lines');        
          var DirectionsView = require('views/DirectionsView');
          var Directions = require('collections/Directions');
          var Stations = require('collections/Stations');
          var Busses = require('collections/Busses');
          var MapElements = require('models/MapElements');
          var MapView = require('views/MapView');
          var MainView = require('views/MainView');
          var LegendView = require('views/LegendView');
          
          // linee.add([{nome: '170'},
          //            {nome: '766'},
          //            {nome: '23'}]);
          // linee.add([{nome: '43'}])

          // Initialize views
          // this.homeView = new HomeView();
          this.applicationRouter = new ApplicationRouter();
          router = this.applicationRouter
          
          this.Lines = Lines
          this.lines = new Lines();
          this.lines_view = new LinesView({collection: this.lines});

          this.directions = new Directions();
          this.directions_view = new DirectionsView({collection: this.directions});

          this.stations = new Stations();
          this.busses = new Busses();
          this.map_elements = new MapElements({stations: this.stations, busses: this.busses});
          console.log(this.map_elements)
          this.map_view = new MapView({model: this.map_elements});
          this.main_view = new MainView();
          this.legend_view = new LegendView();


          if (typeof Object.freeze === 'function') Object.freeze(this);

          this.main_view.render(this.lines_view, this.directions_view, this.map_view);

          $(window).resize(function () {
              var h = $("#map_canvas").width()
              console.log(h)
              $('#map_canvas').css('height', h/1.2);
          }).resize();
          // setInterval(this.map_view.render, 1000)
      }
  }

  module.exports = Application;
  
}});

window.require.define({"collections/Busses": function(exports, require, module) {
  var Collection = require('core/Collection');
  var Bus = require('models/Bus');

  var Busses = Collection.extend({
      
      model: Bus,
      
      url: '/busses',
      
      initialize: function() {
          this.prefix = '';
      },
      
      setUrl: function(trigger, tail, head) {
          if (head)
              this.prefix = head

          router.navigate(this.prefix + this.url, {trigger: trigger})
               
      }

  });

  module.exports = Busses;
}});

window.require.define({"collections/Directions": function(exports, require, module) {
  var Collection = require('core/Collection');
  var Direction = require('models/Direction');

  var Directions = Collection.extend({
      
      model: Direction,
      url: '/directions',
      
      initialize: function() {
          this.on("change", this.setSelectedOnUrl);
          this.prefix = '';
      },
      parseSelected : function() {
          var selected = this.filter(function(direction) {return direction.get("checked")});
          var directions = _.map(selected, function(direction) {return direction.get("id")})
          return directions.join("-")
      },
      
      setSelectedOnUrl: function() {
          this.setUrl(false)
      },

     setUrl: function(trigger, tail, head) {
          if (head)
              this.prefix = head

          var selected = this.parseSelected()

          if (selected.length > 0) {
              var url = [this.prefix + this.url, selected]
              if (tail) {
                  url.push(tail)
              }
              console.log("DIRECTIONS: " + url)
              router.navigate(url.join('/'), {trigger: trigger})    
          } else {
              router.navigate(this.prefix + this.url, {trigger: trigger})
          }   
      },

      goToStation: function() {
          var url = ["getstations", this.parseSelected()]
          router.navigate(url.join('/'), {trigger: true, replace:true})
          this.setUrl(false, "stations")
      }
  });

  module.exports = Directions;
}});

window.require.define({"collections/Lines": function(exports, require, module) {
  var Collection = require('core/Collection');
  var Line = require('models/Line');

  var Lines = Collection.extend({
      model: Line,
      url: '/lines',
      initialize: function() {
          this.on("change", this.setLines)
      },
      parseSelected: function() {
          var selected = this.filter(function(linea) {return linea.get("checked")});
          var lines = _.map(selected, function(linea) {return linea.get("number")})
          return lines.join("-")
      },
      setLines: function() {
          this.setUrl(false)

      },
      getSelected : function() {
          this.setUrl(true, "directions")
      },
      
      setUrl: function(trigger, tail, head) {
          
          if (!this.prefix) {
              this.prefix = head || ''
          }
          
          var selected = this.parseSelected()
          console.log(selected)

          if (selected.length > 0) {
              
              var url = [this.prefix + this.url, selected]
              
              if (tail) {
                  url.push(tail)
              }
              console.log(url)

              router.navigate(url.join('/'), {trigger: trigger})
                  
          } else {
              router.navigate(this.prefix + this.url, {trigger: trigger})
          }
          
      },

      goToDirections: function() {
          var url = ["getdirections", this.parseSelected()]
          console.log(url)
          router.navigate(url.join('/'), {trigger: true, replace:true})
          this.setUrl(false, "directions")
      }

  });

  module.exports = Lines;
}});

window.require.define({"collections/Stations": function(exports, require, module) {
  var Collection = require('core/Collection');
  var Station = require('models/Station');

  var Stations = Collection.extend({
      model: Station,
      url: '/stations',
      initialize: function() {
          this.prefix = '';
      },
      setUrl: function(trigger, tail, head) {
          if (head)
              this.prefix = head

          router.navigate(this.prefix + this.url, {trigger: trigger})
               
      }

  });

  module.exports = Stations;
}});

window.require.define({"config/ApplicationConfig": function(exports, require, module) {
  /**
   * Application Configuration
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationConfig = (function() {

  	/*
     	 * @private
  	 */
  	var _baseUrl = "/";

  	/*
     	 * Public interface
  	 */
  	return {
  		BASE_URL: _baseUrl
  	}

  }).call()

  module.exports = ApplicationConfig;
}});

window.require.define({"core/Collection": function(exports, require, module) {
  /**
   * Base Class for all Backbone Collections
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  Collection = Backbone.Collection.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
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

  module.exports = Collection;
}});

window.require.define({"core/Model": function(exports, require, module) {
  /**
   * Base Class for all Backbone Models
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  Model = Backbone.Model.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

  	//--------------------------------------
  	//+ INHERITED / OVERRIDES
  	//--------------------------------------
  	
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

  module.exports = Model;
  
}});

window.require.define({"core/Router": function(exports, require, module) {
  /**
   * Backbone Primary Router
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  Router = Backbone.Router.extend({

  	//--------------------------------------
      //+ INHERITED / OVERRIDES
      //--------------------------------------
      
  	routes: {},

      /**
       * Initializes the Base router
       * @param  {Object} options 
       * 
       */
      initialize: function( options ) {

      }
  });

  module.exports = Router;
}});

window.require.define({"core/View": function(exports, require, module) {
  /**
   * View Base Class
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  require('helpers/ViewHelper');

  View = Backbone.View.extend({

    //--------------------------------------
    //+ PUBLIC PROPERTIES / CONSTANTS
    //--------------------------------------

    /*
     * @private
     */
    template: function() {},
    /*
     * @private
     */
    getRenderData: function() {},

    //--------------------------------------
    //+ INHERITED / OVERRIDES
    //--------------------------------------
    
    /*
     * @private
     */
    initialize: function() {
      this.render = _.bind(this.render, this);
    },

    /*
     * @private
     */
    render: function() {
      this.$el.html( this.template( this.getRenderData() ) );
      this.afterRender();
      
      return this;
    },

    /*
     * @private
     */
    afterRender: function() {}

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

  module.exports = View;
  
}});

window.require.define({"events/ApplicationEvents": function(exports, require, module) {
  /**
   * Application Events
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var ApplicationEvents = (function() {

  	/*
     	 * @private
  	 */
  	var _applicationInitialized = "onApplicationInitialized";

  	/*
     	 * Public interface
  	 */
  	return {
  		APPLICATION_INITIALIZED: _applicationInitialized
  	}
  	
  }).call();

  module.exports = ApplicationConfig;
}});

window.require.define({"helpers/ViewHelper": function(exports, require, module) {
  /**
   * Handlebars Template Helpers
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */


  //--------------------------------------
  //+ PUBLIC PROPERTIES / CONSTANTS
  //--------------------------------------

  //--------------------------------------
  //+ PUBLIC METHODS / GETTERS / SETTERS
  //--------------------------------------

  /*
  * @return String
  */
  Handlebars.registerHelper( 'link', function( text, url ) {

    text = Handlebars.Utils.escapeExpression( text );
    url  = Handlebars.Utils.escapeExpression( url );

    var result = '<a href="' + url + '">' + text + '</a>';

    return new Handlebars.SafeString( result );
  });
  
}});

window.require.define({"initialize": function(exports, require, module) {
  
  /**
   * Application Initializer
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  application = require('Application');

  $(function() {

  	// Initialize Application
  	application.initialize();

  	// Start Backbone router
    	Backbone.history.start();
  });
  
}});

window.require.define({"models/Bus": function(exports, require, module) {
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
}});

window.require.define({"models/Direction": function(exports, require, module) {
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
}});

window.require.define({"models/Line": function(exports, require, module) {
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
}});

window.require.define({"models/MapElements": function(exports, require, module) {
  var Model = require('core/Model');
  var Stations = require('collections/Stations');
  var Busses = require('collections/Busses');

  var MapElements = Model.extend({
      defaults: {
          stations: null,
          busses: null
      }
  });

  module.exports = MapElements;
}});

window.require.define({"models/Station": function(exports, require, module) {
  var Model = require('core/Model');

  var Station = Model.extend({
      defaults: {
          name: "",
          lat: null,
          lng: null,
      },

      idAttribute: "id"
  })

  module.exports = Station;
}});

window.require.define({"routers/ApplicationRouter": function(exports, require, module) {
  /**
   * Backbone Primary Router
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var Router = require('core/Router');
  var application = require('Application');

  var filter_collection = function (collection, to_filter){ 
      to_filter = to_filter || ""
      json_lines = to_filter.split('-')
      collection.each(function(model) {
          if (_.contains(json_lines, model.id)) {
              model.set({'checked': true}, {'silent': true});
          }
      })
      collection.trigger("change")
  }

  var interval;

  ApplicationRouter = Router.extend({

      //--------------------------------------
          //+ Routes
          //--------------------------------------
          
          routes: {
              '': 'home',
              'getstations/:directions': 'loadOnlyStations',
              'getdirections/:lines': 'loadOnlyDirections',
              'lines': 'loadLines',
              'lines/': 'loadLines',
              'lines/:lines' : 'loadLines',
              'lines/:lines/' : 'loadLines',

              'lines/:lines/directions' : 'loadDirections',
              'lines/:lines/directions/' : 'loadDirections',
              'lines/:lines/directions/:directions' : 'loadDirections',
              'lines/:lines/directions/:directions/' : 'loadDirections',
              
              'lines/:lines/directions/:directions/stations' : 'loadMap'

          },

          //--------------------------------------
          //+ Route Handlers
          //--------------------------------------

          home: function() {
              application.lines.fetch({
                  success: function(collection) {
                      collection.setUrl(false, "", Backbone.history.fragment)
                  }
              });
          },

          loadLines: function(lines) {
              application.lines.fetch({
                  success: function(collection){
                      filter_collection(collection,lines)
                  }
              })
          },

          loadDirections: function(lines, directions) {

              application.lines.fetch({
                  success:function (collection) {
                      filter_collection(collection, lines)
                      application.directions.fetch({
                          data: {"lines":lines},
                          success: function(collection) {
                              collection.setUrl(false, "", Backbone.history.fragment);
                              if (directions) {
                                  filter_collection(collection, directions);
                              }
                          },
                          error: function () {
                              console.log("Fail")
                          }
                      })
                  }
              })
          },

          loadMap: function(lines, directions) {
              application.lines.fetch({
                  success:function (collection) {
                      filter_collection(collection, lines)
                      application.directions.fetch({
                          data: {"lines":lines},
                          success: function(collection) {
                              console.log(Backbone.history.fragment)
                              collection.setUrl(false, "", Backbone.history.fragment);
                              console.log(directions)
                              if (directions) {
                                  filter_collection(collection, directions);
                              }
                              application.stations.fetch({
                                  data:{"directions":directions},
                                  success: function(collection) {
                                      application.main_view.showLegend(application.directions);
                                      collection.setUrl(false, "", Backbone.history.fragment);
                                  }
                              })
                              application.busses.fetch({data: {"directions": directions}})
                              interval = setInterval( function() {
                                                   application.busses.fetch({data: {"directions": directions}})
                                                  },
                                                  2000);
                          },
                          error: function () {
                              console.log("Fail")
                          }
                      })
                  }
              })
          },

          loadOnlyDirections: function(lines) {
              var fragment = ["lines", application.lines.parseSelected()]
              var fragment = fragment.join("/")
              application.directions.fetch({
                  data: {"lines": lines},
                  success: function (collection) {
                      collection.setUrl(false, "", fragment);
                  }
              })
          },

          loadOnlyStations: function(directions) {
              application.stations.fetch({
                  data: {"directions": directions},
                  succes: function() {
                      application.main_view.showLegend(application.directions);
                  },
              })

              clearInterval(interval);
              interval = setInterval( function() {
                      application.busses.fetch({data:{"directions": directions}})
                  },
                  2000);
          }
  });

  module.exports = ApplicationRouter;
}});

window.require.define({"utils/BackboneView": function(exports, require, module) {
  /**
   * View Description
   * 
   * @langversion JavaScript
   * 
   * @author 
   * @since  
   */

  var View     = require('core/View');
  var template = require('templates/HomeViewTemplate');

  BackboneView = View.extend({

  	//--------------------------------------
  	//+ PUBLIC PROPERTIES / CONSTANTS
  	//--------------------------------------

    	/*
     	 * @private
  	 */
  	id: 'view',
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
  			content: "View Content"
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

  module.exports = BackboneView;
}});

window.require.define({"views/DirectionView": function(exports, require, module) {
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
}});

window.require.define({"views/DirectionsView": function(exports, require, module) {
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
  
}});

window.require.define({"views/HomeView": function(exports, require, module) {
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

  
}});

window.require.define({"views/LegendItemView": function(exports, require, module) {
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
}});

window.require.define({"views/LegendView": function(exports, require, module) {
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
}});

window.require.define({"views/LineView": function(exports, require, module) {
  var View     = require('core/View');
  var template = require('templates/LineTemplate');

  var LineView = View.extend({
  	  
  	  template: template,
  	  
  	  events: {
  	  	"click .check"	: "checks", 
  	  },

  	  initialize: function() {
  	  	_.bindAll(this, 'render');
  	  	this.model.on("change", this.render);
  	  },
  	  
  	  render: function() {
  	    this.$el.html(this.template(this.model.toJSON()));
  	    return this
  	  },

  	  checks: function(e) {
  	  	this.model.set("checked", !this.model.get("checked"))
  	  }

  	});

  module.exports = LineView;
}});

window.require.define({"views/LinesView": function(exports, require, module) {
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
          this.directions_view = new DirectionsView();

          return false;
  	}

  })

  module.exports = LinesView;
  
}});

window.require.define({"views/MainView": function(exports, require, module) {
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
}});

window.require.define({"views/MapView": function(exports, require, module) {
  var View     = require('core/View');
  var template = require('templates/MapTemplate');

  var MapView = View.extend({
        
        template: template,

        mapStations: {},

        mapBusses: {},
        
        initialize: function() {

          _.bindAll(this, "render", "addStation", "addStations", "addBus", "addBusses");
          this.stations = this.model.get("stations");
          this.busses = this.model.get("busses");
          this.stations.on("reset", this.addStations);
          this.stations.on("add", this.addStation);
          this.busses.on("reset", this.addBusses);
          this.busses.on("add", this.addBus);
        },

        render: function() {
          
          this.$el.html(this.template());
          var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };
          this.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
          mappa = this.map
          return this
        },

        addStations: function() {
          var that = this;
          _.each(this.mapStations, function (marker) {
            marker.setMap(null);
          });
          this.mapStations = {};
          this.stations.each(function (model) {
              that.addStation(model);
          });
        },

        addStation: function(station) {
          
          var pos = new google.maps.LatLng(station.get("lat"), station.get("lng"));

          var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: station.get("name"),
            //icon: this.generateIcon(station)
          });

          this.mapStations[station.id] = marker;

          console.log(this.mapStations)
        },

        addBusses: function() {
          var that = this;
          _.each(this.mapBusses, function (marker) {
            marker.setMap(null);
          });
          this.mapBusses = {};
          this.busses.each(function (model) {
              that.addBus(model);
          });
        },

        addBus: function(bus) {
          
          var pos = new google.maps.LatLng(bus.get("lat"), bus.get("lng"));

          var marker = new google.maps.Marker({
            position: pos,
            map: this.map,
            title: bus.get("name") 
          });

          this.mapBusses[bus.id] = marker;

          console.log(this.mapBusses)
        },

        generateIcon: function(model) {
            var iconPath = "markers/"+model.get('iconId')+"_"+model.get('type')+".png";
            return new google.maps.MarkerImage(iconPath)
        }


  });

  module.exports = MapView;
}});

