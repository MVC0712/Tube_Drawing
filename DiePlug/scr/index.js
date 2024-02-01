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

makeDieTable();
makePlugTable();
makeproductionNumberTable();
selProductionNumber();

$(document).on("keyup", "#production_number", function() {
  selProductionNumber();
});
function selProductionNumber() {
  var fileName = "SelProductionNumber.php";
  var sendData = {
    production_number: $("#production_number").val(),
  };
  myAjax.myAjax(fileName, sendData);
  $(".left__wrapper #ex_production_numbers_id option").remove();
  $(".left__wrapper #ex_production_numbers_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $(".left__wrapper #ex_production_numbers_id").append(
          $("<option>").val(value["id"]).html(value["production_number"])
      );
  });
  $(".mid__wrapper #ex_production_numbers_id option").remove();
  $(".mid__wrapper #ex_production_numbers_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $(".mid__wrapper #ex_production_numbers_id").append(
          $("<option>").val(value["id"]).html(value["production_number"])
      );
  });
  $(".bottom__wrapper #ex_production_numbers_id option").remove();
  $(".bottom__wrapper #ex_production_numbers_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $(".bottom__wrapper #ex_production_numbers_id").append(
          $("<option>").val(value["id"]).html(value["production_number"])
      );
  });
};

function makeDieTable() {
  fileName = "SelDie.php";
  sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#die__table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $(newTr).appendTo("#die__table tbody");
  });
};
function makePlugTable() {
  fileName = "SelPlug.php";
  sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#plug__table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $(newTr).appendTo("#plug__table tbody");
  });
};
function makeproductionNumberTable() {
  fileName = "SelProductionNumberTB.php";
  sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#production_number__table tbody").empty();
  ajaxReturnData.forEach(function (trVal) {
    var newTr = $("<tr>");
    Object.keys(trVal).forEach(function (tdVal) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $(newTr).appendTo("#production_number__table tbody");
  });
};
$(document).on("click", "#die__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#die_selected__tr").removeAttr("id");
    $(this).attr("id", "die_selected__tr");
  } else {
  }
});
$(document).on("click", "#plug__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#plug_selected__tr").removeAttr("id");
    $(this).attr("id", "plug_selected__tr");
  } else {
  }
});
$(document).on("click", "#production_number__table tbody tr", function () {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#production_number_selected__tr").removeAttr("id");
    $(this).attr("id", "production_number_selected__tr");
  } else {
  }
});

$("#add_rack__button").on("click", function () {
  fileName = "InsUsingAgingRack.php";
  sendData = {
    washing_output_id: $("#washing_date_selected__tr td:nth-child(1)").text(),
    rack_number: $("#racknumber__input").val(),
    work_quantity: $("#rackqty__input").val(),
  };
  myAjax.myAjax(fileName, sendData);
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
});

function checkDieInput() {
  var input = true;
  var update = true;
  $(".left__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      input = false;
      update = false;
    }
  });
  if (($("#die__table tbody tr").hasClass("selected-record"))) {
    input = false;
  }
  if (!($("#die__table tbody tr").hasClass("selected-record"))) {
    update = false;
  }
  if (input) {
    $("#die_save__button").attr("disabled", false);
  } else {
    $("#die_save__button").attr("disabled", true);
  };
  if (update) {
    $("#die_update__button").attr("disabled", false);
  } else {
    $("#die_update__button").attr("disabled", true);
  };
};
function checkPlugInput() {
  var input = true;
  var update = true;
  $(".mid__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      input = false;
      update = false;
    }
  });
  if (($("#plug__table tbody tr").hasClass("selected-record"))) {
    input = false;
  }
  if (!($("#plug__table tbody tr").hasClass("selected-record"))) {
    update = false;
  }
  if (input) {
    $("#plug_save__button").attr("disabled", false);
  } else {
    $("#plug_save__button").attr("disabled", true);
  };
  if (update) {
    $("#plug_update__button").attr("disabled", false);
  } else {
    $("#plug_update__button").attr("disabled", true);
  };
};
function checkProductionNumberInput() {
  var input = true;
  var update = true;
  $(".bottom__wrapper .save-data").each(function() {
    if ($(this).hasClass("no-input")) {
      input = false;
      update = false;
    }
  });
  if (($("#production_number__table tbody tr").hasClass("selected-record"))) {
    input = false;
  }
  if (!($("#production_number__table tbody tr").hasClass("selected-record"))) {
    update = false;
  }
  if (input) {
    $("#production_numbers_save__button").attr("disabled", false);
  } else {
    $("#production_numbers_save__button").attr("disabled", true);
  };
  if (update) {
    $("#production_numbers_update__button").attr("disabled", false);
  } else {
    $("#production_numbers_update__button").attr("disabled", true);
  };
};

$(document).on("keyup change", ".save-data", function() {
  checkDieInput();
  checkPlugInput();
  checkProductionNumberInput();
});

function getInputDieData() {
  let inputData = new Object();
  $(".left__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".left__wrapper select.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  return inputData;
};
function getInputPlugData() {
  let inputData = new Object();
  $(".mid__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".mid__wrapper select.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  return inputData;
};
function getInputProductionNumberData() {
  let inputData = new Object();
  $(".bottom__wrapper input.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  $(".bottom__wrapper select.save-data").each(function (index, element) {
    inputData[$(this).attr("id")] = $(this).val();
  });
  return inputData;
};
function clearInputData() {
  $("input.need-clear").each(function (index, element) {
    $(this).val("").removeClass("complete-input").addClass("no-input");
  });
  $("select.need-clear").each(function (index, element) {
    $(this).val("0").removeClass("complete-input").addClass("no-input");
  });
  $("input.no-need").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
  $("select.no-need").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
};

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
function putDataToInput(data, className) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("." + className +"#" + tdVal).val(trVal[tdVal]);
    });
  });
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