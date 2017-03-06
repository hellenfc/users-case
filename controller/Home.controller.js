sap.ui.define([
    'jquery.sap.global',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageToast'
], function(jQuery, Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("sap.ui.demo.wt.controller.Home", {
        onInit: function() {
            var jsonData = {
                // "formComplete": 0,
                // "flagCountry": false,
                // "flagState": false,
                // "flagCity": false,
                // "flagType": false,
                "places": [{
                        "id": 0,
                        "country": "United States",
                        "states": [{
                                "id": 0,
                                "name": "Kentucky",
                                "cities": [{
                                        "id": 0,
                                        "name": "Kcity1"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Kcity2"
                                    }
                                ]
                            },
                            {
                                "id": 1,
                                "name": "Florida",
                                "cities": [{
                                        "id": 0,
                                        "name": "Fcity1"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Fcity2"
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "country": "Brasil",
                        "states": [{
                                "id": 0,
                                "name": "Acre",
                                "cities": [{
                                        "id": 0,
                                        "name": "Acrecity1"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Acrecity2"
                                    }
                                ]
                            },
                            {
                                "id": 1,
                                "name": "Bahia",
                                "cities": [{
                                        "id": 0,
                                        "name": "Bcity1"
                                    },
                                    {
                                        "id": 1,
                                        "name": "Bcity2"
                                    }
                                ]
                            }
                        ]
                    }
                ],
                "users": [{
                        "id": "1",
                        "fName": "Mario",
                        "mName": "Isack",
                        "lName": "Perez",
                        "bDate": "",
                        "email": "p@mgial.coom",
                        "country": 1,
                        "state": 1,
                        "city": 0,
                        "address1": "1",
                        "address2": "2",
                        "zip": "2",
                        "account": "User",
                        "timeMod": [{
                                "date": "02/28/2017",
                                "time": "14:33:5",
                                "type": "save"
                            }

                        ]
                    }
                                    ]
            };
            var oModelData = new JSONModel(jsonData);
            this.getView().setModel(oModelData);

            var userData = {
                "id": "",
                "fName": "",
                "mName": "",
                "lName": "",
                "bDate": "",
                "email": "",
                "country": "",
                "state": "",
                "city": "",
                "address1": "",
                "address2": "",
                "zip": "",
                "account": "",
                "timeMod": []
            };
            var oViewModel = new JSONModel(userData);
            this.getView().setModel(oViewModel, "userData");
        },

        //Handles the navegation
        handleNav: function(evt) {
            var navCon = this.getView().byId("navCon");
            var target = evt.getSource().data("target");
            if (target) {
                var animation = "slide";
                navCon.to(this.getView().byId(target), animation);
            } else {
                navCon.back();
                this.clean();
            }
        },

        clean: function() {
            var userData = {
                "id": "",
                "fName": "",
                "mName": "",
                "lName": "",
                "bDate": "",
                "email": "",
                "country": "",
                "state": "",
                "city": "",
                "address1": "",
                "address2": "",
                "zip": "",
                "account": "",
                "timeMod": []
            };
            var oViewModel = new JSONModel(userData);
            this.getView().setModel(oViewModel, "userData");
        },

        //Gets states for the select in the edit view
        getStatesEdit: function(event) {
            var view = this.getView();
            view.byId("stateEdit").removeAllItems();
            view.byId("cityEdit").removeAllItems();
            var selectedCountry = view.byId("countryEdit").getSelectedItem().getKey();
            var selectedCountryText = view.byId("countryEdit").getSelectedItem().getText();
            var statesBox = this.getView().byId("stateEdit");
            this.getView().byId("stateEdit").setEnabled(true);
            // Adding elements to the select
            statesBox.bindAggregation("items", "/places/" + selectedCountry + "/states", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));
            this.inputAdd();
        },

        //Gets cities for the select in the edit view
        getCitiesEdit: function(event) {
            var view = this.getView();
            var selectedCountry = view.byId("countryEdit").getSelectedItem().getKey();
            var selectedState = view.byId("stateEdit").getSelectedItem().getKey();
            var selectedStateText = view.byId("stateEdit").getSelectedItem().getText();
            var cityBox = this.getView().byId("cityEdit");
            this.getView().byId("cityEdit").setEnabled(true);
            cityBox.bindAggregation("items", "/places/" + selectedCountry + "/states/" + selectedState + "/cities", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));
            this.inputAdd();
        },

        //Get states for the add user view
        getStatesNew: function(event) {
            var view = this.getView();
            view.byId("stateNew").removeAllItems();
            view.byId("cityNew").removeAllItems();
            var selectedCountry = view.byId("countryNew").getSelectedItem().getKey();
            var selectedCountryText = view.byId("countryNew").getSelectedItem().getText();
            var statesBox = this.getView().byId("stateNew");
            this.getView().byId("stateNew").setEnabled(true);
            statesBox.bindAggregation("items", "/places/" + selectedCountry + "/states", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));


            // //adds only one time
            // var model = this.getView().getModel();
            this.inputAdd();

            var model = this.getView().getModel("userData");
            model.setProperty("/country", selectedCountry);
        },

        //Changes the flag of states, adds cities in the select
        getCitiesNew: function(event) {
            var view = this.getView();
            var selectedCountry = view.byId("countryNew").getSelectedItem().getKey();
            var selectedState = view.byId("stateNew").getSelectedItem().getKey();
            var selectedStateText = view.byId("stateNew").getSelectedItem().getText();
            var cityBox = this.getView().byId("cityNew");
            this.getView().byId("cityNew").setEnabled(true);
            cityBox.bindAggregation("items", "/places/" + selectedCountry + "/states/" + selectedState + "/cities", new sap.ui.core.Item({
                key: "{id}",
                text: "{name}"
            }));

            // var model = this.getView().getModel();
            this.inputAdd();

            //Setting the state in the model
            var model = this.getView().getModel("userData");
            model.setProperty("/state", selectedState);
        },

        //When city is changed its flag is set to true and sets the city in the model
        changeCity: function(event) {
            var view = this.getView();
            var selectedCity = view.byId("cityNew").getSelectedItem().getKey();
            var selectedCityText = view.byId("cityNew").getSelectedItem().getText();
            var model = view.getModel();

            this.inputAdd();

            //Setting the city in the model
            var model = this.getView().getModel("userData");
            model.setProperty("/city", selectedCity);
        },

        //When type is changed is sets the selected cntent to the userData model
        changeType: function(event) {
            var view = this.getView();
            var model = view.getModel();
            this.inputAdd();

            var selectedAccountText = view.byId("typeNew").getSelectedItem().getText();
            //Setting the city in the model
            var model = this.getView().getModel("userData");
            model.setProperty("/account", selectedAccountText);
            this.checkIsButtonEnable();
        },

        // Calls function to check if function is enabled
        inputAdd: function() {
          this.checkIsButtonEnable();
        },

        //FUnction not used --------Adds one more if it has text and enables save button
        addOne: function(content) {
            var model = this.getView().getModel();
            var formComplete = model.oData.formComplete;
            if (content && formComplete < 11) {
                formComplete = formComplete + 1;
                model.setProperty("/formComplete", formComplete);
            } else if (!content) {
                formComplete = formComplete - 1;
                model.setProperty("/formComplete", formComplete);
            }
            console.log("completed", formComplete);
            if (formComplete === 11) {
                this.getView().byId("saveNew").setEnabled(true);
            } else {
                this.getView().byId("saveNew").setEnabled(false);
            }
        },

        //Saves the data added and cleans the inputs by setting the model again
        saveNewAccount: function(content) {
            var view = this.getView();
            var userModel = view.getModel("userData");
            var generalModel = view.getModel();
            var usersModelArray = generalModel.oData.users;

            // Flag used to check if the id is duplicated, if its false it saves
            var flagExist = false;

            var view = this.getView();

            var addedId = userModel.oData.id;
            console.log(userModel);
            for (var i = 0; i < usersModelArray.length; i++) {
                if (usersModelArray[i].id === addedId) {
                    flagExist = true;
                    MessageToast.show("Duplicated Id");
                }
            }

            if(flagExist === false){
              var timeModArray = userModel.oData.timeMod;
              var arrayElement = {
                  "type": "save",
                  "date": this.getDate(),
                  "time": this.getTime()
              }
              timeModArray.push(arrayElement);
              userModel.setProperty("/timeMod", timeModArray);

              usersModelArray.push(userModel.oData);
              // console.log("usuario", userModel.oData);
              generalModel.setProperty("/users", usersModelArray);
              view.byId("countryNew").setSelectedItem(null);
              view.byId("stateNew").setSelectedItem(null);
              view.byId("cityNew").setSelectedItem(null);
              view.byId("typeNew").setSelectedItem(null);
              this.clean();
              view.byId("saveNew").setEnabled(false);
              view.byId("saveButtonNew").setEnabled(false);
            }
            console.log("model new id", generalModel.oData);
            // generalModel.setProperty("/formComplete", 0)
            // view.byId("saveNew").setEnabled(false);
        },

        //Adds data into the inputs in p2
        setInfo: function(event) {
            var view = this.getView();
            view.byId("editButton").setEnabled(true);
            var generalModel = view.getModel();
            var selectedId = view.byId("idSelectedInfo").getSelectedItem().getKey();
            var userModel = view.getModel("userData");
            // console.log("selected id", selectedId);
            var usersArray = generalModel.oData.users;
            // console.log("users", usersArray);
            for (var i = 0; i < usersArray.length; i++) {
                // console.log("user id model", usersArray[0].id);
                if (usersArray[i].id === selectedId) {
                    var result = usersArray[i];
                    userModel.setProperty("/id", result.id);
                    userModel.setProperty("/fName", result.fName);
                    userModel.setProperty("/mName", result.mName);
                    userModel.setProperty("/lName", result.lName);
                    userModel.setProperty("/bDate", result.bDate);
                    userModel.setProperty("/email", result.email);
                    userModel.setProperty("/address1", result.address1);
                    userModel.setProperty("/address2", result.address2);
                    userModel.setProperty("/zip", result.zip);
                    userModel.setProperty("/account", result.account);
                    userModel.setProperty("/country", result.country);
                    userModel.setProperty("/state", result.state);
                    userModel.setProperty("/city", result.city);
                    userModel.setProperty("/timeMod", result.timeMod);

                    //Set elemnt to the selects
                    view.byId("countryEdit").setSelectedKey(result.country);
                    var statesBox = view.byId("stateEdit");
                    statesBox.bindAggregation("items", "/places/" + result.country + "/states", new sap.ui.core.Item({
                        key: "{id}",
                        text: "{name}"
                    }));
                    view.byId("stateEdit").setSelectedKey(result.state);

                    var cityBox = view.byId("cityEdit");
                    cityBox.bindAggregation("items", "/places/" + result.country + "/states/" + result.state + "/cities", new sap.ui.core.Item({
                        key: "{id}",
                        text: "{name}"
                    }));
                    view.byId("cityEdit").setSelectedKey(result.city);

                    // console.log("result", result);
                }
                // console.log("User model", userModel);
            }

        },

        enableEdit: function(event) {
            var view = this.getView();
            this.checkIsButtonEnable();
            view.byId("editfName").setEnabled(true);
            view.byId("editmName").setEnabled(true);
            view.byId("editlName").setEnabled(true);
            view.byId("editBirth").setEnabled(true);
            view.byId("editEmail").setEnabled(true);
            view.byId("countryEdit").setEnabled(true);
            view.byId("stateEdit").setEnabled(true);
            view.byId("cityEdit").setEnabled(true);
            view.byId("address1Edit").setEnabled(true);
            view.byId("address2Edit").setEnabled(true);
            view.byId("zipEdit").setEnabled(true);
        },

        disableEdit: function(event) {
            var view = this.getView();
            view.byId("editfName").setEnabled(false);
            view.byId("editmName").setEnabled(false);
            view.byId("editlName").setEnabled(false);
            view.byId("editBirth").setEnabled(false);
            view.byId("editEmail").setEnabled(false);
            view.byId("countryEdit").setEnabled(false);
            view.byId("stateEdit").setEnabled(false);
            view.byId("cityEdit").setEnabled(false);
            view.byId("address1Edit").setEnabled(false);
            view.byId("address2Edit").setEnabled(false);
            view.byId("zipEdit").setEnabled(false);
        },

        saveEdit: function(event) {
            var view = this.getView();
            var userModel = view.getModel("userData");
            var generalModel = view.getModel();
            var usersArray = generalModel.oData.users;
            var selectedId = view.byId("idSelectedInfo").getSelectedItem().getKey();
            var timeModArray = userModel.oData.timeMod;
            var arrayElement = {
                "type": "edit",
                "date": this.getDate(),
                "time": this.getTime()
            }
            timeModArray.push(arrayElement);
            userModel.setProperty("/timeMod", timeModArray);
            for (var i = 0; i < usersArray.length; i++) {
                if (usersArray[i].id === selectedId) {
                    usersArray.splice(i, 1, userModel.oData);
                }
            }

            generalModel.setProperty("/users", usersArray);
            view.byId("countryEdit").setSelectedItem(null);
            view.byId("stateEdit").setSelectedItem(null);
            view.byId("cityEdit").setSelectedItem(null);
            this.clean();
            view.byId("saveNew").setEnabled(false);
            view.byId("saveButtonNew").setEnabled(false);
            view.byId("idSelectedInfo").setSelectedItem(null);
            // console.log("modelo general", generalModel.oData);
            this.disableEdit();
        },

        // Creating the table
        selectedIdTable: function() {
            var view = this.getView();
            var selectedId = view.byId("idSelectedTable").getSelectedItem().getKey();
            var generalModel = view.getModel();
            var usersArray = generalModel.oData.users;

            var path = generalModel.oData.tablePath;
            var table = view.byId("itemsTable");
            //Adding rows of the selected user to the table
            for (var i = 0; i < usersArray.length; i++) {
                if (usersArray[i].id === selectedId) {
                    var rowData = usersArray[i].timeMod;
                    table.bindItems("/users/" + i + "/timeMod", new sap.m.ColumnListItem({
                        cells: [new sap.m.Text({
                            text: "{type}"
                        }), new sap.m.Text({
                            text: "{date}"
                        }), new sap.m.Text({
                            text: "{time}",
                        }), ]
                    }));
                }
            }
        },

        //getting today's date
        getDate: function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }
            //Making the string
            today = mm + '/' + dd + '/' + yyyy;
            return today;
        },

        //Getting time
        getTime: function() {
            var d = new Date(); // for now
            var hour = d.getHours(); // => 9
            var minutes = d.getMinutes(); // =>  30
            var seconds = d.getSeconds(); // => 51
            //Making the string
            var time = hour + ":" + minutes + ":" + seconds;
            return time;
        },

        checkIsButtonEnable: function(){

          var view = this.getView();
          var userModel = view.getModel("userData");
          var id = userModel.oData.id;
          var fName = userModel.oData.fName;
          var lName = userModel.oData.lName;
          var bDate = userModel.oData.bDate;
          var email = userModel.oData.email;
          var country = userModel.oData.country;
          var state = userModel.oData.state;
          var city = userModel.oData.city;
          var address1 = userModel.oData.address1;
          var zip = userModel.oData.zip;
          var account = userModel.oData.account;
          console.log(userModel.oData);

          var value = (id != "" && fName != "" && lName != "" && bDate != "" && email != "" && country != ""  && state != ""  && city != "" && address1 != ""  && zip != ""  && account != "");

          // Checking if any input is empty
          if (id != "" && fName != "" && lName != "" && bDate != ""
          && email != "" && country != ""  && state != ""  && city != ""
          && address1 != ""  && zip != ""  && account != "") {
            view.byId("saveNew").setEnabled(true);
            view.byId("saveButtonNew").setEnabled(true);
          } else {
            view.byId("saveNew").setEnabled(false);
            view.byId("saveButtonNew").setEnabled(false);
          }
        }

    });

});
