
$(document).ready(function () {
    LoadData();
});
function LoadData() {
    //Alert("Callme1");
    $('#StoreModal').modal('hide');   
    $('#StoreviewModal').modal('hide');
    clearTextBox();
    $.ajax(
        {
            type: "GET",
            url: "/Store/GetAllStore",
            //contentType: "application/json;charset=utf-8",
            //dataType: "json",
            success: function (result) {
                var html = '';
                $.each(result, function (key, item) {
                    html += '<tr>';
                    html += '<td>' + item.StoreName + '</td>';
                    html += '<td>' + item.StoreAddress + '</td>';
                    html += '<td><a href="#" onclick="return getStorebyID(' + item.StoreId + ')">Edit</a> |  <a href="#" onclick="return ViewStoreDetails(' + item.StoreId + ')"> View </a> |  <a href="#" onclick="Delele(' + item.StoreId + ')">Delete</a></td>';
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

    var data = GetStoreJson();
    $.ajax({
        url: "/Store/Create", // Controller/View
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

function ViewStoreDetails(StoreID) {

    clearTextBox();
    $.ajax({
        url: "/Store/GetStoreByID/" + StoreID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblViewStoreId').html(result.StoreId);
            $('#lblViewStoreName').html(result.StoreName);
            $('#lblViewStoreAddress').html(result.StoreAddress);
            $('#StoreModal').modal('hide');
            $('#StoreviewModal').modal('show');

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};








function getStorebyID(StoreID) {
    clearTextBox();
    $.ajax({
        url: "/Store/GetStoreByID/" + StoreID,
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        dataType: "json",
        success: function (result) {
            $('#lblStoreId').val(result.StoreId);
            $('#txtStoreName').val(result.StoreName);
            $('#txtStoreAddress').val(result.StoreAddress);
           

            $('#StoreModal').modal('show');
            $('#StoreviewModal').modal('hide');
            $('#btnUpdate').show();
            $('#btnAdd').hide();
            $('#StoreModalLabel').html("Edit Store");

        },
        error: function (errormessage) {
            alert(errormessage.responseText);
        }
    });
    return false;
};
function clearTextBox() {
    
    $('#lblStoreId').val(0);
    $('#txtStoreName').val("");
    $('#txtStoreAddress').val("");    
    $("span").html("");
    $('#StoreModalLabel').html("Add Store");    
    $("input").html("");
    $('#btnUpdate').hide();
    $('#btnAdd').show();
    
}
function Delele(ID) {
    var ans = confirm("Are you sure you want to delete this Record?");
    if (ans) {
        $.ajax({
            url: "/Store/Delete/" + ID,
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
    var data = GetStoreJson();
    //alert(data);
    $.ajax(
        {
            url: "/Store/Edit/",
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
function GetStoreJson() {
    return JSON.stringify({
        StoreId: $('#lblStoreId').val(),
        StoreName: $.trim($("#txtStoreName").val()),
        StoreAddress: $.trim($("#txtStoreAddress").val())
    })
};