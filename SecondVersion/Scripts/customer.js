

$(document).ready(function () {
    LoadData();
});
function LoadData() {
   
    $('#CustomerModal').modal('hide');
    $('#CustomerviewModal').modal('hide');
    
    clearTextBox();
    $.ajax(
        {
            type: "GET",
            url: "/Customer/GetAllCustomer",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.CustomerName + '</td>';
                    html += '<td>' + item.CustomerAddress + '</td>';
                    html += '<td><a href="#" onclick="return getCustomerbyID(' + item.CustomerId + ')"> Edit </a>  |  <a href="#" onclick="ViewCustomerDetails(' + item.CustomerId + ')"> View </a>  |  <a href="#" onclick="Delele(' + item.CustomerId + ')">Delete</a></td>';
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
   var data = GetCustomerJson();
    $.ajax({
        url: "/Customer/Create", // Controller/View
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




function ViewCustomerDetails(CustomerID) {
   
    clearTextBox();
    $.ajax({
        url: "/Customer/GetCustomerByID/" + CustomerID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {           
            $('#lblViewCustomerId').html(result.CustomerId);           
            $('#lblViewCustomerName').html(result.CustomerName);
            $('#lblViewCustomerAddress').html(result.CustomerAddress);
            $('#CustomerModal').modal('hide');
            $('#CustomerviewModal').modal('show');          

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};



function getCustomerbyID(CustomerID) {
    clearTextBox();
    $.ajax({
        url: "/Customer/GetCustomerByID/" + CustomerID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblCustomerId').val(result.CustomerId);
            $('#txtCustomerName').val(result.CustomerName);
            $('#txtCustomerAddress').val(result.CustomerAddress);
            $('#CustomerModal').modal('show');
            $('#CustomerviewModal').modal('hide');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#CustomerModalLabel').html("Update Customer");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};


function SetValidation() {

    if ($('#txtCustomerAddress').val() === "" || $('#txtCustomerAddress').val() === null) {

    }


}


function clearTextBox() {
    
    $('#txtCustomerName').val("");
    $('#lblCustomerId').val(0);
    $('#txtCustomerAddress').val("");    
    $("span").html("");
    $('#CustomerModalLabel').html("Add Customer");    
    $("input").html("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    
}


function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Customer Record?");
    if (ans) {
        $.ajax({
            url: "/Customer/Delete/" + ID,
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
    var data = GetCustomerJson();    
    $.ajax(
        {
            url: "/Customer/Edit/",
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


function GetCustomerJson() {
   
    return JSON.stringify({
        CustomerId: $("#lblCustomerId").val(),
        CustomerName: $.trim($("#txtCustomerName").val()),
        CustomerAddress: $.trim($("#txtCustomerAddress").val())
    })
};