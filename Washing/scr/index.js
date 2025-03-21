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
makeNgCode();


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
function selWashingData() {
  fileName = "SelWashingData.php";
  sendData = {
    washing_id: $("#washing_date_selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#washing_data__table tbody"));
  mergeTableCell(1);
  mergeTableCell(2);
  mergeTableCell(3);
};
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
  selWashingData();
  makeRackTable();
  checkInput();
  checkRackInputComplete();
  checkAddNgInputComplete();
});
$(document).on("click", "#washing_data__table tbody tr", function () {
  if (!$(this).hasClass("data_selected-record")) {
    // $(this).parent().find("tr").removeClass("data_selected-record");
    $(this).addClass("data_selected-record");
    // $("#washing_data_selected__tr").removeAttr("id");
    // $(this).attr("id", "washing_data_selected__tr");
  } else {
    $(this).removeClass("data_selected-record");
  }
  checkRackInputComplete();
});
$("#racknumber__input").on("keyup", function () {
  if (!isNaN($(this).val()) &&
    $(this).val() != "" &&
    0 < $(this).val() &&
    $(this).val() <= 200) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkRackInputComplete();
});

$("#rackqty__input").on("keyup", function (e) {
  if (!isNaN($(this).val()) &&
    $(this).val() != "" &&
    0 < $(this).val()) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkRackInputComplete();
});
function checkRackInputComplete() {
  let flag = false;
  if ($("#racknumber__input").hasClass("complete-input") &&
    $("#rackqty__input").hasClass("complete-input")) {
    flag = true;
  } else {
    flag = false;
  }
  if (!($("#washing_date__table tbody tr").hasClass("selected-record"))) {
    flag = false;
  }
  if (!($("#washing_data__table tbody tr").hasClass("data_selected-record"))) {
    flag = false;
  }
  if (flag) {
    $("#add_rack__button").prop("disabled", false);
  } else {
    $("#add_rack__button").prop("disabled", true);
  }
  return flag;
};
function checkAddNgInputComplete() {
  let flag = false;
  if ($("#ng_code").hasClass("complete-input") &&
    $("#ng_quantity").hasClass("complete-input") &&
    $("#process").hasClass("complete-input")) {
    flag = true;
  } else {
    flag = false;
  }
  if (!($("#output_rack_table tbody tr").hasClass("selected-record"))) {
    flag = false;
  }
  if (flag) {
    $("#add_ng__button").prop("disabled", false);
  } else {
    $("#add_ng__button").prop("disabled", true);
  }
  return flag;
};
$("#add_rack__button").on("click", function () {
  fileName = "InsUsingAgingRack.php";
  sendData = {
    washing_output_id: $("#washing_date_selected__tr td:nth-child(1)").text(),
    rack_number: $("#racknumber__input").val(),
    work_quantity: $("#rackqty__input").val(),
  };
  myAjax.myAjax(fileName, sendData);
  var rack_id = ajaxReturnData[0]["id"];
  rackData = getTableDataByClass($("#washing_data__table tbody tr"));
  rackData.push(rack_id);
  fileName = "InsRackDataLink.php";
  sendData = JSON.stringify(rackData);
  myAjax.myAjax(fileName, sendData);

  makeRackTable();
  $("#racknumber__input").val("").removeClass("complete-input").addClass("no-input");
  $("#rackqty__input").val("").removeClass("complete-input").addClass("no-input");
  $("#add_rack__button").prop("disabled", true);

  $("#washing_data__table tbody tr").removeClass("data_selected-record");
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
  $("#washing_data__table tbody tr").parent().find("tr").removeClass("data_selected-record");
  fileName = "SelRackDataLink.php";
  sendData = {
    using_aging_rack_id: $("#rack_selected__tr td:nth-child(1)").text()
  };
  myAjax.myAjax(fileName, sendData);
  makeRackDataSelect(ajaxReturnData);
  makeNgTable();
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
  fileName = "SelRack.php";
  sendData = {
    id: $("#washing_date_selected__tr").find("td").eq(0).html(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#output_rack_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $(newTr).appendTo("#output_rack_table tbody");
  });
};
function makeNgTable() {
  fileName = "SelSelRackNGData.php";
  sendData = {
    using_aging_rack_id: $("#rack_selected__tr td:nth-child(1)").text()
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#ng__table tbody"));
};
function makeNgCode() {
  var fileName = "SelNgCode.php";
  var sendData = {
      ng_code: "%%",
  };
  myAjax.myAjax(fileName, sendData);
  $("#ng_code").empty();
  if (ajaxReturnData.length == 1) {
    $("#ng_code").removeClass("no-input").addClass("complete-input");
  } else {
    $("#ng_code").append($("<option>").val(0).html("no"));
    $("#ng_code").removeClass("complete-input").addClass("no-input");
  }
  ajaxReturnData.forEach(function(value) {
    $("<option>")
      .val(value["id"])
      .html(value["quality_code"] + "-" + value["description_vn"])
      .appendTo("#ng_code");
  });
}
// $(document).on("change", "#output_rack_table tbody tr input", function () {
//   let sendData = new Object();
//   let fileName;
//   fileName = "UpdateUsingAgingRack.php";
//   sendData = {
//     id: $("#rack_selected__tr td:nth-child(1)").html(),
//     rack_number: $("#rack_selected__tr td:nth-child(3) input").val(),
//     work_quantity: $("#rack_selected__tr td:nth-child(4) input").val(),
//   };
//   console.log(sendData);
//   myAjax.myAjax(fileName, sendData);
// });

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
$(document).on("change keyup", ".ng_q", function() {
  if (($(this).val() == "")) {
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
          if (tdVal == "ng_quantities") {
            $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
          } else if (tdVal == "quality_code") {
              $("<td>").append(makeNgCodeOptionDom(trVal[tdVal])).appendTo(newTr);
          } else if (tdVal == "order_number") {
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
function makeNgCodeOptionDom(seletedId) {
  let targetDom = $("<select>");
  fileName = "SelNgCode.php";
  sendData = {
      ng_code: "%%",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
    if (element["quality_code"] == seletedId) {
      $("<option>")
        .html(element["quality_code"])
        .val(element["id"])
        .prop("selected", true)
        .appendTo(targetDom);
    } else {
      $("<option>")
        .html(element["quality_code"])
        .val(element["id"])
        .appendTo(targetDom);
    }
  });
  return targetDom;
}
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

function getTableDataByClass(tableTrObj) {
  var tableData = [];
  tableTrObj.each(function (index, element) {
    if ($(this).hasClass("data_selected-record")) {
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
      tableData.push(tr);
    }
  });
  return tableData;
};

$(document).on("keyup change", ".save-data", function() {
  checkInput();
  checkUpdate();
  checkInputWashingDate();
  checkInputWashingData();
});
$(document).on("keyup change", ".save_ng-data", function() {
  checkAddNgInputComplete();
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

function makeRackDataSelect(data) {
  $("#washing_data__table tbody tr").each(function (index, element) {
    var tr = $(this);
    $(this).find("td").each(function (index, element) {
      if (index == 0) {
        var id = $(this).html();
        data.forEach(function(trVal) {
          if(trVal.washing_data_id == id) {
            tr.addClass("data_selected-record");
          } else {
          }
        });
      }
    });
  });
};

$(document).on("click", "#add_ng__button", function() {
  let fileName = "InsQalityInformation.php";
  let sendData = {
      process_id: $("#process").val(),
      using_aging_rack_id: $("#rack_selected__tr td:nth-child(1)").text(),
      quality_code_id: $("#ng_code").val(),
      ng_quantities: $("#ng_quantity").val()
  };
  myAjax.myAjax(fileName, sendData);
  makeNgTable();
  $(".ng_need-clear").val("");
  $(".save_ng-data").removeClass("complete-input").addClass("no-input");
});
$(document).on("click", "#ng__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#ng_selected__tr").removeAttr("id");
    $(this).attr("id", "ng_selected__tr");
  } else {
  }
});
$(document).on("change", "#ng__table tbody tr td", function() {
  fileName = "UpdateWorkQuantities.php";
  sendData = {
    id: $("#ng_selected__tr td:nth-child(1)").html(),
    ng_quantities: $("#ng_selected__tr td:nth-child(4) input").val(),
    quality_code_id: $("#ng_selected__tr td:nth-child(3) select").val(),
  };
  myAjax.myAjax(fileName, sendData);
  makeNgTable();
  console.log(sendData);
});
