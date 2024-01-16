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

selStaffDrawing();
selStaffCutting();
SelDrawingType();
SelProductionNumber();
SelStatus();
SelDies();
SelPlugs();

function SelDrawingType() {
  var fileName = "SelDrawingType.php";
  var sendData = {

  };
  myAjax.myAjax(fileName, sendData);
  $("#prouction_type_id option").remove();
  $("#prouction_type_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#prouction_type_id").append(
          $("<option>").val(value["id"]).html(value["drawing_type"])
      );
  });
  ajaxReturnData.forEach(function(value) {
    $("#production_type_filter").append($("<option>").val(0).html("NO"));
    $("#production_type_filter").append(
        $("<option>").val(value["id"]).html(value["drawing_type"])
    );
});
};
function selStaffDrawing() {
  var fileName = "SelStaff.php";
  var sendData = {
    staff: $("#staff").val(),
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
function selStaffCutting() {
  var fileName = "SelStaff.php";
  var sendData = {
    staff: $("#staff_cut").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#cutting_staff_id option").remove();
  $("#cutting_staff_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#cutting_staff_id").append(
          $("<option>").val(value["id"]).html(value["name"])
      );
  });
};
function SelProductionNumber() {
  var fileName = "SelProductionNumber.php";
  var sendData = {
    production_number: $("#production_number").val(),
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
function SelDies() {
  var fileName = "SelDies.php";
  var sendData = {
    die_number: $("#die_number").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#die_number_id option").remove();
  $("#die_number_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#die_number_id").append(
          $("<option>").val(value["id"]).html(value["die_number"])
      );
  });
};
function SelPlugs() {
  var fileName = "SelPlugs.php";
  var sendData = {
    plug_number: $("#plug_number").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#plug_number_id option").remove();
  $("#plug_number_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#plug_number_id").append(
          $("<option>").val(value["id"]).html(value["plug_number"])
      );
  });
};
function SelStatus() {
  var fileName = "SelStatus.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#die_status_id option").remove();
  $("#die_status_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#die_status_id").append(
          $("<option>").val(value["id"]).html(value["status"])
      );
  });
  $("#plug_status_id option").remove();
  $("#plug_status_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#plug_status_id").append(
          $("<option>").val(value["id"]).html(value["status"])
      );
  });
};

$(document).on("change", "#press_date", function() {
  if ($(this).val() != "") {
    makePressSelect();
  } else {
  }
});
function makePressSelect() {
  var fileName = "SelPress.php";
  var sendData = {
    press_date: $("#press_date").val(),
    production_number_id: $("#production_number_id").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#press_id option").remove();
  $("#press_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#press_id").append(
          $("<option>").val(value["id"]).html(value["die_number"])
      );
  });
  $("#select_rack_table tbody").empty();
};
$(document).on("change", "#press_id", function() {
  if ($(this).val() != 0) {
    makePressTable();
  } else {
  }
});
$(document).on("keyup", "#production_number", function() {
  SelProductionNumber();
});
$(document).on("keyup", "#die_number", function() {
  SelDies();
});
$(document).on("keyup", "#plug_number", function() {
  SelPlugs();
});
$(document).on("keyup", "#staff", function() {
  selStaffDrawing();
});
$(document).on("keyup", "#staff_cut", function() {
  selStaffCutting();
});
function makePressTable() {
  var fileName = "SelRack.php";
  var sendData = {
    press_id: $("#press_id").val(),
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#select_rack_table tbody"));
};
$(document).on("click", "#select_rack_table tbody tr", function() {
  if (!$(this).hasClass("selected-record")) {
      $(this).parent().find("tr").removeClass("selected-record");
      $(this).addClass("selected-record");
      $("#rack_selected").removeAttr("id");
      $(this).attr("id", "rack_selected");
  } else {
      let rack_id = $(this).find("td:nth-child(1)").html();
      let rack_number = $(this).find("td:nth-child(2)").html();
      let qty = $(this).find("td:nth-child(3)").html();
      press_date = $("#press_date").val();
      var newTr = $("<tr>");
      $("<td>").html(rack_id).appendTo(newTr);
      $("<td>").html(press_date).appendTo(newTr);
      $("<td>").html(rack_number).appendTo(newTr);
      $("<td>").html(qty).appendTo(newTr);
      if (!checkRackId(rack_id)) {
        $(newTr).appendTo("#input_rack_table tbody");
        $(this).remove();
      } else (alert("rack_number already input!"))
  }
});
function checkRackId(rack_id) {
  exist = false;
  $("#input_rack_table tbody tr").each(function (index, element) {
      ip_id = $(this).find("td:first").html();
      if(ip_id == rack_id) exist = true;
  });
  return exist;
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
// $("#racknumber__input").on("keydown", function (e) {
//   var k = e.keyCode;
//   var str = String(k);
//   if (k === 13 && $(this).hasClass("complete-input")) {
//     $("#rackqty__input").focus();
//     return false;
//   }
// });

// $("#racknumber__input").on("keyup", function () {
//   if (!isNaN($(this).val()) &&
//     $(this).val() != "" &&
//     0 < $(this).val() &&
//     $(this).val() <= 200 &&
//     checkDuplicateRackNumber()) {
//     $(this).removeClass("no-input").addClass("complete-input");
//   } else {
//     $(this).removeClass("complete-input").addClass("no-input");
//   }
// });

// $("#rackqty__input").on("keydown", function (e) {
//   var k = e.keyCode;
//   var str = String(k);
//   keyCodeCheck(str);
//   if (k === 13) {
//     $("#add_rack__button").focus();
//     e.preventDefault();
//     return false;
//   }
// });

// $("#rackqty__input").on("keyup", function (e) {
//   if (!isNaN($(this).val()) &&
//     $(this).val() != "" &&
//     0 < $(this).val()) {
//     $(this).removeClass("no-input").addClass("complete-input");
//   } else {
//     $(this).removeClass("complete-input").addClass("no-input");
//   }
//   if (checkRackInputComplete()) {
//     $("#add_rack__button").prop("disabled", false);
//   } else {
//     $("#add_rack__button").prop("disabled", true);
//   }
// });

// function checkRackInputComplete() {
//   let flag = false;
//   if ($("#racknumber__input").hasClass("complete-input") &&
//     $("#rackqty__input").hasClass("complete-input")) {
//     flag = true;
//   } else {
//     flag = false;
//   }
//   return flag;
// };

// function checkDuplicateRackNumber() {
//   var flag = true;
//   var inputValue = $("#racknumber__input").val();
//   $("#output_rack_table tbody tr td:nth-child(3)").each(function (index, value) {
//     if (Number($(this).text()) == inputValue) {
//       flag = false;
//     }
//   });
//   return flag;
// };

// function keyCodeCheck(k) {
//   var str = String(k);
//   if (!(str.match(/[0-9]/) ||
//       (37 <= k && k <= 40) ||
//       k === 8 ||
//       k === 46 ||
//       k === 13)
//   ) {return false;
//   } else {return true;}
// };

// $("#add_rack__button").on("keydown", function (e) {
//   cancelKeydownEvent = true;
// });

// $("#add_rack__button").on("click", function () {
//   let trNumber;
//   let fileName;
//   let sendData = new Object();
//   let order_number;
//   let rackNumberArr = [];
//   switch ($(this).text()) {
//     case "Save":
//       trNumber = $("#output_rack_table tbody tr").length;
//       $("<tr>")
//         .append("<td></td>")
//         .append("<td>" + (trNumber + 1) + "</td>")
//         .append("<td>" + $("#racknumber__input").val() + "</td>")
//         .append("<td>" + $("#rackqty__input").val() + "</td>")
//         .appendTo("#output_rack_table tbody");
//       $(this).prop("disabled", true);
//       $("#racknumber__input")
//         .val("")
//         .focus()
//         .removeClass("complete-input")
//         .addClass("no-input");
//       $("#rackqty__input")
//         .val("")
//         .removeClass("complete-input")
//         .addClass("no-input");
//       break;
//     case "Add":
//       $("#output_rack_table tbody tr td:nth-child(2)").each(function () {
//         rackNumberArr.push(Number($(this).html()));
//       });
//       if (rackNumberArr.length != 0) {
//         order_number = Math.max(...rackNumberArr) + 1;
//       } else {
//         order_number = 1;
//       }
//       fileName = "InsUsingAgingRack.php";
//       sendData = {
//         drawing_id: $("#selected__tr td:nth-child(1)").text(),
//         order_number: order_number,
//         rack_number: $("#racknumber__input").val(),
//         work_quantity: $("#rackqty__input").val(),
//       };
//       myAjax.myAjax(fileName, sendData);
//       makeRackTable();
//       $("#racknumber__input").val("").removeClass("complete-input").addClass("no-input");
//       $("#rackqty__input").val("").removeClass("complete-input").addClass("no-input");
//       $("#add_rack__button").prop("disabled", true);
//       break;
//   }
// });

// $(document).on("click", "#output_rack_table tbody tr", function () {
//   let deleteDialog = document.getElementById("delete-rack__dialog");
//   if (!$(this).hasClass("selected-record")) {
//     $(this).parent().find("tr").removeClass("selected-record");
//     $(this).addClass("selected-record");
//     $("#rack_selected__tr").removeAttr("id");
//     $(this).attr("id", "rack_selected__tr");
//   } else {
//     deleteDialog.showModal();
//   }
// });

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

// function makeRackTable() {
//   fileName = "SelRack2.php";
//   sendData = {
//     id: $("#selected__tr").find("td").eq(0).html(),
//   };
//   myAjax.myAjax(fileName, sendData);
//   $("#output_rack_table tbody").empty();
//   ajaxReturnData.forEach(function (trVal) {
//     var newTr = $("<tr>");
//     Object.keys(trVal).forEach(function (tdVal) {
//       if (tdVal == "rack_number" || tdVal == "work_quantity") {
//         $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
//       } else {
//         $("<td>").html(trVal[tdVal]).appendTo(newTr);
//       }
//     });
//     $(newTr).appendTo("#output_rack_table tbody");
//   });
// };

// function renumberTableColumn() {
//   $("#output_rack_table tbody tr td:nth-child(1)").each(function (index, val) {
//     $(this).text(index + 1);
//   });
// };

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

$(document).on("keyup", "#profile_cut_table input", function () {
  if (0 < Number($(this).val()) &&
    Number($(this).val()) <= 20 &&
    $(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
});
$(document).on("click", "#add_cut_button", function () {
  if (Number($("#input_rack_table tbody tr").length) == 0) {
    alert("Please select input rack!");
    return;
  }
  maxSumCut = 0;
  sum = 0;
  $("#input_rack_table tbody tr td:nth-child(4)").each(function (index, value) {
    maxSumCut += Number($(this).text());
  });
  let trDom = $("<tr>");
  let recordNumber = Number($("#profile_cut_table tbody tr").length) + 1;

  if (recordNumber > maxSumCut) {
    alert("Number input is bigger than input quantity!");
    return;
  };
  let rack_number = makeRackNumber(recordNumber);
  trDom.append($("<th>").html("No." + recordNumber));
    let tdDom;
    trDom.append($("<td>").html(rack_number));
    tdDom = $("<td>").append($("<input>").val($("#profile_cut_ok").val()).addClass("need-clear"));
    trDom.append(tdDom);
    tdDom = $("<td>").append($("<input>").val($("#profile_cut_ng").val()).addClass("need-clear"));
    trDom.append(tdDom);
  trDom.appendTo("#profile_cut_table");
});
function makeRackNumber(recordNumber) {
  var quantity = 0;
  var rack_number = 0;
  var sum = 0;
  var table = document.getElementById("input_rack_table");
  var tbody = table.getElementsByTagName("tbody")[0];
  var tr = tbody.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      rack_number = tr[i].getElementsByTagName("td")[2].innerText;
      quantity = tr[i].getElementsByTagName("td")[3].innerText;
      sum = +quantity;
      if (recordNumber <= sum) {
        break;
      }
  }
  return rack_number;
};
function makeSendData(workInfrmationTable) {
  sendTable = [];
  workInfrmationTable.forEach(function (element, index) {
    sendTable.push([index + 1, 1, element[0], element[1]]);
  });
  return sendTable;
}

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

$(document).on("change", "#ordersheet_id", function () {
  $("#production_number_id").val(0);
  $("#select_rack_table tbody").empty();
  $("#input_rack_table tbody").empty();
  $("#profile_cut_table tbody").empty();
  $("#press_id option").remove();
  $("#press_date").val("");
});
$(document).on("change", "#production_number_id", function () {
  $("#ordersheet_id").val(0);
  $("#select_rack_table tbody").empty();
  $("#input_rack_table tbody").empty();
  $("#profile_cut_table tbody").empty();
  $("#press_id option").remove();
  $("#press_date").val("");
});

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
  console.log($(this).val());
});

$(document).on("click", "#select_ordersheet", function () {
  window.open(
    "./OrderSheet.html",
    null,
    "width=830, height=500,toolbar=yes,menubar=yes,scrollbars=no"
  );
});

function checkInput() {
  var check = true;
  $(".left__wrapper .save-data").each(function() {
    console.log(1)
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $(".left__wrapper select").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
      console.log(2)
    }
  });
  if ($("#summary_table tbody tr").hasClass("selected-record")) {
    check = false;
    console.log(3)
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
  $(".left__wrapper input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $(".left__wrapper select").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  if (!$("#summary_table tbody tr").hasClass("selected-record")) {
      check = false;
    }
  if (check) {
    $("#update__button").attr("disabled", false);
  } else {
    $("#update__button").attr("disabled", true);
  }
  return check;
};

function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_table tbody"));
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
$(document).on("click", "#summary_table tbody tr", function (e) {
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
    $("#add_material").text("Add");
  } else {
    // deleteDialog.showModal();
  }
  $("#save").attr("disabled", true);
  checkUpdate();
  makeAddMaterial();
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
  Total();
  changeElement();
});
function MaterialNameCode() {
  var fileName = "SelMaterialName.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  $("#material option").remove();
  $("#material").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#material").append(
          $("<option>").val(value["id"]).html(value["material_name"])
      );
  });
};
$(document).on("change", "#product_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#code", function() {
  $(this).val($(this).val().toUpperCase());
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#product_type", function() {
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
    changeElement();
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});

function changeElement() {
    var fileName = "SelMaterialElement.php";
    var sendData = {
      product_type: $("#product_type").val(),
    };
    myAjax.myAjax(fileName, sendData);
    $("#si_req").text(ajaxReturnData[0]["si"]);
    $("#mg_req").text(ajaxReturnData[0]["mg"]);
    $("#mn_req").text(ajaxReturnData[0]["mn"]);
    $("#cr_req").text(ajaxReturnData[0]["cr"]);
    $("#cu_req").text(ajaxReturnData[0]["cu"]);
    $("#fe_req").text(ajaxReturnData[0]["fe"]);
    $("#zn_req").text(ajaxReturnData[0]["zn"]);
    $("#ti_b_req").text(ajaxReturnData[0]["ti_b"]);
}

$(document).on("keyup", "#extrusion_scrap", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#casting_scrap", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#aluminium_ingot", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#material", function() {
  add_material_check();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
      var fileName = "SelMaterialNameType.php";
      var sendData = {
        material_name_id: $("#material").val(),
      };
      myAjax.myAjax(fileName, sendData);
      $("#material_type option").remove();
      $("#material_type").append($("<option>").val(0).html("NO"));
      $("#material_type").removeClass("complete-input").addClass("no-input");
      ajaxReturnData.forEach(function(value) {
          $("#material_type").append(
              $("<option>").val(value["id"]).html(value["material_name_type"])
          );
      });
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#material_type", function() {
  add_material_check();
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#material_weight", function() {
  add_material_check();
  if ($(this).val() > 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#staff_id", function() {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#melting_table thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", "#melting_table thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", "#element_table tbody input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("keyup", ".casting__wrapper thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
$(document).on("change", ".casting__wrapper thead input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});
function getTableData(tableTrObj) {
  var tableData = [];
  tableTrObj.each(function (index, element) {
    var tr = [];
    $(this)
      .find("td")
      .each(function (index, element) {
        if ($(this).find("input").length) {
          tr.push($(this).find("input").val());
        } else if ($(this).find("select").length) {
          tr.push($(this).find("select").val());
        } else {
          tr.push($(this).html());
        }
      });
    tableData.push(tr);
  });
  return tableData;
}

$("#add_material").on("click", function () {
  switch ($(this).text()) {
    case "Save":
      if (from_import && from_import_data != "") {
        $("<tr>")
        .append("<td></td>")
        .append($("<td>").append(MaterialNameOption2(from_import_data.origin)))
        .append($("<td>").append(MaterialNameTypeOption2(from_import_data.material_type_cast)))
        .append($("<td>").append($("<input>").val(from_import_data.weight).prop('disabled', 'disabled')))
        .append($("<td>").append($("<input>").val(from_import_data.code_name).prop('disabled', 'disabled')))
        .append($("<td>").append(from_import_data.id))
        .appendTo("#material_table tbody");
        $(this).prop("disabled", true);
        $("#material").val("0").focus().removeClass("complete-input").addClass("no-input");
        $("#material_type").val("0").removeClass("complete-input").addClass("no-input");
        $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
        $("#material_note").val("");
        break;
      } else {
        $("<tr>")
        .append("<td></td>")
        .append($("<td>").append(MaterialNameOption($("#material").val())))
        .append($("<td>").append(MaterialNameTypeOption($("#material_type").val())))
        .append($("<td>").append($("<input>").val($("#material_weight").val())))
        .append($("<td>").append($("<input>").val($("#material_note").val())))
        .appendTo("#material_table tbody");
        $(this).prop("disabled", true);
        $("#material").val("0").focus().removeClass("complete-input").addClass("no-input");
        $("#material_type").val("0").removeClass("complete-input").addClass("no-input");
        $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
        $("#material_note").val("");
        break;
      }
    case "Add":
      if (from_import && from_import_data != "") {
        let fileName;
        let sendData = new Object();
        fileName = "AddMaterial.php";
        sendData = {
          t_casting: $("#selected__tr td:nth-child(1)").text(),
          material: from_import_data.origin,
          material_type: from_import_data.material_type_cast,
          weight: from_import_data.weight,
          note: from_import_data.code_name,
          import_material_id: from_import_data.id
        };
        myAjax.myAjax(fileName, sendData);
        makeAddMaterial();
        $("#material").val("").removeClass("complete-input").addClass("no-input");
        $("#material_type").val("").removeClass("complete-input").addClass("no-input");
        $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
        $("#add_material").prop("disabled", true);
        break;
      } else {
        let fileName;
        let sendData = new Object();
        fileName = "AddMaterial.php";
        sendData = {
          t_casting: $("#selected__tr td:nth-child(1)").text(),
          material: $("#material").val(),
          material_type: $("#material_type").val(),
          weight: $("#material_weight").val(),
          note: $("#material_note").val(),
          import_material_id: null
        };
        myAjax.myAjax(fileName, sendData);
        makeAddMaterial();
        $("#material").val("").removeClass("complete-input").addClass("no-input");
        $("#material_type").val("").removeClass("complete-input").addClass("no-input");
        $("#material_weight").val("").removeClass("complete-input").addClass("no-input");
        $("#add_material").prop("disabled", true);
        break;
      }
  }
  from_import = false;
  from_import_data = "";
  Total();
});
function add_material_check() {
  if ($("#material").val() == 0 ||
      $("#material_type").val() == 0 ||
      $("#material_weight").val() <= 0) {
      $("#add_material").prop("disabled", true);
  } else {
      $("#add_material").prop("disabled", false);
  }
};
function makeAddMaterial() {
  fileName = "SelAddMaterial.php";
  sendData = {
    t_casting: $("#selected__tr td:nth-child(1)").text(),
  };
  myAjax.myAjax(fileName, sendData);
  $("#material_table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      if (((trVal.import_material_id != 0) && (trVal.import_material_id != null))) {
        if (tdVal == "material") {
          $("<td>")
              .append(MaterialNameOption2(trVal[tdVal]))
              .appendTo(newTr);
        } else if (tdVal == "material_type") {
          $("<td>")
              .append(MaterialNameTypeOpt2(trVal[tdVal], trVal.material))
              .appendTo(newTr);
        } else if ((tdVal == "weight") || (tdVal == "note")) {
          $("<td>").append($("<input>").val(trVal[tdVal]).prop('disabled', 'disabled')).appendTo(newTr);
        } else {
          $("<td>").html(trVal[tdVal]).appendTo(newTr);
        }
      } else {
        if (tdVal == "material") {
          $("<td>")
              .append(MaterialNameOption(trVal[tdVal]))
              .appendTo(newTr);
        } else if (tdVal == "material_type") {
          $("<td>")
              .append(MaterialNameTypeOpt(trVal[tdVal], trVal.material))
              .appendTo(newTr);
        } else if ((tdVal == "weight") || (tdVal == "note")) {
          $("<td>").append($("<input>").val(trVal[tdVal])).appendTo(newTr);
        } else {
          $("<td>").html(trVal[tdVal]).appendTo(newTr);
        }
      }
    });
    $(newTr).appendTo("#material_table tbody");
  });
};
function MaterialNameTypeOpt(seletedId, material) {
  let targetDom = $("<select>");
  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id: material,
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameTypeOpt2(seletedId, material) {
  let targetDom = $("<select>").prop('disabled', 'disabled');
  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id: material,
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameOption(seletedId) {
  let targetDom = $("<select>");

  fileName = "SelMaterialName.php";
  sendData = {
      ng_code: "%",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameTypeOption(seletedId) {
  let targetDom = $("<select>");
  if (from_import && from_import_data !="") {
    material_name_id = from_import_data.origin
  } else {
    material_name_id = $("#material").val();
  }
  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
};

function MaterialNameOption2(seletedId) {
  let targetDom = $("<select>").prop('disabled', 'disabled');

  fileName = "SelMaterialName.php";
  sendData = {
      ng_code: "%",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function MaterialNameTypeOption2(seletedId) {
  let targetDom = $("<select>").prop('disabled', 'disabled');
  if (from_import && from_import_data !="") {
    material_name_id = from_import_data.origin
  } else {
    material_name_id = $("#material").val();
  }
  fileName = "SelMaterialNameType.php";
  sendData = {
    material_name_id
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_name_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}

$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
  checkUpdate();
});

function getInputData() {
  let inputData = new Object();
    $(".top__wrapper input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $(".top__wrapper select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  if ($("#file_upload").prop("files")[0]) {
    inputData["file_url"] = $("#file_url").html();
    ajaxFileUpload();
  } else {
    inputData["file_url"] = $("#file_url").html();
  }
  $(".material__wrapper .right__material input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".material__wrapper .right__material input.date-time").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".element__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".casting__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".casting__wrapper input.date-time").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  console.log(inputData);
  console.log(Object.keys(inputData).length);
  return inputData;
}
function clearInputData() {
  $(".top__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".top__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".top__wrapper select.need-clear").each(function (index, element) {
    $(this).val("0").removeClass("complete-input").addClass("no-input");
  });

  $("#file_url").html("No file");

  $(".material__wrapper .right__material input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".material__wrapper .right__material input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".element__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".element__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $(".casting__wrapper input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".casting__wrapper input.no-need").each(function (index, element) {
    $(this).val("").removeClass("no-input").addClass("complete-input");
  });
  $("#material_table tbody").empty();
}
function getTableData(tableTrObj) {
  var tableData = [];
  tableTrObj.each(function (index, element) {
    var tr = [];
    $(this)
      .find("td")
      .each(function (index, element) {
        if ($(this).find("input").length) {
          tr.push($(this).find("input").val());
        } else if ($(this).find("select").length) {
          tr.push($(this).find("select").val());
        } else {
          tr.push($(this).html());
        }
      });
    tableData.push(tr);
  });
  console.log(tableData);
  return tableData;
}

$(document).on("click", "#save", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  let targetId = ajaxReturnData[0]["id"];
  tableData = getTableData($("#material_table tbody tr"));
  tableData.push(targetId);
  fileName = "InsMaterialData.php";
  sendData = JSON.stringify(tableData);
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
});
$(document).on("click", "#update", function () {
  fileName = "UpdateData.php";
  inputData = getInputData();
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
});
$(document).on("click", "#material_table tbody tr", function() {
  if (!$(this).hasClass("selected-record")) {
      $(this).parent().find("tr").removeClass("selected-record");
      $(this).addClass("selected-record");
      $("#material_selected").removeAttr("id");
      $(this).attr("id", "material_selected");
  } else {
      // $(this).removeClass("selected-record");
      // $(this).removeAttr("id");
  }
});
$(document).on("change", "#material_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateAddMaterial.php";
  sendData = {
    id: $("#material_selected td:nth-child(1)").html(),
    material : $("#material_selected td:nth-child(2) select").val(),
    material_type: $("#material_selected td:nth-child(3) select").val(),
    material_weight: $("#material_selected td:nth-child(4) input").val(),
    material_note: $("#material_selected td:nth-child(5) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
  Total();
});
function putDataToInput(data) {
    data.forEach(function (trVal) {
      Object.keys(trVal).forEach(function (tdVal) {
        $("#" + tdVal).val(trVal[tdVal]); 
      });
  });
  $("#file_url").html(data[0].file_url);
};

function calTotal(id, type) {
  var total = 0;
  $("#material_table tbody tr").each(function (index, element) {
    if ($(this).find("td:nth-child(2) select").val() == type) {
      total += parseInt($(this).find("td:nth-child(4) input").val());
// console.log(total);
    }
    $("#" + id).html(total);
  });
};
function Total() {
  calTotal("plextrusion", 1);
  calTotal("pldiscard", 2);
  calTotal("plcut", 3);
  calTotal("plcast", 4);
  calTotal("plgcng", 5);
  calTotal("plingot", 6);
  calTotal("plalloy", 7);
  calTotal("plorther", 8);
  var total = 0;
    $("#material_table tbody tr").each(function (index, element) {
      total += parseInt($(this).find("td:nth-child(4) input").val());
    }
  );
  $("#ttmate").html(total);
};

$(document).on("keyup", "#material_note", function() {
  if (inputCheck($(this).val())) {
    fileName = "CheckImportMaterial.php";
      sendData = {
        material_note: $("#material_note").val(),
      };
      myAjax.myAjax(fileName, sendData);
      console.log(ajaxReturnData);
      if(ajaxReturnData.length != 0) {
        $("#add_material").prop("disabled", false);
        from_import = true;
        from_import_data = ajaxReturnData[0];
      } else {
        from_import = false;
        from_import_data = "";
      }
  } else {
    $("#add_material").prop("disabled", true);
  }
});
function inputCheck(val) {
  // sampleInput = "N11-NG-12345";
  let regexp = /^[A-Z]{1}[0-9]{2}-[N|D|H][G|I|E]-[0-9]+$/;
  return regexp.test(val);
};

$(document).on("click", "#directive__input", function () {
  window.open(
    "./OrderSheet.html",
    null,
    "width=830, height=500,toolbar=yes,menubar=yes,scrollbars=no"
  );
});