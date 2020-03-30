// The MIT License (MIT)

// recruiting.js | Copyright (c) 2019 IGN

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

// this file contains functions to handle the people.csv file of the members of LASTIG
	function parseCSVfile() {
		var url = "https://raw.githubusercontent.com/umrlastig/lastig_data/master/recruiting.csv";
		var myInit = { method: 'GET'};
		fetch(url,myInit)
		.then(function(response) {
			return response.ok ? response.text() : Promise.reject(response.status);
		})
		.then(function(text) {
			var data = Papa.parse(text, {
										download: false,
										header: true,
										worker: true,
										step: function(row) {
												//console.log("Row:", row.data);
												if(row.data[0].type != ""){
													if(row.data[0].type == "EC"){
														var parent = document.getElementById("ec-offers");
														divForPhD(parent, row.data);
													}
													else if(row.data[0].type == "PhD"){
														var parent = document.getElementById("phd-offers");
														divForPhD(parent, row.data);
													}
													else if(row.data[0].type == "postdoc"){
														var parent = document.getElementById("postdoc-offers");
														divForPhD(parent, row.data);
													}
													else{
														if(row.data[0].team == "ACTE"){
															var parent = document.getElementById("intern-acte");
															divForIntern(parent, row.data);
														}
														else if(row.data[0].team == "MEIG"){
															var parent = document.getElementById("intern-meig");
															divForIntern(parent, row.data);
														}
														else if(row.data[0].team == "STRUDEL"){
															var parent = document.getElementById("intern-strudel");
															divForIntern(parent, row.data);
														}
														else if(row.data[0].team == "GEOVIS"){
															var parent = document.getElementById("intern-geovis");
															divForIntern(parent, row.data);
														}
													}
												}
										},
										complete: function() {
												console.log("display offers done!");
										}
								});
			return data;
		});
  };

  function divForPhD(parentElement, data) {
		// first remove the "no offer" line if still present
		if(parentElement.firstElementChild.nodeName == "H5"){
			parentElement.firstElementChild.remove();
		}

		const childElement = document.createElement('a');
    const appendChildElement = parentElement.appendChild(childElement);
    appendChildElement.setAttribute("class","list-group-item lang-fr");
		appendChildElement.setAttribute("href", data[0].pdf);
		appendChildElement.innerHTML = data[0].titre+"  ";
		const childElementEn = document.createElement('a');
		const appendChildElementEn = parentElement.appendChild(childElementEn);
		appendChildElementEn.setAttribute("class","list-group-item lang-en");
		appendChildElementEn.setAttribute("href", data[0].pdf);
		appendChildElementEn.innerHTML = data[0].title+"  ";

		if(data[0].filled == "true"){
			const filledElementEn = document.createElement('span');
			filledElementEn.innerHTML = "filled offer";
			filledElementEn.setAttribute("class","label label-success lang-en");
			appendChildElementEn.appendChild(filledElementEn);
			const filledElement = document.createElement('span');
			filledElement.innerHTML = "offre pourvue";
			filledElement.setAttribute("class","label label-success lang-fr");
			appendChildElement.appendChild(filledElement);
		}
    //appendChildElement.innerHTML = data[0].status;
  };

	function divForIntern(parentElement, data) {
		// first remove the "no offer" line if still present
		if(parentElement.firstElementChild.nodeName == "H5"){
			parentElement.firstElementChild.remove();
		}

		const childElement = document.createElement('a');
		const appendChildElement = parentElement.appendChild(childElement);
		appendChildElement.setAttribute("class","list-group-item list-group-item-info lang-fr");
		appendChildElement.setAttribute("href", data[0].pdf_fr);
		appendChildElement.innerHTML = data[0].titre+"  ";
		const childElementEn = document.createElement('a');
		const appendChildElementEn = parentElement.appendChild(childElementEn);
		appendChildElementEn.setAttribute("class","list-group-item list-group-item-info lang-en");
		appendChildElementEn.setAttribute("href", data[0].pdf_en);
		appendChildElementEn.innerHTML = data[0].title+"  ";

		if(data[0].filled == "true"){
			const filledElementEn = document.createElement('span');
			filledElementEn.innerHTML = "filled offer";
			filledElementEn.setAttribute("class","label label-success lang-en");
			appendChildElementEn.appendChild(filledElementEn);
			const filledElement = document.createElement('span');
			filledElement.innerHTML = "offre pourvue";
			filledElement.setAttribute("class","label label-success lang-fr");
			appendChildElement.appendChild(filledElement);
		}
		//appendChildElement.innerHTML = data[0].status;
	};

	var displayRecruiting = function(){
    var data = parseCSVfile();
};
