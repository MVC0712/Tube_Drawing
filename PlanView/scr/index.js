let ajaxReturnData;
let ajaxReturnData1;
let ajaxReturnData2;
let ctx = document.getElementById('chart_area').getContext('2d');
let chart = null;
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
const getTwoDigits = (value) => value < 10 ? `0${value}` : value;
const getDateTime = (date) => {
    const day = getTwoDigits(date.getDate());
    const month = getTwoDigits(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = getTwoDigits(date.getHours());
    const mins = getTwoDigits(date.getMinutes());
    return `${year}-${month}-${day} ${hours}:${mins}:00`;
};
const getDate = (date) => {
  const day = getTwoDigits(date.getDate());
  const month = getTwoDigits(date.getMonth() + 1);
  const year = date.getFullYear();
  return `${day}-${month}`;
}
$(function() {
  var now = new Date();
  var MonthLastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  var MonthFirstDate = new Date(now.getFullYear(), (now.getMonth() + 12) % 12, 1);
  var formatDateComponent = function(dateComponent) {
    return (dateComponent < 10 ? '0' : '') + dateComponent;
  };
  var formatDate = function(date) {
    return date.getFullYear()  + '-' + formatDateComponent(date.getMonth() + 1) + '-' + formatDateComponent(date.getDate()) ;
  };
  var a = formatDate(MonthFirstDate);
  var b = formatDate(MonthLastDate);
  $("#std").val(a);
  $("#end").val(b);
});
function round(num, decimalPlaces = 0) {
  num = Math.round(num + "e" + decimalPlaces);
  return Number(num + "e" + -decimalPlaces);
}
function makeSummaryTable() {
    var fileName = "SelSummary.php";
    var sendObj = new Object();
    sendObj["start_s"] = $('#std').val();
    sendObj["end_s"] = $("#end").val();
    myAjax.myAjax(fileName, sendObj);
    fillTableBody(ajaxReturnData, $("#summary__table tbody"));
    // Total();
    // drawChart();
}
function fillTableBody(data, tbodyDom) {
  $(tbodyDom).empty();
  for (var i = 0; i < data.length -1; i++) {
    var newTr = $("<tr>");
    var newTrr = $("<tr>");
      if ((data[i]).idd==data[i+1].idd) {
        for (const a in data[i]) {
          $("<td>").html(data[i][a]).appendTo(newTr);
        }
        for (const a in data[i+1]) {
          $("<td>").html(data[i+1][a]).appendTo(newTrr);
        }
        i++;
      } else {
      }
    $(newTr).appendTo(tbodyDom);
    $(newTrr).appendTo(tbodyDom);
  }
}
$(document).on("click", "#summary__table tbody tr", function(e) {
    $(this).parent().find("tr").removeClass("selected-record");
    $(this).addClass("selected-record");
});
$(document).on("click", "#summary__table tbody td", function(e) {
  if (!$(this).hasClass("active")) {
    $("td").removeClass("active");
    $(this).addClass("active");
  } else {
    $("td").removeClass("active");
  }
});
$(document).on("change", "#std", function() {
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
    makeSummaryTable();
    deleteChart(chart);
    drawChart();
});
$(document).on("change", "#end", function() {
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
    makeSummaryTable();
    deleteChart(chart);
    drawChart();
});
$(function() {
    renderHead($('div#table'), new Date($("#std").val()), new Date($("#end").val()));
    makeSummaryTable();
    deleteChart(chart);
    drawChart();
});
var weekday = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var months = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
function renderHead(div, start, end) {
    var c_year = start.getFullYear();
    var r_year = "<tr> <th rowspan='4' style ='width: 45px;'>Value</th> ";
    var r_year1 = "<tr style='display:none;'><th style='display:none;'></th><th style='display:none;'></th>";
    var daysInYear = 0;

    var c_month = start.getMonth();
    var r_month = "<tr>";
    var r_month1 = "<tr style='display:none;'><th style='display:none;'></th><th style='display:none;'></th>";
    var daysInMonth = 0;

    var r_days = "<tr><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th>";
    var r_days2 = "<tr><th style='display:none;'></th><th style='display:none;'></th><th style='display:none;'></th>";
    for (start; start <= end; start.setDate(start.getDate() + 1)) {
        if (start.getFullYear() !== c_year) {
            r_year += '<th colspan="' + daysInYear + '">' + c_year + '</th>';
            c_year = start.getFullYear();
            daysInYear = 0;
        }
        daysInYear++;
        if (start.getMonth() !== c_month) {
            r_month += '<th colspan="' + daysInMonth + '">' + months[c_month] + '</th>';
            c_month = start.getMonth();
            daysInMonth = 0;
        }
        daysInMonth++;

        r_days += '<th>' + start.getDate() + '</th>';
        r_days2 += '<th>' + weekday[start.getDay()] + '</th>';
        r_month1 += '<th>' + months[c_month] + '</th>';
        r_year1 += '<th>' + c_year + '</th>';
    }
    r_days += "</tr>";
    r_days2 += "</tr>";
    r_year += '<th colspan="' + (daysInYear) + '">' + c_year + '</th>';
    r_year1 += '<th>' + c_year + '</th>';
    // r_year += "<th rowspan='4' style ='width: 40px;'>Total</th></tr>";
    r_year += "</tr>";
    r_year += "</tr>";
    r_year1 += "</tr>";
    r_month += '<th colspan="' + (daysInMonth) + '">' + months[c_month] + '</th>';
    r_month1 += '<th>' + months[c_month] + '</th>';
    r_month += "</tr>";
    r_month1 += "</tr>";
    table = "<table id='summary__table'> <thead>" + r_year + r_year1 + r_month + r_month1 + r_days + "</thead> <tbody> </tbody> </table>";
    div.html(table);
}

function Total() {
  $('#summary__table tbody tr').each(function(){
    var sum = 0;
    $(this).find('td').each(function(){
      if(!isNaN(Number($(this).text()))){
        sum = sum + Number($(this).text());
      }
    });
    sum = sum - Number($(this).find("td").eq(0).html())
    - Number($(this).find("td").eq(1).html());
    $(this).append('<td>'+sum+'</td>');
    console.log(sum);
  });
};

function drawChartData() {
  var fileName = "SelForChart.php";
  var sendObj = new Object();
  sendObj["start_s"] = $('#std').val();
  sendObj["end_s"] = $("#end").val();
  myAjax.myAjax(fileName, sendObj);
  dataPl = ajaxReturnData[0];
  dataAc = ajaxReturnData[1];
  TTdataPl = ajaxReturnData[3];
  TTdataAc = ajaxReturnData[2];
  TTdataPlOk = ajaxReturnData[4];
  TTdataAcOk = ajaxReturnData[5];
  Pl = [];
  Ac = [];
  TTPl = [];
  TTAc = [];
  TTPlOk = [];
  TTAcOk = [];
  for (const el in dataPl) {
    Pl.push(dataPl[el]);
  }
  Pl.shift();
  for (const el in dataAc) {
    Ac.push(dataAc[el]);
  }
  Ac.shift();

  for (const el in TTdataPl) {
    TTPl.push(TTdataPl[el]);
  }
  TTPl.shift();
  for (const el in TTdataAc) {
    TTAc.push(TTdataAc[el]);
  }
  TTAc.shift();

  for (const el in TTdataPlOk) {
    TTPlOk.push(TTdataPlOk[el]);
  }
  TTPlOk.shift();
  for (const el in TTdataAcOk) {
    TTAcOk.push(TTdataAcOk[el]);
  }
  TTAcOk.shift();
  var daysOfYear = [];
  for (var d = new Date($("#std").val()); d <= new Date($("#end").val()); d.setDate(d.getDate() + 1)) {
      daysOfYear.push(getDate(new Date(d)));
  }
  return data = {
    labels: daysOfYear,
    datasets: [{
        label: "Actual (ton)",
        backgroundColor: "rgba(225,0,0,0.4)",
        borderColor: "red",
        borderCapStyle: 'square',
        pointBorderColor: "black",
        pointBackgroundColor: "white",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "yellow",
        pointHoverBorderColor: "brown",
        data: Pl,
        spanGaps: true,
        type: 'bar',
        yAxisID: 'y',
      }, {
        label: "Plan (ton)",
        backgroundColor: "rgba(167,105,0,0.4)",
        borderColor: "rgb(167, 105, 0)",
        borderCapStyle: 'butt',
        pointBorderColor: "white",
        pointBackgroundColor: "black",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "brown",
        pointHoverBorderColor: "yellow",
        data: Ac,
        type: 'bar',
        yAxisID: 'y',
      }, {
        label: "Plan Ok (ton)",
        backgroundColor: "rgba(0, 255, 0, 0.4)",
        borderColor: "green",
        borderCapStyle: 'square',
        pointBorderColor: "black",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "yellow",
        data: TTAcOk,
        type: 'bar',
        yAxisID: 'y',
      }, {
        label: "Actual Ok (ton)",
        backgroundColor: "rgba(0, 0, 255, 0.4)",
        borderColor: "blue",
        borderCapStyle: 'butt',
        pointBorderColor: "white",
        pointBackgroundColor: "blue",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "blue",
        pointHoverBorderColor: "yellow",
        data: TTPlOk,
        type: 'bar',
        yAxisID: 'y',
      }, {
        label: "Total Actual (ton)",
        backgroundColor: "green",
        borderColor: "green",
        borderCapStyle: 'square',
        pointBorderColor: "black",
        pointBackgroundColor: "green",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "yellow",
        data: TTAc,
        type: 'line',
        yAxisID: 'y1',
      }, {
        label: "Total Plan (ton)",
        backgroundColor: "blue",
        borderColor: "blue",
        borderCapStyle: 'butt',
        pointBorderColor: "white",
        pointBackgroundColor: "blue",
        pointBorderWidth: 1,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: "blue",
        pointHoverBorderColor: "yellow",
        data: TTPl,
        type: 'line',
        yAxisID: 'y1',
      },
    ]
  };
};

function drawChartOption() {
  return options = {
    spanGaps: false,
    pointHoverBorderWidth: 2,
    pointRadius: 4,
    pointHitRadius: 10,
    borderDashOffset: 0.0,
    borderJoinStyle: 'miter',
    borderDash: [],
    lineTension: 0.1,
    fill: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    }
  };
};

function deleteChart(chart) {
  chart.destroy();
};

function drawChart() {
  data = drawChartData();
  option = drawChartOption();
  chart = new Chart(ctx, {
    data: data,
    option: option
  })
};

drawChart()