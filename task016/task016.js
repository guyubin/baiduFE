

/**
 *aqiData,存储用户输入的空气指数数据
 *示例格式：
 *aqiData ={
 *   "北京":90,
 *   "上海":40
 *};
 */
var aqiData = {};
var table = {};
var tableBtns = {};
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
  var aqiCityInput = document.getElementById("aqi-city-input");
  var city = aqiCityInput.value.trim();
  var aqiValueInput = document.getElementById("aqi-value-input");
  var quality = aqiValueInput.value.trim();
  var pattern1 = /^[\u4e00-\u9fa5a-zA-Z]+$/ ;
  var pattern2 = /^[1-9]\d*$/;
  if ((!(pattern1.test(city))) || (!(pattern2.test(quality)))){
    aqiCityInput.value = "";
    aqiValueInput.value = "";
    alert("illegal");
    return;
  }

  aqiData[city] = quality;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {  
  var j = 0;//判断aqiData中是否为空
  for(var cityName in aqiData){
    j = j + 1;
  }
  if(j == 0){
    while(document.getElementsByTagName("tr").length != 0){
      table.removeChild(document.getElementsByTagName("tr")[0]);
    }
    return;
  } 
  
  while(document.getElementsByTagName("tr").length != 0){
    table.removeChild(document.getElementsByTagName("tr")[0]);
  }

  if(document.getElementsByTagName("tr").length == 0){
    var tr1 = document.createElement("tr");
    var td1 = document.createElement("td");
    var td2 = document.createElement("td");
    var td3 = document.createElement("td");
    var td1text = document.createTextNode("城市");
    var td2text = document.createTextNode("空气质量");
    var td3text = document.createTextNode("操作");
    td1.appendChild(td1text);
    td2.appendChild(td2text);
    td3.appendChild(td3text);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    table.appendChild(tr1);
  }
  for(var cityName in aqiData){
    tr1 = document.createElement("tr");
    td1 = document.createElement("td");
    td2 = document.createElement("td");
    td3 = document.createElement("td");
    td1text = document.createTextNode(cityName);
    td2text = document.createTextNode(aqiData[cityName]);
    var td3btn = document.createElement("button");
    var td3btntext = document.createTextNode("删除");
    td3btn.appendChild(td3btntext);
    td1.appendChild(td1text);
    td2.appendChild(td2text);
    td3.appendChild(td3btn);
    tr1.appendChild(td1);
    tr1.appendChild(td2);
    tr1.appendChild(td3);
    table.appendChild(tr1);
  }
   
  tableBtns = table.getElementsByTagName("button");
  for(var i=0; i<tableBtns.length; i++){
    tableBtns[i].onclick = delBtnHandle;
  }
}

/** 
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
  //do sth
  curRow = event.srcElement.parentElement.parentElement;
  propertyName = curRow.childNodes[0].firstChild.nodeValue;
  delete aqiData[propertyName];
  renderAqiList();
}

function init() {
  table = document.getElementById("aqi-table");
  //在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var addBtn = document.getElementById("add-btn");
  addBtn.onclick = addBtnHandle;
  //想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  
}

window.onload = init;