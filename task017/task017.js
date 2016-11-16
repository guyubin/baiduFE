/*数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

//以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d; 
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i=1; i<92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500),
};



//用于渲染图表的数据
var chartData = {};

//记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
};


function hoverDetail(e) {
  var detail = e.childNodes[0];
  detail.style.visibility = "visible";
}
function hideDetail(e) {
  var detail = e.childNodes[0];
  detail.style.visibility = "hidden";
}
/*
*渲染函数
*/
function renderChart() {
  var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
  aqiChartWrap.style.cssText = "border:2px solid yellow; width: 90%; height: 550px;" +
        "display: flex; justify-content: center;align-items: flex-end; align-content:center;" +
        "margin: 10px auto; padding: 10px;";
  var color = "";
  var text = "";
  console.log(chartData);
  for (var item in chartData) {
    color = 'rgb(' + parseInt(256 * Math.random()) + ','
              + parseInt(256 * Math.random()) + ',' + parseInt(256 * Math.random()) + ')';
    text += "<div class='chat_item' onmouseover='hoverDetail(this)' onmouseout='hideDetail(this)' style='height: " 
             + chartData[item] + "px; background-color: " + color + "; width: 100px;'>" + "<span class='detail'>date: " + item + 
             "<br />num: " + chartData[item] + "</span>" + "</div>" ;
             /*+ "<span class='detail'>date: " + item + 
             "<br />num: " + chartData[item] + "</span>" + "</div>"*/
  }
  aqiChartWrap.innerHTML = text;
}

/**
*日、周、月的radio事件点击时的处理函数
*/
function graTimeChange() {
  //确定是否选项发生了变化
  var inputs = document.getElementsByTagName("input");
  for (var i=0, len=inputs.length; i<len; i++){
    if(inputs[i].checked && inputs[i].value != pageState.nowGraTime){
      pageState.nowGraTime = inputs[i].value;
    }
  }
  //设置对应数据
  
  initAqiChartData();
  //调用图表渲染函数
  
}

/**
*select发生变化时的处理函数
*/
function citySelectChange(){
  //确定是否选项发生了变化
  
  //设置对应数据
  initAqiChartData();
  //调用图表渲染函数
}

/**
*初始化日、周、月的radio事件，当点击时，调用graTimeChange
*/
function initGraTimeForm() {
  var formGraTime = document.getElementById("form-gra-time");
  formGraTime.addEventListener("click", graTimeChange, false);
}


/*
*初始化城市Select下拉选择框中的选项
*/
function initCitySelector() {
  var citySelect = document.getElementById("city-select");
  //读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var item = "";
  for (var cityName in aqiSourceData) {
    item += "<option>"+cityName+"</option>";
  }
  citySelect.innerHTML = item;
  //给select设置事件，当选项发生变化时调用citySelectChange
  citySelect.addEventListener("change", citySelectChange, false);
}

/**
*初始化图表需要的数据格式
*/
function initAqiChartData() {
  //将原始的源数据处理成图表需要的数据格式
  var citySelect = document.getElementById("city-select");
  var char = {};
  chartData = {};
  var sum = 0;
  var days = 0;
  var week = 0;
  for (var cityName in aqiSourceData) {
    if (citySelect.value == cityName) {
      char = aqiSourceData[cityName];
    }
  }
  //处理好的数据存到chartData中
  switch(pageState.nowGraTime) {
    case "day" :
      chartData = char;
      break;
    case "week" :
      sum = 0;
      days = 0;
      for (var item in char) {
        sum += char[item];
        days++;
        if (new Date(item).getDay(item) == 6) {
          week++;
          chartData["2016" + week + "weeks"] = parseInt(sum/days);
          days = 0;
          sum = 0;  
        }
      }
      if (days != 0) {
        week++;
        chartData["2016" + week + "weeks"] = parseInt(sum/days);
      }
      break;
    case "month" :
      sum = 0;
      days = 0;
      var month = 0;
      for (var item in char) {
        var date = new Date(item);
        if (date.getMonth() != month) {
          //month = date.getMonth();
          if (sum != 0){
            chartData["2016" + (date.getMonth()) + "Month"] = parseInt(sum/days);
          }
          days = 0;
          sum = 0;
          month++;
        }
        sum += char[item];
        days++;
      }
      if (days != 0) {
        chartData["2016" + (date.getMonth()+1) + "Month"] = parseInt(sum/days);
      }
      break;
  }

  renderChart();
}


/**
* 初始化函数
*/
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
}

init();