// ==UserScript==
// @name     Enter grades
// @version  1
// @require  https://code.jquery.com/jquery-3.4.1.min.js
// @require  https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @include  https://susi4.uni-sofia.bg/ISSU/forms/teachers/ProtocolDataEdit.aspx
// ==/UserScript==
// 
function showDialog() {
  $("#dialog").dialog("open");
}

function createDialog() {
    var textarea = document.createElement("textarea");
    textarea.id = "grades";
    textarea.style = "font-family : monospace";
    textarea.rows = 20;
    textarea.cols = 80;

	  var dialog = document.createElement("div");
    dialog.id = "dialog";
    dialog.append(textarea);
  
    $("body").append(dialog);
    $("#dialog").dialog({
        autoOpen : false,
        resizable : true,
        modal : true,
        height : "auto",
        width : 600,
        buttons : {
            "Запиши" : function() { fillGrades(); $(this).dialog("close"); },
            "Откажи" : function() { $(this).dialog("close"); }
        },
        title : "Въведете оценки"});
}

function addButton() {
    var btn = document.createElement("a");
    btn.style = "margin-left : 100px";
    btn.onclick = showDialog;
    btn.text = "Въведи оценки";
    $("#btnBack").after(btn);
}

function loadCss(url) {
    var css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = url;
    $("head").append(css);    
}

function fillGrades() {
    console.log($("#grades")[0].value);
}

loadCss("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
addButton();
createDialog();
