// The MIT License (MIT)

// people.js | Copyright (c) 2019 IGN

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
	function parsePeopleCSVfile() {
		var request = new XMLHttpRequest();

		// Open a new connection, using the GET request on the URL endpoint
		var url = "https://raw.githubusercontent.com/umrlastig/lastig_data/master/people.csv";
		request.open('GET', url, true);
		request.onload = function () {
			var data = Papa.parse(this.response, {
										download: false,
										header: true,
										step: function(row) {
												//console.log("Row:", row.data);
												if(row.data[0].firstname.localeCompare("") != 0){
													var parent = document.getElementById("people-container");
													divForAllPeople(parent, row.data);}
										},
										complete: function() {
												console.log("All done!");
										}
								});
			return data;
		};

		request.send();


  };

  function divForAllPeople(parentElement, data) {
    if (data[0].end_date != '') return;
		const childElement = document.createElement('div');
    const appendChildElement = parentElement.appendChild(childElement);
    appendChildElement.setAttribute("class","people col-lg-2 col-md-6 mb-lg-0 mb-5");
    avatarDivElement = document.createElement('div');
    const appendAvatarDivElement = appendChildElement.appendChild(avatarDivElement);
    appendAvatarDivElement.setAttribute("class","avatar mx-auto img-member");
		imgElement = document.createElement('img');
    imgElement.setAttribute("class","rounded-circle z-depth-1");
		imgElement.setAttribute("src",data[0].photo);
    imgElement.setAttribute("alt","");
		appendImgElement = appendAvatarDivElement.appendChild(imgElement);

		aElement = document.createElement('a');
		aElement.setAttribute("href", data[0].webpage);
		nameElement = document.createElement('h5');
    nameElement.innerHTML = data[0].firstname +" "+ data[0].lastname;
		nameElement.setAttribute("class","font-weight-bold mt-4 mb-3");
		aElement.append(nameElement);
    appendChildElement.appendChild(aElement);
    statusElement = document.createElement('p');
    statusElement.innerHTML = data[0].status;
    statusElement.setAttribute("class","text blue-text text-status");
    appendChildElement.appendChild(statusElement);
    //appendChildElement.innerHTML = data[0].status;
  };

	var displayPeople = function(){
    var data = parsePeopleCSVfile();
};
