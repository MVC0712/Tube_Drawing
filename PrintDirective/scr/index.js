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

makeSummaryTable();
selStaff();
SelProductionNumber();
SelDrawingType();

function SelDrawingType() {
  var fileName = "SelDrawingType.php";
  var sendData = {
  };
  myAjax.myAjax(fileName, sendData);
  $("#drawing_type_id option").remove();
  $("#drawing_type_id").append($("<option>").val(0).html("NO"));
  ajaxReturnData.forEach(function(value) {
      $("#drawing_type_id").append(
          $("<option>").val(value["id"]).html(value["drawing_type"])
      );
  });
};
function selStaff() {
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
          $("<option>").val(value["id"] + "-" + value["ex_production_numbers_id"]).html(value["production_number"])
      );
  });
  SelDies();
  SelPlugs();
};
function separateString(deviceString, position) {
  const deviceParts = deviceString.split("-");
  return deviceParts[position - 1];
};
function SelDies() {
  if($("#production_number_id").val() != 0) {
    var fileName = "SelDies.php";
    var sendData = {
      ex_production_numbers_id: separateString($("#production_number_id").val(), 2),
    };
    myAjax.myAjax(fileName, sendData);
    $("#die_number_id option").remove();
    $("#die_number_id").append($("<option>").val(0).html("NO"));
    ajaxReturnData.forEach(function(value) {
        $("#die_number_id").append(
            $("<option>").val(value["id"]).html(value["die_number"])
        );
    });
  }
};
function SelPlugs() {
  if($("#production_number_id").val() != 0) {
    var fileName = "SelPlugs.php";
    var sendData = {
      ex_production_numbers_id: separateString($("#production_number_id").val(), 2),
    };
    myAjax.myAjax(fileName, sendData);
    $("#plug_number_id option").remove();
    $("#plug_number_id").append($("<option>").val(0).html("NO"));
    ajaxReturnData.forEach(function(value) {
        $("#plug_number_id").append(
            $("<option>").val(value["id"]).html(value["plug_number"])
        );
    });
  }
};
$(document).on("keyup", "#production_number", function() {
  SelProductionNumber();
});
$(document).on("change", "#production_number_id", function() {
  SelDies();
  SelPlugs();
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
  } else {
    // deleteDialog.showModal();
  }
  $("#save").attr("disabled", true);
  $("#print__button").attr("disabled", false);
  $(".save-data").each(function (index, element) {
    $(this).removeClass("no-input").addClass("complete-input");
  });
});
function putDataToInput(data) {
  data.forEach(function (trVal) {
    Object.keys(trVal).forEach(function (tdVal) {
      $("#" + tdVal).val(trVal[tdVal]);
    });
    SelDies();
    SelPlugs();
    $("#die_number_id").val(trVal["die_number_id"]); 
    $("#plug_number_id").val(trVal["plug_number_id"]); 
  });
  $("#file_url").html(data[0].file_url);
};
$(document).on("keyup change", "input.no-input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("keyup change", "input.complete-input", function() {
  if ($(this).val() != "") {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "select.no-input", function() {
  if ($(this).val() != 0) {
      $(this).removeClass("no-input").addClass("complete-input");
  } else {
      $(this).removeClass("complete-input").addClass("no-input");
  }
  checkInput();
});
$(document).on("change", "select.complete-input", function() {
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

$(function(){
	$('#print__button').click(function(){
		var fileName = "SelForExcel.php";
		var sendData = {
			targetId: $("#selected__tr").find("td").eq(0).html(),
		};
		myAjax.myAjax(fileName, sendData);

    var product_date = ajaxReturnData[0].product_date;
    var production_number = ajaxReturnData[0].production_number;
    var name = ajaxReturnData[0].name;
    var die_number = ajaxReturnData[0].die_number;
    var plug_number = ajaxReturnData[0].plug_number;
    var production_length = ajaxReturnData[0].production_length;
    var drawing_type = ajaxReturnData[0].drawing_type;
    var b_drawing_l = ajaxReturnData[0].b_drawing_l;
    var b_drawing_out_d = ajaxReturnData[0].b_drawing_out_d;
    var b_drawing_in_d = ajaxReturnData[0].b_drawing_in_d;
    var b_drawing_t = ajaxReturnData[0].b_drawing_t;
    var a_drawing_l = ajaxReturnData[0].a_drawing_l;
    var a_drawing_out_d = ajaxReturnData[0].a_drawing_out_d;
    var a_drawing_in_d = ajaxReturnData[0].a_drawing_in_d;
    var a_drawing_t = ajaxReturnData[0].a_drawing_t;
    var conveyor_height = ajaxReturnData[0].conveyor_height;
    var compress_dim = ajaxReturnData[0].compress_dim;
    var compress_pressure = ajaxReturnData[0].compress_pressure;
    var clamp_pressure = ajaxReturnData[0].clamp_pressure;
    var start_pull_speed = ajaxReturnData[0].start_pull_speed;
    var main_pull_speed = ajaxReturnData[0].main_pull_speed;
    var end_pull_speed = ajaxReturnData[0].end_pull_speed;
    var pusher_speed = ajaxReturnData[0].pusher_speed;
    var puller_force = ajaxReturnData[0].puller_force;
    var straight = ajaxReturnData[0].straight;
    var angle = ajaxReturnData[0].angle;
    var roller_dis = ajaxReturnData[0].roller_dis;
    var roller_speed = ajaxReturnData[0].roller_speed;
    var curvature = ajaxReturnData[0].curvature;
    var buloong_a2 = ajaxReturnData[0].buloong_a2;
    var buloong_b2 = ajaxReturnData[0].buloong_b2;
    var buloong_c2 = ajaxReturnData[0].buloong_c2;
    var buloong_d2 = ajaxReturnData[0].buloong_d2;

    var sample_cut = production_length == 2000 ? "H:A:B:E" : "H:M:E";

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
    <title>Phiếu đùn ngày ${product_date}-${production_number}</title>
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
                      <td style="width: 60%;">${product_date}</td>
                  </tr>
                  <tr>
                      <td>Người tạo phiếu</td>
                      <td style="width: 60%;">${name}</td>
                  </tr>
              </tbody>
          </table>
          <table style="overflow: auto; width : auto; margin-top: 5px;">
            <tbody style="overflow: auto; height: auto;">
                <tr>
                    <td>Mã sản phẩm</td>
                    <td style="width: 35%;" colspan="2">${production_number}</td>
                </tr>
                <tr>
                    <td>Khuôn kéo (Dies)</td>
                    <td style="width: 45%;">${die_number}</td>
                    <td style="width: 30%;">Đã BT&#160&#160&#160&#160&#160&#160 Chưa BT</td>
                </tr>
                <tr>
                  <td>Lõi kéo (Plug)</td>
                  <td style="width: 45%;">${plug_number}</td>
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
                            <td>${b_drawing_l}</td>
                            <td>${a_drawing_l}</td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Đường kính ngoài</td>
                            <td>${b_drawing_out_d}</td>
                            <td>${a_drawing_out_d}</td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Đường kính trong</td>
                            <td>${b_drawing_in_d}</td>
                            <td>${a_drawing_in_d}</td>
                            <td>mm</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Độ dày</td>
                            <td>${b_drawing_t}</td>
                            <td>${a_drawing_t}</td>
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
                            <td>${buloong_a2}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông B</td>
                            <td>${buloong_b2}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông C</td>
                            <td>${buloong_c2}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Bu-lông D</td>
                            <td>${buloong_d2}</td>
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
                            <td>${conveyor_height}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Kích thước bóp ống</td>
                            <td>${compress_dim}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Áp suất bóp ống</td>
                            <td>${compress_pressure}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Ngàm kẹp</td>
                            <td>${clamp_pressure}</td>
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
                            <td>${start_pull_speed}</td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ kéo chính</td>
                            <td>${main_pull_speed}</td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ kết thúc</td>
                            <td>${end_pull_speed}</td>
                            <td></td>
                            <td>m/min</td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ đầu đẩy</td>
                            <td>${pusher_speed}</td>
                            <td></td>
                            <td>%</td>
                        </tr>
                        <tr style="height: 15px">
                          <td>Lực kéo</td>
                          <td>${puller_force}</td>
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
                            <td>${straight}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Độ nghiêng con lăn</td>
                            <td>${angle}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Khoảng cách</td>
                            <td>${roller_dis}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr style="height: 15px">
                            <td>Tốc độ quay</td>
                            <td>${roller_speed}</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                  </table>
              <div style="display:flex; flex-direction: row;">
            </div>
            <div style="width: 100%; height: 225px; margin-top: 5px; border: 1px solid rgb(0, 0, 0); font-size: 12px">
                Ghi chú: 
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
                    <td>${sample_cut}</td>
                  </tr>
                  <tr style="height: 15px">
                    <td>Mục đíc sản xuất</td>
                    <td>${drawing_type}</td>
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
                  <td>${curvature}/${production_length} mm</td>
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
                  <th style="width: 40px;">Y: ${curvature} mm</th>
                  <th style="width: 40px;">X: ${curvature} mm</th>
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
