let editMode = false;
let ajaxReturnData, fileName, sendData;
// 削除確認ダイアログ
// let deleteDialog = document.getElementById("delete__dialog");

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

selSummary();
selProductionNumber();

function selSummary() {
  var fileName = "SelSummary.php";
  var sendData = {
    search_input: $("#search_input").val()
  };
  myAjax.myAjax(fileName, sendData);
  makeSummaryTable(ajaxReturnData);
};

function makeSummaryTable(data) {
  $("#summary__table tbody").empty();
  data.forEach(function (trVal) {
    var newTr = $("<tr>");
    trVal["production_quantity"] = String(trVal["production_quantity"]).replace(
      /(\d)(?=(\d\d\d)+(?!\d))/g,
      "$1,"
    );
    if (trVal["work_quantity"])
      trVal["work_quantity"] = String(trVal["work_quantity"]).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        "$1,"
      );
    if (trVal["total_ok"])
      trVal["total_ok"] = String(trVal["total_ok"]).replace(
        /(\d)(?=(\d\d\d)+(?!\d))/g,
        "$1,"
      );
    Object.keys(data[0]).forEach(function (tdVal) {
      $("<td>").html(trVal[tdVal]).appendTo(newTr);
    });
    $("#summary__table tbody").append($(newTr));
  });
  Color();
}
$(document).on("keyup", "#search_input", function (e) {
  selSummary();
});
$(document).on("keyup", "#ordersheet_number", function (e) {
  if ($(this).val().length > 3) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  chekInputButtonActivete();
});

$(document).on("keyup", "#production_number", function (e) {
  selProductionNumber();

  if ($("#production_numbers_id").val() != 0) {
    $("#production_numbers_id").removeClass("no-input").addClass("complete-input");
  } else {
    $("#production_numbers_id").removeClass("complete-input").addClass("no-input");
  }
  chekInputButtonActivete();
});

function selProductionNumber() {
  var fileName = "SelProductionNumber.php";
  var sendData = {
    production_number: $("#production_number").val(),
  };
  myAjax.myAjax(fileName, sendData);

  $("#production_numbers_id option").remove();
  $("#production_numbers_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#production_numbers_id").append(
          $("<option>").val(value["id"]).html(value["production_number"])
      );
  });
};
$(document).on("change", "#production_numbers_id", function (e) {
  if ($(this).val() != 0) {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  chekInputButtonActivete();
});
$(document).on("change", "input[type='date']", function (e) {
  if ($(this).val() != 0 && $(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  chekInputButtonActivete();
});
$(document).on("keyup", "#production_quantity", function (e) {
  if ($(this).val() >= 1 && $(this).val() != "") {
    $(this).removeClass("no-input").addClass("complete-input");
  } else {
    $(this).removeClass("complete-input").addClass("no-input");
  }
  chekInputButtonActivete();
});
$(document).on("keydown", ".main__wrapper input", function (e) {
  chkMoveNext(
    e,
    $(this),
    getNextTargetIdName($(".main__wrapper input"), $(this).attr("id"))
  );
});

function getNextTargetIdName(targetObject, thisIdName) {
  let nextIndexFlag = false;
  let nextTargetDom;

  targetObject.each(function (index, element) {
    if (nextIndexFlag == true) {
      nextTargetDom = $(element);
    }
    if ($(element).attr("id") == thisIdName) {
      nextIndexFlag = true;
    } else {
      nextIndexFlag = false;
    }
  });
  return nextTargetDom;
}

function chkMoveNext(e, thisDom, nextDom) {
  if (e.keyCode == 13 && thisDom.hasClass("complete-input")) {
    e.preventDefault();
    $(nextDom).focus();
  }
}

$(".main__wrapper input").on("keyup", function () {
  chekInputButtonActivete();
});
function chekInputButtonActivete() {
  var flag = true;
  $(".save-data").each(function (index, element) {
    if ($(this).hasClass("no-input")) {
      flag = false;
    }
  });
  if (flag && editMode == false) {
    $("#save__button").prop("disabled", false);
  } else {
    $("#save__button").prop("disabled", true);
  }
}

$(document).on("click", "#summary__table tr", function (e) {
  if (!$(this).hasClass("selected-record")) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
    $("#selected__tr").removeAttr("id");
    $(this).attr("id", "selected__tr");
    var fileName = "SelSelData.php";
    var sendData = {
      targetId: $("#selected__tr").find("td").eq(0).html()
    };
    myAjax.myAjax(fileName, sendData);
    putDataToInput(ajaxReturnData)
    editMode = true;
  } else {
    deleteDialog.showModal();
  }
  $("#update__button").prop("disabled", false);
});
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]);
    });
  });
  $("#production_number").val("");
  $("#production_numbers_id").append($("<option>")
    .html(data["production_number"])
    .val(data["production_numbers_id"])
  );
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
};
$(document).on("click", "#save__button", function () {
  var data = getInputData();
  var fileName = "InsInputData.php";
  sendData = data;
  myAjax.myAjax(fileName, sendData);
  
  selSummary();
  clearInputData();
  $("#save__button").prop("disabled", true);
});
$(document).on("click", "#update__button", function () {
  var data = getInputData();
  var fileName = "UpdateInputData.php";
  sendData = data;
  myAjax.myAjax(fileName, sendData);
  
  selSummary();
  clearInputData();
  $("#update__button").prop("disabled", true);
});

function getInputData() {
  let inputData = new Object();
  let dt = new Date();
  inputData["created_at"] =
    dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();

  if ($(".save-data").hasClass("complete-input")) {
    $("input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $("select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  }
  inputData["targetId"] = $("#selected__tr").find("td").eq(0).html();

  return inputData;
};

function clearInputData() {
  $("input.save-data")
    .val("")
    .removeClass("complete-input")
    .addClass("no-input");
  $("input.need-clear").val("");
  $("select.need-clear")
    .val(0)
    .removeClass("complete-input")
    .addClass("no-input");
  $("#ram-values__table tbody .not-required")
    .removeClass("no-input")
    .addClass("complete-input");
  $("label").html("");
};

function Color() {
  var table, tr, td, tdod, tdok, txtod, txtok, i, diff;
  table = document.getElementById("summary__table");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[9];
    tp = tr[i].getElementsByTagName("td")[11];
    if (td) {
      txttd = Number(td.innerText.replace(",", ""));
      txttp = Number(tp.innerText.replace(",", ""));
      if (txttd >= 0) {
        table.rows[i].cells[9].style.backgroundColor = "#ffa1bd";
      } else {
        table.rows[i].cells[9].style.backgroundColor = "#d1fff9";
      }
      if (txttp > 0) {
        table.rows[i].cells[11].style.backgroundColor = "#ffa1bd";
      }
    }
  }
}