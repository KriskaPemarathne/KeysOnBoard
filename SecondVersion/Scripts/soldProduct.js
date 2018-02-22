
$(document).ready(function () {
    LoadData();
});
function LoadData() {
    //Alert("Callme1");
    $('#SoldProductModal').modal('hide');
    $('#SoldProductviewModal').modal('hide');
    clearTextBox();
    $.ajax(
        {
            type: "GET",
            url: "/SoldProduct/GetAllSoldProduct",
            contentType: "application/json;charset=utf-8",
            dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.SoldProductName + '</td>';
                    html += '<td>' + item.SoldProductAddress + '</td>';
                    html += '<td><a href="#" onclick="return getSoldProductbyID(' + item.SoldProductId + ')">Edit</a> |  <a href="#" onclick="return ViewSoldProductDetails(' + item.SoldProductId + ')"> View </a> |  <a href="#" onclick="Delele(' + item.SoldProductId + ')">Delete</a></td>';
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
    //var data = $("#form - horizontal").serialize();

    var data = GetSoldProductJson();
    $.ajax({
        url: "/SoldProduct/Create", // Controller/View
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

function ViewSoldProductDetails(SoldProductID) {

    clearTextBox();
    $.ajax({
        url: "/SoldProduct/GetSoldProductByID/" + SoldProductID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblViewSoldProductId').html(result.SoldProductId);
            $('#lblViewSoldProductName').html(result.SoldProductName);
            $('#lblViewSoldProductAddress').html(result.SoldProductAddress);
            $('#SoldProductModal').modal('hide');
            $('#SoldProductviewModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};








function getSoldProductbyID(SoldProductID) {
    clearTextBox();
    $.ajax({
        url: "/SoldProduct/GetSoldProductByID/" + SoldProductID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblSoldProductId').val(result.SoldProductId);
            $('#txtSoldProductName').val(result.SoldProductName);
            $('#txtSoldProductAddress').val(result.SoldProductAddress);


            $('#SoldProductModal').modal('show');
            $('#SoldProductviewModal').modal('hide');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#SoldProductModalLabel').html("Edit SoldProduct");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};
function clearTextBox() {

    $('#lblSoldProductId').val(0);
    $('#txtSoldProductName').val("");
    $('#txtSoldProductAddress').val("");
    $("span").html("");
    $('#SoldProductModalLabel').html("Add SoldProduct");
    $("input").html("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();

}
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/SoldProduct/Delete/" + ID,
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
    //debugger;
    var data = GetSoldProductJson();
    //alert(data);
    $.ajax(
        {
            url: "/SoldProduct/Edit/",
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
function GetSoldProductJson() {
    return JSON.stringify({
        SoldProductId: $('#lblSoldProductId').val(),
        SoldProductName: $.trim($("#txtSoldProductName").val()),
        SoldProductAddress: $.trim($("#txtSoldProductAddress").val())
    })
};