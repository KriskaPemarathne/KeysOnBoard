function ProductModel(data) {
    //console.log("ProductModel", data);
    var self = this;
    self.ProductId = ko.observable(data.ProductId);
    self.ProductName = ko.observable(data.ProductName).extend({
        required: {
            params: true,
            message: "Please enter product Name"
        },
    });
    self.ProductPrice = ko.observable(data.ProductPrice).extend({
        required: {
            params: true,
            message: "Please enter product Price"
        },
    
        });
           
   
       
    
    self.errors = ko.validation.group(self, { deep: true });
    

  

}
var newProduct =
    {
        ProductId: 0,
        ProductName: '',
        ProductPrice: 0,
        errors: '',
        IsValid: true,
    }
var ProductViewModel = function () {
    var self = this;
    self.SelectedProduct = ko.observable();
    self.Product = ko.observableArray([]);

    self.newProduct = function () {
        self.SelectedProduct(new ProductModel(newProduct));
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#productModalLabel').html("Add Product");
    }
    LoadData();
    function LoadData() {
        $('#productModal').modal('hide');
       // debugger;
        $.ajax({
            type: "GET",
            url: "/Products/GetAllProduct",
            success: function (result) {
                //alert(result);
                result.forEach(function (element) {
                    //console.log("LoadData()", element);
                    self.Product.push(new ProductModel(element));
                });
                self.Product(result);

            },
            error: function error() {
                alert(error.statusText);
            }
        });
    }


    self.Add = function (data) {
       // console.log("data", data);
        if (data.errors().length > 0) {

            data.errors.showAllMessages();
            return;
        };
        $.ajax({
            url: "/Products/Create",
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
        console.log("data", data);
        //alert("Hiii");
        $.ajax({
            url: "/Products/Edit",
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
        self.SelectedProduct(data);
        $('#productModal').modal('show');
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#productModalLabel').html("Edit Product");

    };
    self.Delete = function (data) {
        //debugger;
        var ans = confirm("Are you sure you want delete this Item?");
        if (!ans) {
            return;
        }
        $.ajax({
            url: "/Products/Delete/" + data.ProductId, // Controller/View
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

ko.applyBindings(new ProductViewModel());