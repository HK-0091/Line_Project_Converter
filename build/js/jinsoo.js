$('.alertBox').click(() => {
	$('.alertBox').css('display', 'none');
	$('.alertBox').css({
		opacity: '0',
		top: '21vw',
	});
})
$('.btn1Box').click(() => {
	modalCss('.modal1', '.modal2', '.modal3');
});
$('.btn2Box').click(() => {
	modalCss('.modal2', '.modal1', '.modal3');
});
$('.btn3Box').click(() => {
	modalCss('.modal3', '.modal2', '.modal1');
});
//toggle, hide, css..
function modalCss(value1, value2, value3) {
	$(value1).toggle('slow');
	$(value2).hide();
	$(value3).hide();
	$(value1).css({
		"display": "flex",
		"align-items": "center",
		"flex-direction": "column",
		"justify-content": "center"
	});
}
let tempJinsoo = 0;
let testJinsoo1 = /[2-9a-zA-Z]+/g;
let testJinsoo2 = /[8-9a-zA-Z]+/g;
let testJinsoo3 = /[a-zA-Z]+/g;
let testJinsoo4 = /[g-zG-Z]+/g;
let resultJinso = '';
let tempJinsooChangeArray = [];
let tenJinsoo = 0;
let swapValueResult = '';

//??? jinsoo -> 10 jinsoo
//ex) 8진수 1254 를 10진수로 value = "1254" currentJinsoo = "8"
function changeTenJinsoo16(value, currentJinsoo) {
	tenJinsoo = 0;
	let i = value.length - 1;
	swapValueResult = swapValue(value);
	while (i >= 0) {
		switch (swapValueResult[i]) {
			case 'a': tenJinsoo += 10 * (currentJinsoo ** i);
				break;
			case 'b': tenJinsoo += 11 * (currentJinsoo ** i);
				break;
			case 'c': tenJinsoo += 12 * (currentJinsoo ** i);
				break;
			case 'd': tenJinsoo += 13 * (currentJinsoo ** i);
				break;
			case 'e': tenJinsoo += 14 * (currentJinsoo ** i);
				break;
			case 'f': tenJinsoo += 15 * (currentJinsoo ** i);
				break;
			default: tenJinsoo += Number(swapValueResult[i]) * (currentJinsoo ** i);
				break;
		}
		i--;
	}
	return tenJinsoo;
}

//swapValue 'abc' -> 'cba'
function swapValue(value) {
	let tempArray = [];
	let tempArrayLength = value.length;
	for (let i = 0; i < tempArrayLength; i++) {
		tempArray.unshift(value[i]);
	}
	return tempArray.join('');
}

//(4)10 jinsoo -> ??? jinsoo
function jinsooChange(tenJinsoo, changeJinsoo) {
	tempJinsooChangeArray = [];
	for (; ;) {
		if ((tenJinsoo % changeJinsoo) == 10) {
			tempJinsooChangeArray.unshift('a');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else if ((tenJinsoo % changeJinsoo) == 11) {
			tempJinsooChangeArray.unshift('b');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else if ((tenJinsoo % changeJinsoo) == 12) {
			tempJinsooChangeArray.unshift('c');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else if ((tenJinsoo % changeJinsoo) == 13) {
			tempJinsooChangeArray.unshift('d');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else if ((tenJinsoo % changeJinsoo) == 14) {
			tempJinsooChangeArray.unshift('e');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else if ((tenJinsoo % changeJinsoo) == 15) {
			tempJinsooChangeArray.unshift('f');
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		} else {
			tempJinsooChangeArray.unshift(tenJinsoo % changeJinsoo);
			tenJinsoo = parseInt(tenJinsoo / changeJinsoo);
		}
		if (tenJinsoo < changeJinsoo) {
			switch(tenJinsoo % changeJinsoo){
				case 10 : tempJinsooChangeArray.unshift('a');
				break;
				case 11 : tempJinsooChangeArray.unshift('b');
				break;
				case 12 : tempJinsooChangeArray.unshift('c');
				break;
				case 13 : tempJinsooChangeArray.unshift('d');
				break;
				case 14 : tempJinsooChangeArray.unshift('e');
				break;
				case 15 : tempJinsooChangeArray.unshift('f');
				break;
				default: tempJinsooChangeArray.unshift(tenJinsoo % changeJinsoo);
				break;
			}
			break;
		}
	}
	resultJinso = tempJinsooChangeArray.join("");
}

//(3)resultJinsoo
function finalResultJinsoo(changeJinsooValue) {
	tempJinsoo = $('#inputText').val();
	changeTenJinsoo16(tempJinsoo, changeJinsooValue);
	if ($("#selectB").val() == "2진수") {
		jinsooChange(tenJinsoo, 2);
		$('input[id=result]').attr('value', resultJinso);
	} else if ($('#selectB').val() == "8진수") {
		jinsooChange(tenJinsoo, 8);
		$('input[id=result]').attr('value', resultJinso);
	} else if ($('#selectB').val() == "10진수") {
		jinsooChange(tenJinsoo, 10);
		$('input[id=result]').attr('value', resultJinso);
	} else if ($('#selectB').val() == "16진수") {
		jinsooChange(tenJinsoo, 16);
		$('input[id=result]').attr('value', resultJinso);
	} else {
		$('#changeJinsoo').css('display', 'block');
	}
}

//(2)css
function confirmValue(testJinsoo, value, changeJinsooValue) {
	if (testJinsoo.test($("#inputText").val())) {
		$('.modal1').css('display', 'none');
		$('.modal2').css('display', 'none');
		$('.modal3').css('display', 'none');
		$(value).css('display', 'block');
	} else {
		finalResultJinsoo(changeJinsooValue);
	}
}
//(1)
$(`#resultBtn`).click(() => {
	//2진수
	if ($('#selectA').val() == "2진수") {
		confirmValue(testJinsoo1, '#2Jinsoo', 2);
	}
	//8진수
	if ($('#selectA').val() == "8진수") {
		confirmValue(testJinsoo2, '#8Jinsoo', 8);
	}
	//10진수
	if ($('#selectA').val() == "10진수") {
		confirmValue(testJinsoo3, '#10Jinsoo', 10);
	}
	//16진수
	if ($('#selectA').val() == "16진수") {
		confirmValue(testJinsoo4, '#16Jinsoo', 16);
	}
});
