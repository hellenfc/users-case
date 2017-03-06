
sap.ui.define(
  ['sap/ui/core/Control'],
  function(Control) {
  return Control.extend("dalrae.ui.containers.ShadowBox",{
       metadata: {
            properties: {},
            aggregations: {},
       },
       renderer: function(oRm,oControl){
            oRm.write("<span>HELLO WORLD</span>"); //output some html so we can see the control is working!
       },
       onAfterRendering: function(arguments) {
            //if I need to do any post render actions, it will happen here
            if(sap.ui.core.Control.prototype.onAfterRendering) {
                 sap.ui.core.Control.prototype.onAfterRendering.apply(this,arguments); //run the super class's method first
            }
       },
  });
  }
);
