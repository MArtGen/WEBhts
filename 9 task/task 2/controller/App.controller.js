sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.ui.demo.db.controller.App", {
        onInit: function() {
            var sUrl = "https://services.odata.org/TripPinRESTierService/People";

            $.ajax({
                url     : sUrl,
                type    : "GET",
                dataType: "json",
                context : this, 
                error   : function() {
                    console.log('Error');				
                },
                success : function(oData) {
                    var oModel = new JSONModel(oData);
                    var oTable = this.byId("PeopleTable");
                    oTable.setModel(oModel);
                    console.log(oData);
                    console.log("success");
                }		
            });
        }
	});
});