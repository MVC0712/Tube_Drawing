let deleteDialog = document.getElementById("delete__dialog");
let inputData = new Object();
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
      .fail(function () {
        alert("DB connect error");
      });
  },
};

$(function () {
  makeSummaryTable();
});
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
      var newTr = $("<tr>");
      Object.keys(trVal).forEach(function(tdVal) {
        if (tdVal == "product_dim") {
          $("<td>").append(makeDimSel(trVal[tdVal])).appendTo(newTr);
        }else if (tdVal == "product_type") {
              $("<td>").append(makeMaterialSel(trVal[tdVal])).appendTo(newTr);
        } else if (tdVal == "product_date") {
            $("<td>").append(makeDatePlan(trVal[tdVal])).appendTo(newTr);
        } else if ((tdVal == "code")||(tdVal == "extrusion_scrap")||
                (tdVal == "casting_scrap")||(tdVal == "aluminium_ingot")||
                (tdVal == "aluminium_orther")) {
            $("<td>").append(makeInput(trVal[tdVal])).appendTo(newTr);
        } else {
            $("<td>").html(trVal[tdVal]).appendTo(newTr);
        }
      });
      $(newTr).appendTo(tbodyDom);
  });
};
function makeMaterialSel(seletedId) {
  let targetDom = $("<select>");
  fileName = "SelMaterialType.php";
  sendData = {
    dummy: "dummy",
  };
  myAjax.myAjax(fileName, sendData);
  ajaxReturnData.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["material_type"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["material_type"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
};
function makeDimSel(seletedId) {
  let targetDom = $("<select>");
  var dim=[{
                "id": 1,
                "dim": "9 inch"
            },
            {
                "id": 2,
                "dim": "14 inch"
            }];
dim.forEach(function(element) {
      if (element["id"] == seletedId) {
          $("<option>")
              .html(element["dim"])
              .val(element["id"])
              .prop("selected", true)
              .appendTo(targetDom);
      } else {
          $("<option>")
              .html(element["dim"])
              .val(element["id"])
              .appendTo(targetDom);
      }
  });
  return targetDom;
}
function makeDatePlan(datePlan) {
  let targetDom = $("<input>");
  targetDom.attr("type", "date");
  targetDom.val(datePlan);
  return targetDom;
}
function makeInput(qty) {
  let targetDom = $("<input>");
  targetDom.attr("type", "text");
  targetDom.val(qty);
  return targetDom;
}
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
    // putDataToInput(ajaxReturnData);
  } else {
    // deleteDialog.showModal();
  }
  $("#save").attr("disabled", true);
  $("#print").attr("disabled", false);
  $("#print__button").attr("disabled", false);
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
});
$(document).on("change", "#product_date", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("keyup", "#code", function() {
  $(this).val($(this).val().toUpperCase());
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "#product_type", function() {
  if ($(this).val() != 0) {
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
function getInputData() {
  let inputData = new Object();
    $(".top__wrapper input.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
    $(".top__wrapper select.save-data").each(function (index, element) {
      inputData[$(this).attr("id")] = $(this).val();
    });
  return inputData;
};
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
};
$(document).on("click", "#save", function () {
  fileName = "InsData.php";
  inputData = getInputData();
  sendData = inputData;
  myAjax.myAjax(fileName, sendData);
  clearInputData();
  makeSummaryTable();
  $("#save").attr("disabled", true);
});
function checkInput() {
  let check = true;
  $(".top__wrapper input .check").each(function() {
    if ($(this).val() == "") {
      check = false;
    }
  });
  $(".top__wrapper select").each(function() {
    if ($(this).val() == 0) {
      check = false;
    }
  });
  if ($("#summary_table tbody tr").hasClass("selected-record")) {
    check = false;
  }
  if (check) {
    $("#save").attr("disabled", false);
  } else {
    $("#save").attr("disabled", true);
  } 
};
$(document).on("click", "#print", function() {
  ajaxSelForExcel($("#selected__tr").find("td").eq(0).html());
});
function ajaxSelForExcel(targetId) {
  $.ajax({
    type: "POST",
    url: "./php/SelForExcel.php",
    dataType: "json",
    async: false,
    data: {
      targetId: targetId,
    },
  }).done(function(data) {
    ajaxPyMakeExcelFile(data);
  }).fail(function() {
    alert("DB connect error");
  });
}
function ajaxPyMakeExcelFile(inputData) {
  let data = new Object();
  let donwloadFileName;
  data = inputData[0];
  donwloadFileName = data["product_date"] + "_" + data["code"] + "_" + data["material_type"] + ".xlsx";   
  let JSONdata = JSON.stringify(data);

  $.ajax({
    async: false,
    url: "./py/MakeExcelFile.py",
    type: "post",
    data: JSONdata,
    dataType: "json",
  }).done(function(a) {
    console.log(a);
    downloadExcelFile(donwloadFileName);
  }).fail(function(e) {
    alert("Tải file thất bại");
  });
}
function downloadExcelFile(donwloadFileName) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = donwloadFileName;
  a.href = "/../../Billet_Casting/FileDownLoad/ExcelFile/" + donwloadFileName;
  a.click();
  a.remove();
}
function caculating() {
  let exd_scrap = $("#extrusion_scrap").val();
  let cast_scrap = $("#casting_scrap").val();
  let al_ingot = $("#aluminium_ingot").val();
  let al_orther = $("#aluminium_other").val();
  let total_weight = exd_scrap + cast_scrap + al_ingot + al_orther;
  let al_degas = 1000;
  let al_filter = 250;
  let al_table = total_weight - al_degas - al_filter;
}
$(document).on("change", "#summary_table tbody tr", function () {
  let sendData = new Object();
  let fileName;
  fileName = "UpdateData.php";
  sendData = {
    targetId : $("#selected__tr td:nth-child(1)").html(),
    product_date : $("#selected__tr td:nth-child(2) input").val(),
    product_dim: $("#selected__tr td:nth-child(3) select").val(),
    product_type: $("#selected__tr td:nth-child(4) select").val(),
    code: $("#selected__tr td:nth-child(5) input").val(),
    extrusion_scrap : $("#selected__tr td:nth-child(6) input").val(),
    casting_scrap: $("#selected__tr td:nth-child(7) input").val(),
    aluminium_ingot : $("#selected__tr td:nth-child(8) input").val(),
    aluminium_orther : $("#selected__tr td:nth-child(9) input").val(),
  };
  console.log(sendData);
  myAjax.myAjax(fileName, sendData);
});

$(function(){
	$('#print__button').click(function(){
		var fileName = "SelForPrint.php";
		var sendData = {
			id: $("#selected__tr").find("td").eq(0).html()
		};
		myAjax.myAjax(fileName, sendData);

		var product_date = ajaxReturnData[0].product_date;
		var dimention = ajaxReturnData[0].dimention;
		var material_type = ajaxReturnData[0].material_type;
		var code = ajaxReturnData[0].code;
		var extrusion_scrap = ajaxReturnData[0].extrusion_scrap;
		var casting_scrap = ajaxReturnData[0].casting_scrap;
		var aluminium_ingot = ajaxReturnData[0].aluminium_ingot;
		var aluminium_orther = ajaxReturnData[0].aluminium_orther;
		var si = ajaxReturnData[0].si;
		var mg = ajaxReturnData[0].mg;
		var mn = ajaxReturnData[0].mn;
		var cr = ajaxReturnData[0].cr;
		var cu = ajaxReturnData[0].cu;
		var fe = ajaxReturnData[0].fe;
		var zn = ajaxReturnData[0].zn;
		var ti_b = ajaxReturnData[0].ti_b;

		var _el = $('<div>');
		var page = `
		<style>
      body {
        margin: 0;
        padding: 0;
        background-color: #FAFAFA;
        font: 12pt "Tahoma";
        width: 21cm;
        height: 29.7cm;
      }
      * {
        box-sizing: border-box;
        -moz-box-sizing: border-box;
      }
      .page {
        width: 21cm;
        min-height: 29.7cm;
        border: 1px #D3D3D3 solid;
        border-radius: 5px;
        background: white;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
      }
      @page {
        size: A4;
        margin: 0;
      }
      @media print {
        * { overflow: visible !important; } 
        .page {
            margin: 0;
            border: initial;
            border-radius: initial;
            width: initial;
            min-height: initial;
            box-shadow: initial;
            background: initial;
            page-break-after: always;
        }
      }
      .dp-f {
        display: flex;
      }
      .fd-c {
        flex-direction: column;
      }
      .fd-r {
        flex-direction: row;
      }
      .bd {
        border: solid 1px black;
      }
      .fw {
        width: 100%;
      }
      .fh {
        height: 29.7cm;
      }
      .t-ct {
        text-align: center;
      }
      tr {
        font-size: xx-small;      }
      table {
        padding: 0;
        margin: 0;
        border-spacing: 0;
        border-right: 1px solid black;
      }
      tr, td {
        padding: 0;
        margin: 0;
        border-spacing: 0;
        text-align: center;
        border-bottom: 1px solid black;
        border-left: 1px solid black;
      }

		</style>
    <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>In giấy báo cáo lò ${code}</title>
  </head>
    <div class="page dp-f fd-r fh">
      <div style="height: 100%; width: 5%;"></div>
      <div class="dp-f fd-c fh" style="width: 95%;">
        <div style="height: 2%"></div>
      <div class="dp-f fd-r bd fw" style="height: 3%">
        <div class="t-ct" style="font-size:x-large; width: 80%; height: 100%">
          SẢN XUẤT ĐÚC BILLET
        </div>
        <div class="t-ct" style="font-size:x-large; width: 20%">
        ${code}
        </div>
      </div>
      <div class="abd dp-f fw" style="height: 3%; width: 100%;">
        <table style="height: 100%; width: 100%">
          <!-- <tr>
            <td colspan="10">1. Yêu cầu trong sản xuất: </td>
          </tr> -->
          <tr>
            <td rowspan="2" style="width: 70px;">1. Yêu cầu trong sản xuất: </td>
            <td>Vật liệu</td>
            <td>Đường kính</td>
            <td>Mã sản xuất</td>
            <td>Ngày sản xuất</td>
            <td>Phế liệu đùn</td>
            <td>Phế liệu đúc</td>
            <td>Nhôm AL99.7%</td>
            <td>TP khác</td>
          </tr>
          <tr>
            <td>${material_type}</td>
            <td>${dimention}</td>
            <td>${code}</td>
            <td>${product_date}</td>
            <td>${extrusion_scrap}</td>
            <td>${casting_scrap}</td>
            <td>${aluminium_ingot}</td>
            <td>${aluminium_orther}</td>
          </tr>
        </table>
      </div>
      <div class="abd fw" style="height: 3%">
        <table style="height: 100%; width: 100%">
          <!-- <tr>
            <td colspan="10">2. Chuẩn bị vật liệu thực tế (kg):</td>
          </tr> -->
          <tr>
            <td rowspan="2" style="width: 70px;">2. Chuẩn bị vật liệu thực tế (kg):</td>
            <td>Vật liệu</td>
            <td>Phế liệu  đùn ①</td>
            <td>Discard đùn ②</td>
            <td>SP lỗi, H/E billet ③</td>
            <td>Phế liệu đúc ④</td>
            <td>SP gia công NG ⑤</td>
            <td>Nhôm Al 99.7% ⑥</td>
            <td>Aluminum Alloy ⑦</td>
            <td>Vật liệu khác ⑧</td>
          </tr>
          <tr>
            <td>Kg</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="abd fw" style="height: 11%">
        <table style="height: 100%; width: 100%">
          <!-- <tr>
            <td colspan="10">3. Điều chỉnh thành phần hợp kim:</td>
          </tr> -->
          <tr>
            <td rowspan="10" style="width: 70px;">3. Điều chỉnh thành phần hợp kim:</td>
            <td rowspan="2">Tiêu chuẩn (%)</td>
            <td>Al-Cu (%Cu)</td>
            <td>Al-Si (%Si)</td>
            <td>Mg (%Mg)</td>
            <td>Al-Zn (%Zn)</td>
            <td>Al-Fe (%Fe)</td>
            <td>Al-Mn (%Mn)</td>
            <td>Al-Cr (%Cr)</td>
            <td>Al-Ti-B (%B)</td>
            <td rowspan="2">Flux (1.5-3kg/tấn)</td>
          </tr>
          <tr style="height: 14%;">
            <td>${cu}</td>
            <td>${si}</td>
            <td>${mg}</td>
            <td>${zn}</td>
            <td>${fe}</td>
            <td>${mn}</td>
            <td>${cr}</td>
            <td>${ti_b}</td>
          </tr>
          <tr>
            <td>Đo lần 1 (%)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td rowspan="2"></td>
          </tr>
          <tr>
            <td>KLHK 1 (kg)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Đo lần 2 (%)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td rowspan="3"></td>
          </tr>
          <tr>
            <td>KLHK 2 (kg)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td>Đo lần 3 (%)</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="abd fw" style="height: 3%">
        <table style="height: 100%; width: 100%">
          <!-- <tr>
            <td colspan="10">4. Nung nhôm:</td>
          </tr> -->
          <tr style="height: 50%;">
            <td rowspan="2" style="width: 70px;">4. Nung nhôm:</td>
            <td>TG nung bắt đầu</td>
            <td>TG nung kết thúc</td>
            <td>Số gas bắt đầu</td>
            <td>Số gas kết thúc</td>
            <td>TG tinh luyện lần 1</td>
            <td>TG tinh luyện lần 2</td>
            <td>TG nghỉ</td>
            <td>Nhiệt độ nung</td>
          </tr>
          <tr style="height: 50%;">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="abd fw" style="height: 3%">
        <table style="height: 100%; width: 100%">
          <!-- <tr>
            <td colspan="10">5.Đúc:</td>
          </tr> -->
          <tr style="height: 50%;">
            <td rowspan="2" style="width: 70px;">5. Đúc:</td>
            <td>TG bắt đầu</td>
            <td>TG kết thúc</td>
            <td>T° nhôm (cửa lò): 780±10℃</td>
            <td>T° nhôm (máy đúc): 700±10℃</td>
            <td>T° nước làm mát: &le;50℃</td>
            <td>Tốc độ đúc: 80-100mm/min</td>
            <td>Áp lực khí</td>
            <td>Áp lực dầu</td>
          </tr>
          <tr style="height: 50%;">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
      <div class="abd fw" style="height: 3%">
        <table style="height: 100%; width: 100%">
          <tr>
            <td rowspan="2" style="width: 70px;">6. Hàm lượng Hidro:</td>
            <td rowspan="2" style="width: 140px;">Yêu cầu: Dưới 0.15ml/100gAL</td>
            <td rowspan="2" style="width: 60px; text-align: right;">Lần 1</td>
            <td style="height: 50%;"></td>
            <td rowspan="2" style="width: 60px; text-align: right;">Lần 2</td>
            <td style="height: 50%;"></td>
            <td rowspan="2" style="width: 60px; text-align: right;">Lần 3</td>
            <td style="height: 50%;"></td>
            <td rowspan="2" style="width: 60px; text-align: right;">Lần 4</td>
            <td style="height: 50%;"></td>
          </tr>
          <tr>
            <td style="height: 50%;"></td>
            <td style="height: 50%;"></td>
            <td style="height: 50%;"></td>
            <td style="height: 50%;"></td>
          </tr>
        </table>
      </div>
      <div class="abd fw dp-f fd-c" style="height: 27%">
        <!-- <div class="fw" style="text-align: center; height: 6%; margin-top: 1%;">
          BẢNG CHI TIẾT VẬT LIỆU
        </div> -->
        <div class="fw dp-f fd-r" style="height: 100%">
          <div class="abd" style="height: 100%; width: 70%">
            <table style="height: 100%; width: 100%">
              <tr>
                <td rowspan="20" style="width: 20px;">BẢNG CHI TIẾT KHỐI LƯỢNG VẬT LIỆU</td>
                <td style="width: 20px">Stt</td>
                <td style="width: 100px">Chủng loại VL</td>
                <td style="width: 100px">Số hiệu</td>
                <td style="width: 100px">Khối lượng</td>
                <td colspan="2">Ghi chú</td>
              </tr>
              <tr>
                <td>1</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>2</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>3</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>4</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>5</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>6</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>7</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>8</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>9</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>10</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>11</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>12</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>13</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>14</td>
                <td></td>
                <td></td>
                <td></td>
                <td colspan="2"></td>
              </tr>
              <tr>
                <td>15</td>
                <td></td>
                <td></td>
                <td></td>
                <td style="width: 100px;"></td>
                <td rowspan="2">Tổng khối lượng vật liệu</td>
              </tr>
              <tr>
                <td>16</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>17</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td rowspan="2"></td>
              </tr>
              <tr>
                <td>18</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </table>
          </div>
          <div class="abd dp-f fd-c" style="height: 100%; width: 30%">
            <div class="abd" style="height: 60%; width: 100%; font-size: xx-small; border-bottom: 1px solid black; border-left: 1px solid black; border-right: 1px solid black;">
              Ghi chú:
            </div>
            <div style="height: 40%; width: 100%">
              <table style="height: 100%; width: 100%">
                <tr style="height: 14%;"><td colspan="3">Phế phẩm</td></tr>
                <tr style="height: 14%;">
                  <td style="width: 33%">Xỉ</td>
                  <td style="width: 33%">Nhôm dư</td>
                  <td style="width: 33%">Cắt</td>
                </tr>
                <tr style="height: 14%;"><td></td><td></td><td></td></tr>
                <tr style="height: 14%;"><td></td><td></td><td></td></tr>
                <tr style="height: 14%;"><td></td><td></td><td></td></tr>
                <tr style="height: 14%;"><td></td><td></td><td></td></tr>
                <tr style="height: 14%;"><td></td><td></td><td></td></tr>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="abd fw dp-f fd-c" style="height: 22%">
        <!-- <div lass="fw" style="text-align: center;">
          ĐÁNH GIÁ CHẤT LƯỢNG VÀ CẮT
        </div> -->
        <!-- <div class="abd dp-f fd-c" style="height: 100%; width: 100%"> -->
          <table style="height: 100%; width: 100%;">
            <tr>
              <td rowspan="20" style="width: 20px;">ĐÁNH GIÁ CHẤT LƯỢNG VÀ CẮT</td>
              <td rowspan=2 style="width: 50px;">Hạng mục kiểm tra</td>
              <td rowspan=2 style="width: 50px;">Dụng cụ đo đạc</td>
              <td rowspan=2 style="width: 40px;">Vị trí</td>
              <td colspan="13">Vị trí trên bàn đúc</td>
            </tr>
            <tr>
              <td>A2</td>
              <td>A3</td>
              <td>B1</td>
              <td>B2</td>
              <td>B3</td>
              <td>B4</td>
              <td>C1</td>
              <td>C2</td>
              <td>C3</td>
              <td>C4</td>
              <td>D2</td>
              <td>D3</td>
              <td>Ghi chú</td>
            </tr>
            <tr>
              <td rowspan=2>Vết nứt</td>
              <td rowspan=2>Máy dò lỗi</td>
              <td>Đầu</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td rowspan="15"></td>
            </tr>
            <tr>
              <td>Đuôi</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Bề mặt</td>
              <td>Bằng mắt</td>
              <td>-</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cong</td>
              <td>Bằng mắt</td>
              <td>-</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Độ dài</td>
              <td>Thước</td>
              <td>-</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowspan=2>Tính toán trước cắt</td>
              <td rowspan=2>-</td>
              <td>1200</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>600</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr style="height: 24px;">
              <td>Thứ tự cắt</td>
              <td>-</td>
              <td>-</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowspan=2>Số lượng sản phẩm</td>
              <td rowspan=2>Thanh</td>
              <td>1200</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>600</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowspan=2>Ngâm kiềm</td>
              <td rowspan=2>NaOH</td>
              <td>Đầu</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Cuối</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        <!-- </div> -->
      </div>
      <div class="abd fw dp-f fd-c" style="height: 18%">
        <!-- <div class="fw" style="text-align: center; height: 10%">
          SỐ LƯỢNG NHẬP KHO
        </div> -->
        <div class="abd dp-f fd-r" style="height: 100%; width: 100%">
          <table>
            <tr><td rowspan="20" style="width: 20px;">SỐ LƯỢNG NHẬP KHO</td></tr>
          </table>
          <table style="height: 100%; width: 25%">
            <tr>
              <td>Lot</td>
              <td style="width: 50px;">Bundle</td>
              <td style="width: 50px;">Billet</td>
              <td style="width: 40px;">SL</td>
            </tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
          </table>
          <table style="height: 100%; width: 25%">
            <tr>
              <td>Lot</td>
              <td style="width: 50px;">Bundle</td>
              <td style="width: 50px;">Billet</td>
              <td style="width: 40px;">SL</td>
            </tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
          </table>
          <table style="height: 100%; width: 25%">
            <tr>
              <td>Lot</td>
              <td style="width: 50px;">Bundle</td>
              <td style="width: 50px;">Billet</td>
              <td style="width: 40px;">SL</td>
            </tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
          </table>
          <table style="height: 100%; width: 25%">
            <tr>
              <td>Lot</td>
              <td style="width: 50px;">Bundle</td>
              <td style="width: 50px;">Billet</td>
              <td style="width: 40px;">SL</td>
            </tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
            <tr><td>${code}</td><td></td><td></td><td></td></tr>
          </table>
        </div>
      </div>
      <div style="height: 1%"></div>
    </div>
    <div style="height: 100%; width: 2%;"></div>
		</div>`
    
		_el.append(page);
		var nw = window.open("","","width=1200,height=900,left=250,location=no,titlebar=yes")
			nw.document.write(_el.html())
			nw.document.close()
		setTimeout(() => {
			nw.print()
			setTimeout(() => {
			nw.close()
			}, 200);
		}, 500);
	})
});