sap.ui.define(
    ['sap/ui/core/Control'],
    function(Control) {
        return Control.extend("sap.ui.demo.wt.control.CustomControl", {
            metadata: {
                properties: { // setter and getter are generated
                    // incl. databinding and validation
                    title: {
                        type: "string"
                    },
                    number: {
                        type: "string"
                    },
                    desktop: {
                        type: "string"
                    },
                    server1: {
                        type: "string"
                    },
                    mobile1: {
                        type: "string"
                    },
                    server2: {
                        type: "string"
                    },
                    mobile2: {
                        type: "string"
                    },
                    label1: {
                        type: "string"
                    },
                    label2: {
                        type: "string"
                    },
                    label3: {
                        type: "string"
                    },
                    icon1: {
                        type: "string"
                    },
                    icon2: {
                        type: "string"
                    }
                },
                aggregations: {
                    content: {
                        type: "sap.ui.core.Control"
                    }
                },
                defaultAggregation: "content",
            },

            renderer: function(oRm, oControl) {
                // console.log(oControl.getIcon1)
                oRm.write("<div");
                oRm.writeControlData(oControl); // the Control ID
                oRm.addClass("square"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");

                oRm.renderControl(oIcon);

                oRm.write("<label>");
                oRm.writeEscaped(oControl.getTitle());
                oRm.write("</label>");
                oRm.write("<h1");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getNumber());
                oRm.write("</h1>");

                oRm.renderControl(oIcon2);

                oRm.write("<table");
                oRm.addClass("table"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.write("<tr>");
                oRm.write("<td");
                oRm.addClass("aligncenter"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getLabel1());
                oRm.write("</td>");
                oRm.write("<td");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getDesktop());
                oRm.write("</td>");
                oRm.write("</tr>");
                oRm.write("<tr>");
                oRm.write("<td");
                oRm.addClass("aligncenter"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getLabel2());
                oRm.write("</td>");
                oRm.write("<td");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getServer1());
                oRm.write("</td>");
                oRm.write("</tr>");
                oRm.write("<tr>");
                oRm.write("<td");
                oRm.addClass("aligncenter"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getLabel3());
                oRm.write("</td>");
                oRm.write("<td");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getMobile1());
                oRm.write("</td>");
                oRm.write("</tr>");
                oRm.write("<tr>");
                oRm.write("<td");
                oRm.addClass("aligncenter"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getLabel2());
                oRm.write("</td>");
                oRm.write("<td");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getServer2());
                oRm.write("</td>");
                oRm.write("</tr>");
                oRm.write("<tr>");
                oRm.write("<td");
                oRm.addClass("aligncenter"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getLabel3());
                oRm.write("</td>");
                oRm.write("<td");
                oRm.addClass("alignright"); // add a CSS class
                oRm.writeClasses();
                oRm.write(">");
                oRm.writeEscaped(oControl.getMobile2());
                oRm.write("</td>");
                oRm.write("</tr>");
                oRm.write("</table>");

                oRm.write("</div>");

                var oIcon = new sap.ui.core.Icon({
                    src: oControl.getIcon1()
                });
                var oIcon2 = new sap.ui.core.Icon({
                    src: oControl.getIcon1()
                });
                //  console.log("Get Icon",oControl.getIcon1());
                //  console.log("variable", oIcon);

            },

            onAfterRendering: function(arguments) {
                if (sap.ui.core.Control.prototype.onAfterRendering) {
                    sap.ui.core.Control.prototype.onAfterRendering.apply(this, arguments);
                }
            },

        });
    }
);
