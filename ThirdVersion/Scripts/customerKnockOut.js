function CustomerModal(data) {
   // console.log("CustomerModal", data);
    //debugger;
    var self = this;
    self.CustomerId = ko.observable(data.CustomerId);
    self.CustomerName = ko.observable(data.CustomerName).extend({
        required: {
            params: true,
            message: "Please enter Name"
        }
    });

    //self.CustomerName = ko.observable(data.CustomerName).extend({ required: "Please enter customer name" });
    self.CustomerAddress = ko.observable(data.CustomerAddress).extend({
        required: {
            params: true,
            message: "Please enter Address"
        }
       
    });


  
    self.errors = ko.validation.group(self, { deep: true });

  
   

}
var newCustomer =
    {
        CustomerId: 0,
        CustomerName: '',
        CustomerAddress: '',
        errors: '',
        IsValid: true,
    }
var CustomerViewModel = function () {



    var self = this;
    self.SelectedCustomer = ko.observable();
    self.Customer = ko.observableArray([]);

    self.newCustomer = function () {
        self.SelectedCustomer(new CustomerModal(newCustomer));
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#myModalLabel').html("Add Customer");
    }
    LoadData();
    function LoadData() {
        $('#myModal').modal('hide');
        //debugger;
        $.ajax({
            type: "GET",
            url: "/Customers/GetAllCustomer",
            success: function (result) {
                //alert(result);
                result.forEach(function (element) {
                    //console.log("LoadData()", element);
                    self.Customer.push(new CustomerModal(element));
                });
                self.Customer(result);

            },
            error: function error() {
                alert(error.statusText);
            }
        });
    }


    self.Save = function (data) {
       // console.log("data", data);
       
        //console.log("errorlength", data.errors().length);
       
        
        if (data.errors().length>0) {
            //alert("Hi");
            data.errors.showAllMessages();
            return;
        };
        
        $.ajax({
            url: "/Customers/Create",
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
            url: "/Customers/Edit",
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
        self.SelectedCustomer(data);
        $('#myModal').modal('show');
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#myModalLabel').html("Edit Customer");

    };
    self.Delete = function (data) {
        //debugger;
        var ans = confirm("Are you sure you want delete this Item?");
        if (!ans) {
            return;
        }
        $.ajax({
            url: "/Customers/Delete/" + data.CustomerId, // Controller/View
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

ko.applyBindings(new CustomerViewModel());