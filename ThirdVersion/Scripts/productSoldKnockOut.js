

    function CustomerModal(data) {
        // debugger;
        var self = this;
        self.CustomerId = data.CustomerId;
        self.CustomerName = data.CustomerName;
        self.CustomerAddress = data.CustomerAddress;
    }
    function StoreModal(data) {
        //debugger;
        var self = this;
        self.StoreId = data.StoreId;
        self.StoreName = data.StoreName;
        self.StoreAddress = data.StoreAddress;
    }
    function ProductModal(data) {
        //debugger;
        var self = this;
        self.ProductId = data.ProductId;
        self.ProductName = data.ProductName;
        self.ProductPrice = data.ProductPrice;
    }

    function SaleModal(data) {
        var self = this;
        //debugger;
        self.ProductSoldId = ko.observable(data.ProductSoldId);
        self.CustomerId = ko.observable(data.StoreId);
        self.StoreId = ko.observable(data.StoreId);
        self.ProductId = ko.observable(data.ProductId);
        
        self.SoldDate = ko.observable(moment(data.SoldDate).format('DD-MM-YYYY')).extend({
            required: {
                params: true,
                message: "Please select a date"
            }
        });
        
    }
    
    function TotalSaleModal(data) {
        //debugger;
       // console.log("LoadData()", data.SoldDate);
        var self = this;
        self.ProductSoldId = ko.observable(data.ProductSoldId);
        self.StoreName = ko.observable(data.StoreName);
        self.CustomerName = ko.observable(data.CustomerName);
        self.ProductName = ko.observable(data.ProductName);
        self.Amount = ko.observable(data.Amount);
        self.SoldDate = ko.observable(data.SoldDate);
                       
        self.ProductSoldData = ko.observable(data.ProductSoldData);
    }


var newSale =
        {
            ProductSoldId: 0,
            CustomerId: 0,             
            StoreId: 0,
            ProductId: 0,
            SoldDate: ko.observable(new Date())
        }

var SaleViewModel = function () {
    var self = this;
    self.CustomerList = ko.observableArray([]);
    self.StoreList = ko.observableArray([]);
    self.ProductList = ko.observableArray([]);
    self.SelectedSale = ko.observable();
    self.ProductSold = ko.observableArray([]);
    self.SelectedCustomer = ko.observable();
    self.SelectedStore = ko.observable();
    self.SelectedProduct = ko.observable();

    self.newProductSold = function () {           // debugger;
        
        self.SelectedCustomer(null);            
        self.SelectedStore(null);           
        self.SelectedProduct(null);
        self.SelectedCustomer(new CustomerModal({ CustomerId: 0, CustomerName: '', CustomerAddress: '' }));
        self.SelectedProduct(new ProductModal({ ProductId: 0, ProductName: '', ProductPrice: '' }));
        self.SelectedStore(new StoreModal({ StoreId: 0, StoreName: '', StoreAddress: '' }));
        self.SelectedSale(new SaleModal(newSale));
        $('#btnUpdate').hide();
        $('#btnAdd').show();
        $('#ProductSoldModalLabel').html("Add Sale");
    }

    LoadData();

    LoadCustomerList();

    LoadStoreList();

    LoadProductList();

    function LoadData() {
        $('#ProductSoldModal').modal('hide');            
        $.ajax({
            type: "GET",
            url: "/ProductSolds/GetSalesData",
            success: function (result) {

                result.forEach(function (element) {
                    
                    //console.log("LoadData()", element);
                    
                    
                    self.ProductSold.push(new TotalSaleModal(element));
                });
                self.ProductSold(result);
            },
            error: function error() {
                alert(error.status );
            }
        });
    };
        
    function LoadCustomerList() {

        $.ajax({
            type: "GET",
            url: "/ProductSolds/GetAllCustomers",
            success: function (result) {
                //debugger;
                result.forEach(function (element) {
                    //console.log("Customer()", element);
                    self.CustomerList.push(new CustomerModal(element));
                });
            },
            error: function error() {
                alert(error.status );
            }
        });
    };

    function LoadStoreList() {
        $.ajax({
            type: "GET",
            url: "/ProductSolds/GetAllStores",
            success: function (result) {
                //debugger;
                result.forEach(function (element) {
                    //console.log("store()", element);
                    self.StoreList.push(new StoreModal(element));
                });
            },
            error: function error() {
                alert(error.status );
            }
        });
    };

    function LoadProductList() {
        $.ajax({
            type: "GET",
            url: "/ProductSolds/GetAllProducts",
            success: function (result) {
                //debugger;
                result.forEach(function (element) {
                    //console.log("product()", element);
                    self.ProductList.push(new ProductModal(element));
                });
            },
            error: function error() {
                alert(error.status );
            }
        });
    };

    self.Save = function (data)  {
       // debugger;
        var SaleDTO = {};
        SaleDTO.CustomerId = self.SelectedCustomer().CustomerId;
        SaleDTO.StoreId = self.SelectedStore().StoreId;
        SaleDTO.ProductId = self.SelectedProduct().ProductId;
        SaleDTO.SoldDate = data.SoldDate;
        //console.log(data.SoldDate);
        //console.log(ko.toJSON(SaleDTO));
       // alert("Hi");
        $.ajax({
            url: "/ProductSolds/Create", // Controller/View
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: ko.toJSON(SaleDTO),//ko.toJSON(self.SelectedSale),
                    
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

        //Ends Here
    };
    self.Update = function (data) {
        //debugger;
        var SaleDTO = {};
        SaleDTO.ProductSoldId = data.ProductSoldId;
        SaleDTO.CustomerId = self.SelectedCustomer().CustomerId;
        SaleDTO.StoreId = self.SelectedStore().StoreId;
        SaleDTO.ProductId = self.SelectedProduct().ProductId;
        SaleDTO.SoldDate =data.SoldDate;
        //console.log(ko.toJSON(data));
        //console.log(ko.toJSON(self.SelectedSale));
        $.ajax({
            url: "/ProductSolds/Edit", // Controller/View
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            data: ko.toJSON(SaleDTO),//ko.toJSON(self.SelectedSale),
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

        //Ends Here
    };
    self.Delete = function (data) {
        //debugger;
        var ans = confirm("Are you sure you want delete this Item?");
        if (!ans) {
            return;
        }
        console.log(data.ProductSoldId);
        $.ajax({
            url: "/ProductSolds/Delete/" + data.ProductSoldId, // Controller/View
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

    self.EditModal = function (data) {
        //debugger;      
        
        self.SelectedSale(data.ProductSoldData);
        var selectCus = ko.utils.arrayFirst(self.CustomerList(), function (item) { return item.CustomerId == data.ProductSoldData.CustomerId });
        self.SelectedCustomer(selectCus);
        var selectProduct = ko.utils.arrayFirst(self.ProductList(), function (item) { return item.ProductId == data.ProductSoldData.ProductId });
        self.SelectedProduct(selectProduct);
        self.SelectedStore(ko.utils.arrayFirst(self.StoreList(), function (item) { return item.StoreId == data.ProductSoldData.StoreId }));
        self.SoldDate = (moment(self.SoldDate).format('MM/DD/YYYY'));
     
        console.log(self.SoldDate);
      
        $('#ProductSoldModal').modal('show');
        $('#btnUpdate').show();
        $('#btnAdd').hide();
        $('#ProductSoldModalLabel').html("Edit Product");
            
            
    };
    
}
   
ko.applyBindings(new SaleViewModel());
ko.bindingHandlers.date = {
    update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        var value = valueAccessor();
        var date = moment(value);
        var strDate = date.format('DD-MM-YYYY');
        if ($(element).is(':input'))
            $(element).val(strDate);
        else
            $(element).text(strDate);
    }
};
