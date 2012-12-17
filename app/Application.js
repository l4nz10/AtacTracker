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
