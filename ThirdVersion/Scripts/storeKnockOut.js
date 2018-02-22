function StoreModel(data) {
    console.log("StoreModel", data);
    var self = this;
    self.StoreId = ko.observable(data.StoreId);
    self.StoreName = ko.observable(data.StoreName).extend({
        required: {
            params: true,
            message: "Please enter Store Name"
        },
    });
    self.StoreAddress = ko.observable(data.StoreAddress).extend({
        required: {
            params: true,
            message: "Please enter  Store Address"
        },
    });





   
    self.errors = ko.validation.group(self, { deep: true });

   

}
var newStore =
    {
        StoreId: 0,
        StoreName: '',
        StoreAddress: '',
        errors: '',
        IsValid: true,
    }
var StoreViewModel = function () {
    var self = this;
    self.SelectedStore = ko.observable();
    self.Store = ko.observableArray([]);

    self.newStore = function () {
        self.SelectedStore(new StoreModel(newStore));
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#StoreModalLabel').html("Add Store");
    }
    LoadData();
    function LoadData() {
        $('#StoreModal').modal('hide');
        // debugger;
        $.ajax({
            type: "GET",
            url: "/Stores/GetAllStore",
            success: function (result) {
                //alert(result);
                result.forEach(function (element) {
                    console.log("LoadData()", element);
                    self.Store.push(new StoreModel(element));
                });
                self.Store(result);

            },
            error: function error() {
                alert(error.statusText);
            }
        });
    }


    self.Add = function (data) {
        //console.log("data", data);
        if (data.errors().length > 0) {

            data.errors.showAllMessages();
            return;
        };
        $.ajax({
            url: "/Stores/Create",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: ko.toJSON(data),
            success: function (result) {
                if (result.Valid) {
                    LoadData();
                }

            }
        }).fail(
            function (xhr, textStatus, err) {
                alert("test" + err);
            }
            )


    };

    self.Update = function (data) {
       
        $.ajax({
            url: "/Stores/Edit",
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: ko.toJSON(data),
            success: function (result) {
                if (result.Valid) {
                    LoadData();
                }

            }
        }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            }
            )


    };

    self.EditModal = function (data) {
        //debugger;
        self.SelectedStore(data);
        $('#StoreModal').modal('show');
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#StoreModalLabel').html("Edit Store");

    };
    self.Delete = function (data) {
        //debugger;
        var ans = confirm("Are you sure you want delete this Item?");
        if (!ans) {
            return;
        }
        $.ajax({
            url: "/Stores/Delete/" + data.StoreId, // Controller/View
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",

            success: function (result) {

                LoadData();


            }
        }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            }
            )


    };

}

ko.applyBindings(new StoreViewModel());