let deleteDialog = document.getElementById("delete__dialog");

let ajaxReturnData;
let cancelKeyupEvent = false;
let cancelKeydownEvent = false;
let editMode = false;
let readNewFile = false;
let pos = ["A2","A3","B1","B2","B3","B4","C1","C2","C3","C4","D2","D3"];
let selectCode =[];

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
      .fail(function () {
        alert("DB connect error");
      });
  },
};

$(function () {
  fillSelectBox(pos);
  // fillInputBox(selectCode);
  makeSummaryTable();
  makeCastingTable();
  selSelectCode();
  selStaff();
});
function makeSummaryTable() {
  var fileName = "SelSummary.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#summary_table tbody"));
};
function selSelectCode() {
  var fileName = "SelSelectCode.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  selectCode = ajaxReturnData;
  fillInputBox(selectCode);
  selectCode =[];
};
function makeCastingTable() {
  var fileName = "SelCasting.php";
  var sendData = {
      dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  fillTableBody(ajaxReturnData, $("#casting__table tbody"));
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
function fillSelectBox(posArray) {
  $(".select-pos").append($("<option>").val(0).html(""));
  posArray.forEach(function(value, index) {
    $(".select-pos").append(
        $("<option>").val(index+1).html(value)
    );
  });
};
function fillInputBox(posArray) {
  $("#data__table .input-code").each(function (index, element) {
    if (($(this).val() == 0) || ($(this).val() == "")) {
      $(this).empty().append($("<option>").val(0).html(""));
      for (let i = 0; i < posArray.length; i++) {
        $(this).append(
            $("<option>").val(posArray[i].id).html(posArray[i].code)
          );
      }
    }
  });
};
function selStaff() {
  var fileName = "SelStaff.php";
  var sendData = {
      dummy: "dummy",
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
$(document).on("change", "#code", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", ".time-input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});

$(document).on("keyup", ".number-input", function() {
  if($.isNumeric($(this).val())){
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", ".select-pos", function() {
  if (($(this).val() != 0) && ($(this).parent().find(".input-code").val() == 0)) {
    $(this).parent().find(".input-code").removeClass("complete-input").addClass("no-input");
  } else {
    $(this).parent().find(".input-code").removeClass("no-input").addClass("complete-input");
  }
  checkInput();
});
$(document).on("change", ".input-code", function() {
  if ($(this).val() > 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "#staff_id", function() {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
function checkInput() {
  let check = true;
  $("#data__table tbody input").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $("#data__table tbody select").each(function() {
    if ($(this).hasClass("no-input")) {
      check = false;
    }
  });
  $(".input-group .time-input").each(function() {
    if ($(this).val() == "") {
      check = false;
    }
  });
  if ($("#code").val() == "") {
    check = false;
  };
  $(".input-group .number-input").each(function() {
    if(!$.isNumeric($(this).val())){
      check = false;
    }
  });
  if ($("#staff_id").val() == 0) {
    check = false;
  };
  if (check) {
    $("#save__button").attr("disabled", false);
  } else {
    $("#save__button").attr("disabled", true);
  } 
};
function getInputData() {
  let inputData = new Object();
    $(".input-group input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $(".input-group select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("#data__table input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("#data__table select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    if ($("#file_upload").prop("files")[0]) {
      inputData["file_url"] = $("#file_url").html();
      ajaxFileUpload();
    } else {
      inputData["file_url"] = $("#file_url").html();
    }
  console.log(inputData);
  console.log(Object.keys(inputData).length);
  return inputData;
}

$(document).on("click", "#casting__table tbody tr", function() {
  let selected = new Object();
  if (!$(this).hasClass("selected-record")) {
      $(this).addClass("selected-record");
      $(this).attr("id", "error__selected");
      selected.id = $(this).find("td").eq(0).html();
      selected.code = $(this).find("td").eq(1).html();
      selectCode.push(selected);
  } else {
    $(this).removeClass("selected-record");
    $(this).removeAttr("id");
    const code2s = $(this).find("td").eq(0).html();
    selectCode = selectCode.filter(obj => obj.id != code2s);
  }
  fillInputBox(selectCode);
  console.log(selectCode);
});

$("#file_upload").on("change", function () {
  var file = $(this).prop("files")[0];
  console.log(file.name);
  $("#file_url").html(file.name);
  $("#preview__button").prop("disabled", false);
  readNewFile = true;
});
$(document).on("click", "#preview__button", function () {
  window.open("./HomoSub.html");
});
$(document).on("change", "#file_upload", function () {
  ajaxFileUpload();
  console.log("Change file");
});
function ajaxFileUpload() {
  var file_data = $('#file_upload').prop('files')[0];
  var form_data = new FormData();
  form_data.append('file', file_data);
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
$(document).on("click", "#save__button", function () {
  fileName = "InsDataV2.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
  clearInputData();
});
$(document).on("click", "#update__button", function () {
  fileName = "UpdateDataV2.php";
  inputData = getInputData();
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable();
  clearInputData();
});
$(document).on("click", "#summary_table tbody tr", function (e) {
  let fileName = "SelUpdateDataV2.php";
  let sendData;
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    sendData = {
      targetId: $("#selected__tr").find("td").eq(0).html(),
    };
    console.log(sendData);
    myAjax.myAjax(fileName, sendData);
    putDataToInput(ajaxReturnData);
  } else {
    // deleteDialog.showModal();
  }
  $("#save__button").attr("disabled", true);
  $("#update__button").attr("disabled", false);
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
});

function putDataToInput(data) {
    data.forEach(function (trVal) {
      Object.keys(trVal).forEach(function (tdVal) {
        $("#" + tdVal).val(trVal[tdVal]); 
      });
  });
  $("#file_url").html(data[0].file_url);
};
function clearInputData() {
  $("#file_url").html("No file");
  $(".select-pos").each(function (index, element) {
    $(this).val(0);
  });
  $(".input-code").each(function (index, element) {
    $(this).val(0);
  });
  $(".number-input").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $(".time-input").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $("#code").val("").removeClass("complete-input").addClass("no-input");
}