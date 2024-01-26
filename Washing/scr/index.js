let deleteDialog = document.getElementById("delete__dialog");
let inputData = new Object();
let fileName;
let sendData = new Object();
let ajaxReturnData;
let from_import = false;
let from_import_data = "";

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

const getTwoDigits = (value) => value < 10 ? `0${value}` : value;
const getDateTime = (date) => {
    const day = getTwoDigits(date.getDate());
    const month = getTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = getTwoDigits(date.getHours());
    const mins = getTwoDigits(date.getMinutes());
    return `${year}${month}${day}${hours}${mins}00`;
}
SelWashing();
selStaffWashing();
SelProductionNumber();


function selStaffWashing() {
  var fileName = "SelStaff.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#staff_id option").remove();
  $("#staff_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#staff_id").append(
          $("<option>").val(value["id"]).html(value["name"])
      );
  });
};
function SelProductionNumber() {
  var fileName = "SelProductionNumber.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#production_number_id option").remove();
  $("#production_number_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#production_number_id").append(
          $("<option>").val(value["id"]).html(value["production_number"])
      );
  });
};
function SelProductionNumberByDrawing() {
  var fileName = "SelProductionNumberByDrawing.php";
  var sendData = {
    drawing_date: $("#drawing_date").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#production_number_id option").remove();
  $("#production_number_id").removeClass("complete-input").addClass("no-input");
  $("#production_number_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#production_number_id").append(
          $("<option>").val(value["production_number_id"]).html(value["production_number"])
      );
  });
  SelDrawingTime();
};
function SelDrawingTime() {
  var fileName = "SelDrawingTime.php";
  var sendData = {
    drawing_date: $("#drawing_date").val(),
    production_number_id: $("#production_number_id").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#drawing_id option").remove();
  $("#drawing_id").removeClass("complete-input").addClass("no-input");
  $("#drawing_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#drawing_id").append(
          $("<option>").val(value["id"]).html(value["production_time_start"])
      );
  });
};
$(document).on("change", "#drawing_date", function() {
  SelProductionNumberByDrawing();
});
$(document).on("change", "#production_number_id", function() {
  SelDrawingTime();
});

$("#add_new_line").on("click", function () {
  trNumber = $("#add_new__table tbody tr").length;
  $("<tr>")
    .append("<td>" + $("#drawing_id").val() + "</td>")
    .append("<td>" + $("#production_number_id").find(":selected").html() + "</td>")
    .append("<td>" + $("#drawing_date").val() + "</td>")
    .append("<td>" + $("#start_tube").val() + "</td>")
    .append("<td>" + $("#end_tube").val() + "</td>")
    .append("<td>" + $("#quantity").val() + "</td>")
    .appendTo("#add_new__table tbody");
  $(this).prop("disabled", true);
  $("#production_number_id").val(0).focus().removeClass("complete-input").addClass("no-input");
  $("#drawing_id").val(0).removeClass("complete-input").addClass("no-input");
  $("#drawing_date").val("").removeClass("complete-input").addClass("no-input");
  $("#start_tube").val("").removeClass("complete-input").addClass("no-input");
  $("#end_tube").val("").removeClass("complete-input").addClass("no-input");
  $("#quantity").val("").removeClass("complete-input").addClass("no-input");
});
$(document).on("click", "#add_new__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
  } else {
    $(this).remove();
  }
});
$(document).on("click", "#washing_date__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#washing_date_selected__tr").removeAttr("id");
    $(this).attr("id", "washing_date_selected__tr");
  } else {
  }
  fileName = "SelWashingData.php";
  sendData = {
    washing_id: $("#washing_date_selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  console.log(ajaxReturnData);

  fillTableBody(ajaxReturnData, $("#washing_data__table tbody"));
  mergeTableCell(1);
  mergeTableCell(2);
  mergeTableCell(3);

  checkInput();
});

$("#racknumber__input").on("keydown", function (e) {
  var k = e.keyCode;
  var str = String(k);
  if (k === 13 && $(this).hasClass("complete-input")) {
    $("#rackqty__input").focus();
    return false;
  }
});
$("#racknumber__input").on("keyup", function () {
  if (!isNaN($(this).val()) &&
    $(this).val() != "" &&
    0 < $(this).val() &&
    $(this).val() <= 200 &&
    checkDuplicateRackNumber()) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
});
$("#rackqty__input").on("keydown", function (e) {
  var k = e.keyCode;
  var str = String(k);
  keyCodeCheck(str);
  if (k === 13) {
    $("#add_rack__button").focus();
    e.preventDefault();
    return false;
  }
});
$("#rackqty__input").on("keyup", function (e) {
  if (!isNaN($(this).val()) &&
    $(this).val() != "" &&
    0 < $(this).val()) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  if (checkRackInputComplete()) {
    $("#add_rack__button").prop("disabled", false);
  } else {
    $("#add_rack__button").prop("disabled", true);
  }
});
function checkRackInputComplete() {
  let flag = false;
  if ($("#racknumber__input").hasClass("complete-input") &&
    $("#rackqty__input").hasClass("complete-input")) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};
function checkDuplicateRackNumber() {
  var flag = true;
  var inputValue = $("#racknumber__input").val();
  $("#output_rack_table tbody tr td:nth-child(3)").each(function (index, value) {
    if (Number($(this).text()) == inputValue) {
      flag = false;
    }
  });
  return flag;
};

function keyCodeCheck(k) {
  var str = String(k);
  if (!(str.match(/[0-9]/) ||
      (37 <= k && k <= 40) ||
      k === 8 ||
      k === 46 ||
      k === 13)
  ) {return false;
  } else {return true;}
};

$("#add_rack__button").on("keydown", function (e) {
  cancelKeydownEvent = true;
});

$("#add_rack__button").on("click", function () {
  let trNumber;
  let fileName;
  let sendData = new Object();
  let order_number;
  let rackNumberArr = [];
  switch ($(this).text()) {
    case "Save":
      trNumber = $("#output_rack_table tbody tr").length;
      $("<tr>")
        .append("<td></td>")
        .append("<td>" + (trNumber + 1) + "</td>")
        .append("<td>" + $("#racknumber__input").val() + "</td>")
        .append("<td>" + $("#rackqty__input").val() + "</td>")
        .appendTo("#output_rack_table tbody");
      $(this).prop("disabled", true);
      $("#racknumber__input")
        .val("")
        .focus()
        .removeClass("complete-input")
        .addClass("no-input");
      $("#rackqty__input")
        .val("")
        .removeClass("complete-input")
        .addClass("no-input");
      break;
    case "Add":
      $("#output_rack_table tbody tr td:nth-child(2)").each(function () {
        rackNumberArr.push(Number($(this).html()));
      });
      if (rackNumberArr.length != 0) {
        order_number = Math.max(...rackNumberArr) + 1;
      } else {
        order_number = 1;
      }
      fileName = "InsUsingAgingRack.php";
      sendData = {
        drawing_id: $("#selected__tr td:nth-child(1)").text(),
        order_number: order_number,
        rack_number: $("#racknumber__input").val(),
        work_quantity: $("#rackqty__input").val(),
      };
      myAjax.myAjax(fileName, sendData);
      makeRackTable();
      $("#racknumber__input").val("").removeClass("complete-input").addClass("no-input");
      $("#rackqty__input").val("").removeClass("complete-input").addClass("no-input");
      $("#add_rack__button").prop("disabled", true);
      break;
  }
});

$(document).on("click", "#output_rack_table tbody tr", function () {
  let deleteDialog = document.getElementById("delete-rack__dialog");
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#rack_selected__tr").removeAttr("id");
    $(this).attr("id", "rack_selected__tr");
  } else {
    deleteDialog.showModal();
  }
});

$(document).on("click", "#delete-rack-cancel__button", function () {
  let deleteDialog = document.getElementById("delete-rack__dialog");
  deleteDialog.close();
});

$(document).on("click", "#delete-rack-delete__button", function () {
  let deleteDialog = document.getElementById("delete-rack__dialog");
  let sendData = new Object();
  let fileName = "DelSelRackData.php";
  sendData = {
    t_using_aging_rack_id: $("#rack_selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  deleteDialog.close();
  makeRackTable();
});

function makeRackTable() {
  fileName = "SelRack2.php";
  sendData = {
    id: $("#selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#output_rack_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (tdVal == "rack_number" || tdVal == "work_quantity") {
        $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
      } else {
        $("<td>").html(trVal[tdVal]).appendTo(newTr);
      }
    });
    $(newTr).appendTo("#output_rack_table tbody");
  });
};

function renumberTableColumn() {
  $("#output_rack_table tbody tr td:nth-child(1)").each(function (index, val) {
    $(this).text(index + 1);
  });
};

$(document).on("change", "#output_rack_table tbody tr input", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateUsingAgingRack.php";
  sendData = {
    id: $("#rack_selected__tr td:nth-child(1)").html(),
    rack_number: $("#rack_selected__tr td:nth-child(3) input").val(),
    work_quantity: $("#rack_selected__tr td:nth-child(4) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
});
$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  $("#file_url").html(getDateTime(new Date())+file.name);
  $("#preview__button").prop("disabled", false);
});
$(document).on("click", "#preview__button", function () {
  window.open("./DailyReportSub.html");
});
$(document).on("change", "#file_upload", function () {
  ajaxFileUpload();
});
function ajaxFileUpload() {
    var file_data = $('#file_upload').prop('files')[0];
    var form_data = new FormData();
    form_data.append('file', file_data);
    form_data.append('sub_name', getDateTime(new Date()));
    $.ajax({
        url: "./php/FileUpload.php",
        dataType: 'text',
        cache: false,
        contentType: false,
        processData: false,
        data: form_data,
        type: 'post',
    });
}

$(document).on("change keyup", ".no-input", function() {
  if (($(this).val() == "") || ($(this).val() == 0)) {
      $(this).removeClass("complete-input").addClass("no-input");
  } else {
      $(this).removeClass("no-input").addClass("complete-input");
  }
});
$(document).on("change keyup", ".complete-input", function() {
  if (($(this).val() == "") || ($(this).val() == 0)) {
      $(this).removeClass("complete-input").addClass("no-input");
  } else {
      $(this).removeClass("no-input").addClass("complete-input");
  }
});
function checkInput() {
  var check = true;
  $(".mid__wrapper .need-check .save-data-data").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (!($("#washing_date__table tbody tr").hasClass("selected-record"))) {
    check = false;
  }
  if (Number($("#add_new__table tbody tr").length) == 0) {
    check = false;
  }
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  }
  return check;
};
function checkUpdate() {
  var check = true;
  $(".left__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (!($("#summary__table tbody tr").hasClass("selected-record"))) {
    check = false;
  }
  if (check) {
    $("#update__button").attr("disabled", false);
  } else {
    $("#update__button").attr("disabled", true);
  };
  return check;
};

function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary__table tbody"));
};
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
  data.forEach(function(trVal) {
      let newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal, index) {
          // $("<td>").html(trVal[tdVal]).appendTo(newTr);
          if (tdVal == "order_number") {
            $("<th>").html("No." + trVal[tdVal]).appendTo(newTr);
          } else if ((tdVal == "ng_quantity") || (tdVal == "ok_quantity")) {
            $("<td>").append($("<input type='number'>").val(trVal[tdVal]).addClass("need-clear complete-input")).appendTo(newTr);
          } else {
            $("<td>").html(trVal[tdVal]).appendTo(newTr);
          }
      });
      $(newTr).appendTo(tbodyDom);
  });
};
$(document).on("click", "#summary__table tbody tr", function (e) {
  let fileName = "SelUpdateData.php";
  let sendData;
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    sendData = {
      targetId: $("#selected__tr").find("td").eq(0).html(),
    };
    myAjax.myAjax(fileName, sendData);
    putDataToInput(ajaxReturnData);
    $("#add_rack__button").text("Add");
    selRackByDrawing();
    selCutByDrawing();
  } else {
    // deleteDialog.showModal();
  }
  $("#save__button").attr("disabled", true);
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
  checkUpdate();
});
function getTableData(tableTrObj) {
  var tableData = [];
  tableTrObj.each(function (index, element) {
    var tr = [];
    $(this).find("td").each(function (index, element) {
      if ($(this).find("input").length) {
        tr.push($(this).find("input").val());
      } else if ($(this).find("select").length) {
        tr.push($(this).find("select").val());
      } else {
        tr.push($(this).html());
      }
    });
    tr.push(index + 1);
    tableData.push(tr);
  });
  return tableData;
};

$(document).on("keyup change", ".save-data", function() {
  checkInput();
  checkUpdate();
  checkInputWashingDate();
  checkInputWashingData();
});

function getInputData() {
  let inputData = new Object();
  $(".left__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".left__wrapper select.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  if ($("#file_upload").prop("files")[0]) {
    inputData["file_url"] = $("#file_url").html();
    ajaxFileUpload();
  } else {
    inputData["file_url"] = $("#file_url").html();
  }
  inputData["production_number_id"] = separateString($("#production_number_id").val(), 1);
  return inputData;
};
function clearInputData() {
  $(".left__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".left__wrapper select.need-clear").each(function (index, element) {
    $(this).val("0").removeClass("complete-input").addClass("no-input");
  });
  $(".left__wrapper input.no-need").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
  $(".left__wrapper select.no-need").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });

  $("#file_url").html("No file");

  $("#input_rack_table tbody").empty();
  $("#profile_cut_table tbody").empty();
}

$(document).on("click", "#save__button", function () {
  var fileName = "InsWashingCase.php";
  var sendData = {
    washing_id: $("#washing_date_selected__tr").find("td").eq(0).html(),
    staff_id: $("#staff_id").val(),
    start_time: $("#start_time").val(),
    end_time: $("#end_time").val(),
  };
  myAjax.myAjax(fileName, sendData);

  let washing_case_id = ajaxReturnData[0]["id"];

  washingData = getTableData($("#add_new__table tbody tr"));
  washingData.push(washing_case_id);
  fileName = "InsWashingData.php";
  sendData = JSON.stringify(washingData);
  myAjax.myAjax(fileName, sendData);
  $("#save__button").attr("disabled", true);
  $("#add_new__table tbody").empty();
});
$(document).on("click", "#update__button", function () {
  fileName = "UpdateData.php";
  inputData = getInputData();
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
  $("#update__button").attr("disabled", true);
});
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]);
    });
  });
  $("#file_url").html(data[0].file_url);
};
$(document).on("click", "#directive__input", function () {
  window.open(
    "./OrderSheet.html",
    null,
    "width=830, height=500,toolbar=yes,menubar=yes,scrollbars=no"
  );
});

function checkInputWashingDate() {
  var check = true;
  $(".left__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (check) {
    $("#save_washing_date").attr("disabled", false);
  } else {
    $("#save_washing_date").attr("disabled", true);
  }
  return check;
};
function checkInputWashingData() {
  var check = true;
  $(".mid__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (check) {
    $("#add_new_line").attr("disabled", false);
  } else {
    $("#add_new_line").attr("disabled", true);
  }
  return check;
};

$(document).on("click", "#save_washing_date", function () {
  var fileName = "InsWashing.php";
  var sendData = {
    product_date: $("#product_date").val(),
    chemical_concentration: $("#chemical_concentration").val(),
    soaking_time: $("#soaking_time").val(),
    soaking_temperature: $("#soaking_temperature").val(),
    drying_temperature: $("#drying_temperature").val(),
  };
  myAjax.myAjax(fileName, sendData);
  SelWashing();
});
function SelWashing() {
  var fileName = "SelWashing.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#washing_date__table tbody"));
};

function mergeTableCell(cell) {
  const table = document.getElementById("washing_data__table");
  let headerCell = null;
  for (let row of table.rows) {
    const firstCell = row.cells[cell];
    if (headerCell === null || firstCell.innerText !== headerCell.innerText) {
      headerCell = firstCell;
    } else {
      headerCell.rowSpan++;
      firstCell.classList.add("no-display");
    }
  }
};