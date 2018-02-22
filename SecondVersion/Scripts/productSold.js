var CurrentID = 0;

$(document).ready(function () {
    LoadData();
});
function LoadData() {
    $('#SalesModal').modal('hide');
    $('#SalesViewModal').modal('hide');
    
    clearTextBox();
    LoadCustomerList();
    LoadStoreList();
    LoadProductList();
    $.ajax({
               type: "GET",
               url: "/ProductSold/GetSalesData",
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               success: function (result) {
                   var html = '';
                   $.each(result, function (key, item) {
                       html += '<tr>';
                       html += '<td>' + item.StoreName + '</td>';
                       html += '<td>' + item.ProductName + '</td>';
                       html += '<td>' + item.CustomerName + '</td>';
                       html += '<td>' + item.Amount + '</td>';
                       html += '<td>' + ToJavaScriptDate(item.SoldDate) + '</td>';
                       html += '<td><a href="#" onclick="return getSalesbyId(' + item.ProductSoldId + ')">Edit</a> |  <a href="#" onclick="return ViewSaleDetails(' + item.ProductSoldId + ')"> View </a> |  <a href="#" onclick="Delele(' + item.ProductSoldId + ')">Delete</a></td>';
                       html += '</tr>';
                   });
                   $('.DataList').html(html);
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }

           });
};

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    return (dt.getMonth() + 1) + "/" + dt.getDate() + "/" + dt.getFullYear();
}

function ToHTMLDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    var dt = new Date(parseFloat(results[1]));
    var formattedDate = dt.getFullYear() + "-" + ("0" + (dt.getMonth() + 1)).slice(-2) + "-" + ("0" + (dt.getDate() + 1)).slice(-2);    
    return formattedDate;
    //console.log(formattedDate);
}

function clearTextBox() {
    $("span").html("");
    $('#SalesModalLabel').html("Add Sale");   

    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + (month) + "-" + (day);
    $('#txtDate').val(today);
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    //console.log("clear");
};

function Add() {
    var data = GetSalesJson();
    $.ajax({
               url: "/ProductSold/Create", // Controller/View
               type: "POST",
               contentType: "application/json;charset=UTF-8",
               dataType: "json",
               data: data,
               success: function (result) {
                   if (result.Valid) {
                       LoadData();
                       return;
                   }
                   $.each(result.Errors, function (key, value) {
                       if (value != null) {
                           $("#Err_" + key).html(value[value.length - 1].ErrorMessage);
                       }
                   });
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }

           });
};

function ViewSaleDetails(soldProductId) {
    clearTextBox();
    
    $.ajax({
        url: "/ProductSold/GetSalesDetailsById/" + soldProductId,
               type: "GET",
               contentType: "application/json;charset=UTF-8",
               dataType: "json",
               success: function (result) {
                   $('#lblViewProductSoldId').html(result.ProductSoldId);
                   $('#lblViewCustomerName').html(result.Customer.CustomerName);
                   $('#lblViewProductName').html(result.Product.ProductName);
                   $('#lblViewStoreName').html(result.Store.StoreName);
                   $('#lblViewSoldDate').html(ToHTMLDate(result.SoldDate));

                   $('#SalesModal').modal('hide');
                   $('#SalesViewModal').modal('show');
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }
           });
    return false;
};

function getSalesbyId(ID) {
    clearTextBox();
    $.ajax({
               url: "/ProductSold/GetSalesById/" + ID,
               type: "GET",
               contentType: "application/json;charset=UTF-8",
               dataType: "json",
               success: function (result) {
                   CurrentID = result.ProductSoldId;

                   $('#CustomerList').val(result.CustomerId);
                   $('#ProductList').val(result.ProductId);
                   $('#StoreList').val(result.StoreId);

                   $('#StoreList option:selected').val(result.StoreId);
                   $('#CustomerList option:selected').val(result.CustomerId);
                   $('#ProductList option:selected').val(result.ProductId);

                   $('#CustomerList').val(result.CustomerId);
                   $('#ProductList').val(result.ProductId);
                   $('#StoreList').val(result.StoreId);

                   $('#txtSoldDate').val(ToHTMLDate(result.SoldDate));
                   $('#SalesModal').modal('show');
                   $('#btnUpdate').show();
                   $('#btnAdd').hide();
                   $('#SalesModalLabel').html("Edit Sale");
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }
           });
    return false;
};

function Update() {
    //debugger;
    var data = GetSalesJson();
    //alert(data);
    $.ajax({
               url: "/ProductSold/Edit/",
               type: "POST",
               contentType: "application/json;charset=UTF-8",
               dataType: "json",
               data: data,
               success: function (result) {
                   if (result.Valid) {
                       LoadData();
                       return;
                   }
                   $.each(result.Errors, function (key, value) {
                       if (value != null) {
                           $("#Err_" + key).html(value[value.length - 1].ErrorMessage);
                       }
                   });
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }
           });
}

function LoadCustomerList() {
    $.ajax({
               type: "GET",
               url: "/ProductSold/GetAllCustomers",
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               success: function (result) {
                   //console.log(result);
                   $("#CustomerList").empty();
                   $("#CustomerList").append($("<option></option>").val
                                             (-1).html("Select Customer"));
                   $.each(result, function (key, item) {
                       $("#CustomerList").append($("<option></option>").val
                                                 (item.CustomerId).html(item.CustomerName));
                   });
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }

           }
        )
};

function LoadStoreList() {
    $.ajax({

               type: "GET",
               url: "/ProductSold/GetAllStores",
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               success: function (result) {
                   $("#StoreList").empty();
                   $("#StoreList").append($("<option></option>").val
                                          (-1).html("Select Store"));
                   $.each(result, function (key, item) {
                       $("#StoreList").append($("<option></option>").val
                                              (item.StoreId).html(item.StoreName));
                   });
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }

           }
        )
};

function LoadProductList() {
    $.ajax({
               type: "GET",
               url: "/ProductSold/GetAllProducts",
               contentType: "application/json;charset=utf-8",
               dataType: "json",
               success: function (result) {
                   $("#ProductList").empty();
                   $("#ProductList").append($("<option></option>").val
                                            (-1).html("Select Product"));
                   $.each(result, function (key, item) {
                       $("#ProductList").append($("<option></option>").val
                                                (item.ProductId).html(item.ProductName));
                   });
               },
               error: function (errormessage) {
                   alert(errormessage.responseText);
               }

           }
        )
};

function GetSalesJson() {
    //alert($("#StoreList").val());
    return JSON.stringify({


       
                              ProductSoldId: CurrentID,
                              CustomerId: $.trim($("#CustomerList").val()),//$('#dropDownId').val();
                              StoreId: $.trim($("#StoreList").val()),
                              ProductId: $.trim($("#ProductList").val()),
                              SoldDate: $.trim($("#txtSoldDate").val()),
                          })
};


function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/ProductSold/Delete/" + ID,
            type: "POST",
            contentType: "application/json;charset=UTF-8",
            dataType: "json",
            success: function (result) {
                LoadData();
            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }
        });
    }
}