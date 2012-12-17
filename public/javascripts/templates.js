window.require.define({"templates/DirectionTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    
    return " checked ";}

    buffer += "\n<label class=\"checkbox\">\n    <input class=\"check\" ";
    stack1 = depth0.checked;
    stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += " type=\"checkbox\">\n    ";
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + " - (";
    foundHelper = helpers.id;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + ")\n<label>\n";
    return buffer;});
}});

window.require.define({"templates/DirectionsTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "\n    <div class=\"row-fluid\">\n        <div class=\"span12\">\n            <form>\n                <fieldset>\n                     <legend>Directions</legend>\n            	     <div id=\"input_directions\">\n                     </div>\n                </fieldset>\n                <button id=\"select_directions\" class=\"btn\"> <i class=\"icon-road\"></i> Show on map</button> \n            </form>\n        </div>\n    </div>\n";});
}});

window.require.define({"templates/LegendItemTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<div>\n    <img src=\"";
    foundHelper = helpers.img;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.img; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\"> ";
    foundHelper = helpers.icon;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.icon; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1);
    foundHelper = helpers.name;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\n</div>";
    return buffer;});
}});

window.require.define({"templates/LegendTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"row-fluid\">\n    <div class=\"span12\">\n        <form>\n            <fieldset>\n                <legend>Legend</legend>\n                <div id=\"legend_list\"></div>\n                <div>\n                    <div>\n                        <img src=\"/markers/start_legend.png\"> Stazione di partenza\n                    </div>\n                    <div>\n                        <img src=\"/markers/end_legend.png\"> Stazione d'arrivo\n                    </div>\n                    <div>\n                        <img src=\"/markers/bus_legend.png\"> Autobus in circolazione\n                    </div>\n                </div> \n            </fieldset>\n        </form>\n    </div>\n</div> ";});
}});

window.require.define({"templates/LineTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, self=this, functionType="function", escapeExpression=this.escapeExpression;

  function program1(depth0,data) {
    
    
    return " checked ";}

    buffer += "<label class=\"checkbox\">\n    <input class=\"check\" ";
    stack1 = depth0.checked;
    stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += " type=\"checkbox\">\n    ";
    foundHelper = helpers.number;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.number; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + " \n<label>\n";
    return buffer;});
}});

window.require.define({"templates/LinesTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"row-fluid\">\n    <div class=\"span12\">\n        <form>\n                <fieldset>\n                     <legend>Lines</legend>\n            	     <div id=\"input_lines\">\n\n                     </div>\n            	     <button id=\"select_lines\" class=\"btn\" > <i class=\"icon-search\"></i> Get directions</button> \n                </fieldset>\n            </form>\n        </div>\n</div>\n";});
}});

window.require.define({"templates/MainTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div class=\"container-fluid\">\n    <div class=\"page-header\">\n        <h1>AtacTracker <small>Monitoraggio trasporti pubblici</small></h1>\n    </div>\n    <div class=\"row-fluid\">\n        <div class=\"span5\">\n            <div id=\"lines\">\n            </div>\n            <div id=\"directions\">\n            </div>\n            <div id=\"legend\">\n            </div>   \n            <div>  </div>\n        </div>\n        <div class=\"span7\" id=\"map_canvas\">\n        </div>\n    </div>\n    <div class=\"row-fluid\">\n        <div class=\"page-header\"></div>\n    </div>\n</div>";});
}});

window.require.define({"templates/MapTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"map_canvas\">\n</div>";});
}});

window.require.define({"templates/homeViewTemplate": function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1;
    buffer += "\n  			<li>";
    stack1 = depth0.nome;
    stack1 = typeof stack1 === functionType ? stack1() : stack1;
    buffer += escapeExpression(stack1) + "</li>\n  		";
    return buffer;}

    buffer += "<!--\n	Author: \n	Date: \n\n	Description: Template Description\n-->\n\n<div id=\"content\">\n  <div id=\"artist\">";
    foundHelper = helpers.artist;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.artist; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</div>\n  <div id=\"operas\">\n  	<ul>\n  		";
    stack1 = depth0.operas;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n  </div>\n</div>\n";
    return buffer;});
}});

