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
    $(dialog).dialog({
        autoOpen : false,
        resizable : true,
        modal : true,
        height : "auto",
        width : 600,
        buttons : {
            "Запиши" : () => { fillGrades(); $(dialog).dialog("close"); },
            "Откажи" : () => { $(dialog).dialog("close"); }
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

function parseGrades(text) {
    try {
        return text.trim().split("\n").map(
            line => {
                var data = line.split("\t");
                return {
                    "fn"    : data[0],
                    "grade" : data[1].replace( /\D/g, '')
                }; });
    } catch(err) {
        console.log("Parse error: " + err);
        return [];
    }
}

function printArray(arr) {
    var str = arr.length;
    if (arr.length > 0) {
        str += " -> " + arr.toString();
    }
    return str;
}

function fillGrades() {
    var grades = parseGrades($("#grades")[0].value);
    var not_filled = [];
    $("#ProtocolDataEdit1_pnlStudents table tr")
        .has("input[type='text']")
        .each(function() {
            [fn, grade, note ] = $(this).find("td").slice(2);
            fn = $(fn).text();
            var record = grades.find(row => row.fn == fn);
            if (record != null) {
                record.filled = true;
                if (record.grade != "") {
                    $(grade).find("input")[0].value = record.grade;
                } else {
                    $(note).find("input")[0].value = "не се явил";
                }
            } else {
                not_filled.push(fn);
            }
        });
    console.log("Filled in protocol          : " +
                printArray(grades.filter(row => row.filled).map(row => row.fn)));
    console.log("In protocol, but not in data: " +
                printArray(not_filled));
    console.log("In data, but not in protocol: " +
                printArray(grades.filter(row => !row.filled).map(row => row.fn)));
}

loadCss("https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css");
addButton();
createDialog();
