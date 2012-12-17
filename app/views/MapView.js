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