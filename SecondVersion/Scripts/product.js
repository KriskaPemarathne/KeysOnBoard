
$(document).ready(function () {

    LoadData();
});
function LoadData() {
    console.log('hide both');
    $('#productModal').modal('hide');
    $('#ProductviewModal').modal('hide');
    clearTextBox();
    $.ajax(
        {
            type: "GET",
            url: "/Product/GetAllProduct",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.ProductName + '</td>';
                    html += '<td>' + item.ProductPrice + '</td>';
                    html += '<td><a href="#" onclick="return getProductbyID(' + item.ProductId + ')">Edit</a>| <a href="#" onclick="ViewProductDetails(' + item.ProductId + ')"> View </a>   | <a href="#" onclick="Delele(' + item.ProductId + ')">Delete</a></td>';
                    
                    html += '</tr>';
                });
                $('.DataList').html(html);
               

            },
            error: function (errormessage) {
                alert(errormessage.responseText);
            }

        }
    )
};


function Add() {
    // debugger;
   

    var data = GetProductJson();
    $.ajax({
        url: "/Product/Create", // Controller/View
        type: "POST",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        data: data,
        success: function (result) {
            if (result.Valid) {
                console.log('valid');
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


function ViewProductDetails(ProductID) {

    clearTextBox();
    $.ajax({
        url: "/product/GetproductByID/" + ProductID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblViewproductId').html(result.ProductId);
            $('#lblViewproductName').html(result.ProductName);
            $('#lblViewproductPrice').html(result.ProductPrice);
            $('#productModal').modal('hide');
            $('#productviewModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};




function getProductbyID(ProductID) {
    clearTextBox();
    $.ajax({
        url: "/Product/GetProductByID/" + ProductID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblProductId').val(ProductID);
            $('#txtProductName').val(result.ProductName);
            $('#txtProductPrice').val(result.ProductPrice); 
            $('#productModal').modal('show');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#productModalLabel').html("Edit Product");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};





function clearTextBox() {
    $('#lblProductId').val(0);
    $('#txtProductName').val("");
    $('#txtProductPrice').val("");    
    $("span").html("");
    $('#productModalLabel').html("Add Product");    
    $("input").html("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    
}
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Product/Delete/" + ID,
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

function Update() {
    debugger;
    var data = GetProductJson();
    alert(data);
    $.ajax(
        {
            url: "/Product/Edit/",
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
function GetProductJson() {    
    return JSON.stringify({
        ProductId: $('#lblProductId').val(),
        ProductName: $.trim($("#txtProductName").val()),
        ProductPrice: $.trim($("#txtProductPrice").val())
    })
};

