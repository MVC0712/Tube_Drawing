let fileName;
let sendData = new Object();
let ajaxReturnData;

const myAjax = {
  myAjax: function (fileName, sendData) {
    $.ajax({
      type: "POST",
      url: "./php/"+fileName,
      dataType: "json",
      data: sendData,
      async: false,
    })
      .done(function (data) {
        ajaxReturnData = data;
      })
      .fail(function (err) {
        alert(err.responseText);
      });
  },
};

function ajaxData(fileName, sendData) {
  $.ajax({
    type: "POST",
    url: "./php/"+fileName,
    data: sendData,
    dataType: "json",
    success: function(data) {
      // Run the code here that needs
      return data;
    },
    error: function() {
      alert(err.responseText);
    }
  });
};

makeSummaryTable();

function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
    id: $("#selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary__table tbody"));
};
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
  data.forEach(function(trVal) {
    let newTr = $("<tr>");
    Object.keys(trVal).forEach(function(tdVal, index) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $(newTr).appendTo(tbodyDom);
  });
};
$(document).on("click", "#summary__table tbody tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
  } else {
  }
});