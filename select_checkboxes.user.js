// ==UserScript==
// @name           Select checkboxes
// @namespace      http://trifon.info/
// @include        https://susi4.uni-sofia.bg/ISSU/forms/teachers/ElectiveDisciplinesUnsubscribe.aspx
// ==/UserScript==

var PREFIX = "ElectiveDisciplineStudents1_rptResults_ctl";
var SUFFIX_CHECKBOX = "_chkStudent";
var SUFFIX_STUDENT_NAME = "_lnkStudentName";

function check(names) {
	for (i = 1; ; i++) {
		var id = i < 10 ? "0" + i : i;
		var nameId = PREFIX + id + SUFFIX_STUDENT_NAME;
		var element = document.getElementById(nameId);
		if (element == null)
			break;
		var nameStr = element.innerHTML;
		var unenrolled = element.parentNode.parentNode.getElementsByTagName("td")[6];
		var isEnrolled = unenrolled.innerHTML.trim() == "";
		if (names.indexOf(nameStr) != -1 || names.indexOf("enrolled") != -1 && isEnrolled) {
			var checkBoxId = PREFIX + id + SUFFIX_CHECKBOX;
			document.getElementById(checkBoxId).checked = true;
		}
	}	
}

var studentList = prompt("Въведете списък от пълни имена на студенти, отделени със запетая");
check(studentList.split(","));
