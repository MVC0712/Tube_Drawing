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
		var fileName = "SelForPrintPage.php";
		var sendData = {
			targetId: $("#selected__tr").find("td").eq(0).html(),
		};
		// myAjax.myAjax(fileName, sendData);
		var die_number = 1;
		var production_number = 2;
		var plan_date_at = 3;
		var pressing_type = 4;
		var press_lengthth = 5;
		var production_length = 6;
        var aging = 7;
        var material = 8;
		var specific_weight = 9;
		var ratio = 10;
		var nbn = 11;
		var previous_press_note = 12;
		var staff_name = 13;
        var issue_date = 14;
		var plan_pressing_time = 15;
		var billet_input_quantity = 16;
		var billet_length = 17;
		var discard_thickness = 18;
        var ram_speed = 19;
		var work_speed2 = 20;
		var work_speed = 21;
		var billet_temperature = 22;
		var billet_taper_heating = 23;
        var billet_t = 24;
		var die_temperature = 25;
        var die_heating_time = 26;
		var stretch_ratio = 27;
		var cooling_type = 28;
		var billet_size = 29;
		var bolster_name = 30;
        var die_diamater = 31;
		var die_ring = 32;
        var value_l = 33;
		var value_m = 34;
		var value_n = 35;
        var cut = 36;
		var hole = 37;
		var press_machine = 38;
		var die_note = 39;
		var plan_note = 40;

		var h = 41;
		var a = 42;
		var b = 43;
		var c = 44;
		var d = 45;
		var e = 46;
		var f = 47;
		var i = 48;
		var k = 49;
		var end = 50;
		
		var prsTimePL = 51;

        let pullerF;
        if(52 >= 20) {
            pullerF = 140;
        } else if((12 <= 52) && (52 < 20)) {
            pullerF = 120;
        } else if((5 <= 52) && (52 < 12)) {
            pullerF = 90;
        } else if((3 <= 52) && (52 < 5)) {
            pullerF = 70;
        } else if(52 < 3) {
            pullerF = 50;
        }

		var _el = $('<div>');
		var page = `    <style>
        body {
          margin: 0;
          padding: 0;
          background-color: #FAFAFA;
          font: "Tahoma";
          width: 21cm;
          height: 29.7cm;
        //   border: solid 1px black;
          font-size: 8px;
        }
        * {
          box-sizing: border-box;
          -moz-box-sizing: border-box;
          font-size: 8px;
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
          height: 15px;
        }
        table {
          padding: 0;
          margin: 0;
          border-spacing: 0;
          border-top: 1px solid black;
          border-right: 1px solid black;
        }
        td, th {
          padding: 0;
          margin: 0;
          border-spacing: 0;
          text-align: center;
          border-bottom: 1px solid black;
          border-left: 1px solid black;
        }
        tr, td, th {
            padding: 0;
            margin: 0;
            border-spacing: 0;
            text-align: center;
          }  
          </style>
  
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Phiếu đùn ngày ${plan_date_at}-${die_number}</title>
  </head>
  
  <div style="width : 100%; height: 100%; display: flex; flex-direction: row;">
  <div style="width : 5%; height: 100%;">
  </div>
  <div style="width : 93%; height: 100%; display: flex; flex-direction: column;">
  <div style="height : 1.5%; width: 100%;"></div>
  <div style="width: 100%; height: 2%; display: flex; border: none; flex-direction: row; justify-content: space-evenly; margin-top : 0px; font-size:large;">
      <img src="../../../diereport/Tube_Drawing/Lib/logo.png" style="width : auto; height : 100%; ">
      <h3 style="width: auto; height: 100%; border: none; padding: 0; margin: 0; font-size: 20px;">PHIẾU THÔNG TIN SẢN XUẤT</h3>
  </div>
  <div style="width : 100%; height: 96%; display: flex; flex-direction: column;">
    <div style="width : 100%; height: 100%; display: flex;">
          <div style="width: 34%; height: 100%; display:flex; flex-direction:column; margin-right: 10px">
            <table style="overflow: auto; width : auto; margin-top: 5px;">
              <tbody style="overflow: auto; height: auto;">
                  <tr>
                      <td>Ngày tạo phiếu</td>
                      <td style="width: 60%;"></td>
                  </tr>
                  <tr>
                      <td>Người tạo phiếu</td>
                      <td style="width: 60%;"></td>
                  </tr>
              </tbody>
          </table>
          <table style="overflow: auto; width : auto; margin-top: 5px;">
            <tbody style="overflow: auto; height: auto;">
                <tr>
                    <td>Mã sản phẩm</td>
                    <td style="width: 35%;" colspan="2"></td>
                </tr>
                <tr>
                    <td>Khuôn kéo (Dies)</td>
                    <td style="width: 45%;"></td>
                    <td style="width: 30%;">Đã BT&#160&#160&#160&#160&#160&#160 Chưa BT</td>
                </tr>
                <tr>
                  <td>Lõi kéo (Plug)</td>
                  <td style="width: 45%;"></td>
                  <td style="width: 30%;">Đã BT&#160&#160&#160&#160&#160&#160 Chưa BT</td>
              </tr>
            </tbody>
          </table>
              <table style="overflow: auto; width : auto; margin-top: 5px;">
                  <thead>
                      <tr>
                          <th style="width: 80px;">Ngày đùn</th>
                          <th style="width: 80px;">Mã số rack</th>
                          <th style="width: 80px;">Số lượng</th>
                          <th style="width: 100px;">Ghi chú</th>
                      </tr>
                  </thead>
                  <tbody style="overflow: auto; height: auto;">
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                      <tr style="height: 15px">
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 80px;"></td>
                          <td style="width: 100px;"></td>
                      </tr>
                  </tbody>
                </table>
                <table style="overflow: auto; width : auto; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th colspan="5">Kích thước</th>
                        </tr>
                    </thead>
                    <tbody style="overflow: auto; height: auto;">
                        <tr style="height: 15px">
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;">Trước kéo</td>
                            <td style="width: 25%;">Sau kéo</td>
                            <td style="width: 25%;">Đơn vị</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Chiều dài SP</td>
                            <td></td>
                            <td></td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Đường kính ngoài</td>
                            <td></td>
                            <td></td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Đường kính trong</td>
                            <td></td>
                            <td></td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Độ dày</td>
                            <td></td>
                            <td></td>
                            <td>mm</td>
                        </tr>
                    </tbody>
                  </table>
                  <table style="overflow: auto; width : auto; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th colspan="5">Điều chỉnh khuôn</th>
                        </tr>
                    </thead>
                    <tbody style="overflow: auto; height: auto;">
                        <tr style="height: 15px">
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;">Giá trị chuẩn</td>
                            <td style="width: 25%;">Điều chỉnh lần 1</td>
                            <td style="width: 25%;">Điều chỉnh lần 2</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông A</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông B</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông C</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông D</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                  </table>
                  <table style="overflow: auto; width : auto; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th colspan="5">Bóp ống</th>
                        </tr>
                    </thead>
                    <tbody style="overflow: auto; height: auto;">
                        <tr style="height: 15px">
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;">Giá trị chuẩn</td>
                            <td style="width: 25%;">Thực tế</td>
                            <td style="width: 25%;">Ghi chú</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Chiều cao băng tải</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Kích thước bóp ống</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Áp suất bóp ống</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Ngàm kẹp</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                  </table>
                  <table style="overflow: auto; width : auto; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th colspan="5">Tốc độ kéo</th>
                        </tr>
                    </thead>
                    <tbody style="overflow: auto; height: auto;">
                        <tr style="height: 15px">
                            <td style="width: 25%;">Phân cấp TĐ</td>
                            <td style="width: 25%;">Thiết lập</td>
                            <td style="width: 25%;">Thực tế</td>
                            <td style="width: 25%;">Đơn vị</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ ban đầu</td>
                            <td></td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ kéo chính</td>
                            <td></td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ kết thúc</td>
                            <td></td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ đầu đẩy</td>
                            <td></td>
                            <td></td>
                            <td>%</td>
                        </tr>
                        <tr style="height: 15px">
                          <td>Lực kéo</td>
                          <td></td>
                          <td></td>
                          <td>kN</td>
                      </tr>
                    </tbody>
                  </table>
                  <table style="overflow: auto; width : auto; margin-top: 5px;">
                    <thead>
                        <tr>
                            <th colspan="5">Chỉnh thẳng sau cắt</th>
                        </tr>
                    </thead>
                    <tbody style="overflow: auto; height: auto;">
                        <tr style="height: 15px">
                            <td style="width: 25%;"></td>
                            <td style="width: 25%;">Thiết lập</td>
                            <td style="width: 25%;">Thực tế</td>
                            <td style="width: 25%;">Đơn vị</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Loại máy</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Độ nghiêng con lăn</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Khoảng cách</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ quay</td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                  </table>
              <div style="display:flex; flex-direction: row;">
            </div>
            <div style="width: 100%; height: 225px; margin-top: 5px; border: 1px solid rgb(0, 0, 0); font-size: 12px">
                Ghi chú: ${plan_note}
            </div>
          </div>
          <div style="width: 66%; height: 100%; margin-top: 5px;">
            <table style="overflow: auto; width : 100%;">
              <tbody style="overflow: auto; height: auto;">
                  <tr style="height: 15px">
                    <td style="width: 25%;">Ngày sản xuất</td>
                    <td style="width: 25%;"></td>
                    <td style="width: 25%;">Chiều dài cắt</td>
                    <td style="width: 25%;"></td>
                  </tr>
                  <tr style="height: 15px">
                    <td>Nhân viên kéo</td>
                    <td></td>
                    <td>Cắt mẫu</td>
                    <td></td>
                  </tr>
                  <tr style="height: 15px">
                    <td>Mục đíc sản xuất</td>
                    <td></td>
                    <td>Chiều dài mẫu</td>
                    <td></td>
                  </tr>
                  <tr style="height: 15px">
                    <td>Ngày cắt</td>
                    <td></td>
                    <td>Số lượng mẫu</td>
                    <td></td>
                  </tr>
                <tr style="height: 15px">
                  <td>Nhân viên cắt</td>
                  <td></td>
                  <td>Độ cong</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
            <table style="overflow: auto; width : auto; margin-top: 5px;">
              <thead>
                <tr>
                  <th style="width: 15px;">Stt</th>
                  <th style="width: 40px;">Độ nhám Rz=2µm</th>
                  <th style="width: 40px;">Độ nhám Rz=5µm</th>
                  <th style="width: 40px;">Diemark 10µm</th>
                  <th style="width: 40px;">TG gián đoạn</th>
                  <th style="width: 35px;">Nguyên nhân</th>
                  <th style="width: 30px;">Thành phẩm</th>
                  <th style="width: 30px;">Phế phẩm</th>
                  <th style="width: 40px;">Y: mm</th>
                  <th style="width: 40px;">X: mm</th>
                  <th style="width: 40px;">Chỉnh thẳng</th>
                  <th style="width: 15px;"></th>
                  <th style="width: 15px;"></th>
                  <th style="width: 15px;"></th>
                  <th style="width: 15px;"></th>
                  <th style="width: 15px;"></th>
                  <th style="width: 15px;"></th>
                </tr>
              </thead>
              ${makeTable()}
            </table>
          </div>
      </div>
  </div>
  </div>
  <div style="width : 1%; height: 100%;">
  </div>
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

function makeTable() {
	var tbd = ``;
    var tr = ``;
	var trC = `<tbody style="height: 100%; overflow: hidden;">`;
	for (i = 1; i <= 65; ++i) {
		tr=`<tr style="height: 14.8px">
                <td font-size: 8px;">${i}</td>
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
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>`;
		tbd += tr;
	}
    // console.log(trC + tbd + "</tbody>");
	return trC + tbd + "</tbody>";
};