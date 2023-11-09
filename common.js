/*
 * Includes common JavaScript for HCVA pages
 */

/**
 * Queries the DOM for an element by ID.
 */
function queryElementByID(id){
    return document.querySelector("[id*='" + id + "']");
}
 
//Text box for all pages
let extract = "";
//Text box for Image Comparison page
let imageBox = "";

    //Variable to hold the current Text
    let currentText = "";
    
    //A check to call Fun function
    let capture = true;
    let capture2 = false;
    
    //Variable to store health Number
    let HealthNum = "";
    //Variable to store version code Number
    let versionCode ="";
    
    //button to Enable/Disable
    let btnClick = true;
    let clearText = false;
    
    //First box for Image Comparison and other pages.
    let tBoxClick = true;
    //Second text box for Image Comparison.
    let bBoxClick = false;
    
    
       //Adds characters and extracts the health number from the string of Card stripe.
       function stringExtraction(event) {
              capture = false;
              var keyPressed = event.key;
              currentText += keyPressed;
              
              let lastCharc = currentText.lastIndexOf('%');
              let newText = currentText.slice(lastCharc);
              versionCode = newText.slice(89, 91).trim();
              HealthNum = newText.slice(8, 18).trim();
              //console.clear();
              console.log("Word:", HealthNum);
          }
       
    
    
       function charcAction(event, pExtract){
           
    	   //Clearing the text box
           if(event.key == "%" || event.key == ";"){
                 event.preventDefault(); 
                 clearText = true;
             }

             if(event.key == "?"){
                 event.preventDefault(); 
                 clearText = false; 
             }
             
             if (clearText) {
                 event.preventDefault();
               }


           //Capturing the string from the card reader
           if (event.key == "^") {
        	   console.log("whats inside here" + event.key);
        	   var hello = event.key;
               currentText += hello;
               console.log("thisis" + hello);
                  //capture = true;
                  
                  
                  setTimeout(function() {
                      console.log("final");
                      pExtract.value = HealthNum;
                      vc.value = versionCode;
                      
                      
                  }, 2100);
              }
           
              //Calls the function Fun after certain checks
              if (event.key == "%" || capture == false && capture2 == false) {
                  btnClick = false;
                  stringExtraction(event);
                  
                  
              }
              
              //Prevent it from Auto-Submitting
              if (event.key == "Enter" && btnClick == false){
                  event.preventDefault();
                  btnClick == true;
              }
              
       }
    
    document.addEventListener("keydown", function (event) {
        
    	//If Top box is with or without clicked, and default, for all other pages
        if(tBoxClick == true){
            extract = queryElementByID("healthNum");;
               charcAction(event, extract, vc);
               
               
        }
           
           ////If Bottom box is with or without clicked for Image Comparison page
        if (bBoxClick == true){
               imageBox = queryElementByID("healthNum2");
               charcAction(event, imageBox);
           }

          });
    
    
    //Auto-focus for the text box, click for the text box is given more preference.
    document.addEventListener("click", function (event) {
    	//Image Comparison Text box
        imageBox = queryElementByID("healthNum2");
        //Text box for all other pages
        extract = queryElementByID("healthNum");
        
        vc = queryElementByID("versioncode");
    	console.log(vc.value);
        
        //Giving control based on Click (Text box)
        if(event.target == extract){
            tBoxClick = true;
            bBoxClick = false;
            }
        
        else if(event.target == imageBox){
            bBoxClick = true;
            tBoxClick = false;
            }
        else{
        	if (extract.value == ""){
        		tBoxClick = true;
                bBoxClick = false;
        	}
        	else{
        		bBoxClick = true;
                tBoxClick = false;
        	}
        }

        
          });


window.addEventListener('load', function(){
	
    //Just loading the Text boxes before the page loads
	extract = queryElementByID("healthNum");
	imageBox = queryElementByID("healthNum2");
	
	vc = queryElementByID("versioncode");
	console.log(vc.value);
	
	
	editMessages();
	displayCurrentDateTime();
	
    // Disable cut, copy, and paste
    $('body').bind('cut copy paste', function (e) {
        e.preventDefault();
        clearClipboard();
    });
    
    // Disable print screen
    window.addEventListener('keyup', checkPrintScreen);
	
	// Unhide the Material Icons after 0.5 second delay. The delay is required to prevent icon text from appearing.
	setTimeout(function(){
	    var icons = document.getElementsByClassName('material-icons');
	    for(var i=0; i < icons.length; i++){
	    	icons[i].style.display = 'inline-block';
	    }
	}, 500);
	
	// Prevent any submit buttons on the page from double submitting
	var inputs = document.getElementsByTagName("input");
	for(i = 0; i < inputs.length; i++){
		if(inputs[i].getAttribute("type") == "submit"){
			inputs[i].addEventListener('click', function(){
				preventDoubleSubmit(this);
			});
		}
	}
	
	//Give focus to the page level message or field level error, if present
	var pageLevelMessage = document.getElementById("alertMessagesBox");
	var firstFieldLevelMessage = document.getElementsByClassName("fieldLevelError")[0];
	if(pageLevelMessage != null){
		giveFocusForReader(pageLevelMessage);
	}
	else if(firstFieldLevelMessage != null){
		giveFocusForReader(firstFieldLevelMessage);
	}
});


//Get current Date and Time for display
function displayCurrentDateTime(){
	var currentDate=new Date();
	
	var year=currentDate.getFullYear();
	var formattedMonths=["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"];
	var month=formattedMonths[currentDate.getMonth()];
	var day=currentDate.getDate();
	
	var hours=currentDate.getHours();
	var minutes=currentDate.getMinutes();
	if(minutes < 10)
		minutes="0" + minutes;
	
	var seconds=currentDate.getSeconds();
	if(seconds < 10)
		seconds="0" + seconds;
	
	var milliseconds=currentDate.getMilliseconds();
	if(milliseconds < 10)
		milliseconds="00" + milliseconds;
	else if(milliseconds < 100)
		milliseconds="0" + milliseconds;
	
	var displayDate=month + " " + day + " " + year + " " + hours + ":" + minutes + ":" + seconds + ":" + milliseconds;
	document.getElementById("currentDateTime").innerHTML=displayDate;
}


//Clears clipboard data when the user tries to print screen
function checkPrintScreen(e){
	if(e.keyCode == 44){
		//print screen pressed
		clearClipboard();
	}
}


//Clears clipboard data (copy / paste)
function clearClipboard(){
	window.clipboardData.clearData();
}


//Prompts the user to close the application page
function doClose() {
	var answer = confirm("Are you sure you want to exit the application?")
	if (answer){
		var hiddenCommandLink = window.document.getElementById("form2:link1");
    	if (hiddenCommandLink){
			hiddenCommandLink.fireEvent("onclick");
		}
		var thisWindow = window.self; 
		thisWindow.opener = "x"; 
		thisWindow.close(); 
	}
}


//Opens the page printing options
function printDetails(){
	window.print();
	return false;
}


/*
 * Submits the form a select element exists in. Has a delay so that the user can scroll 
 * through the options with arrow keys.
*/
var scrollTimer = null;
function submitFormBySelect(form){
	if (scrollTimer != null) {
		clearTimeout(scrollTimer);
	}
	
	scrollTimer = setTimeout(function(){
		form.submit();
	}, 500 );
}


/* 
 * Takes a JSF submit control (button or link) as a parameter and disables it to prevent a double submit from occurring. 
 * Allows 50 ms of lead time so that the button's name + value pair will be sent through the request.
*/
function preventDoubleSubmit(control){
	setTimeout(function(){
		control.disabled = true;
	}, 50);
}


/*
 * Purpose:  This function opens new session of browser with limited menu access 
 */
function popupWithRestrictions(url_link){
	var popFeatures = "width=1024,height=768,toolbar=0,location=0,directories=0,status=0,menuBar=0,scrollBars=1,resizable=1";
	var myWin = window.open(url_link,null,popFeatures);
	myWin.moveTo(0,0);
	return false;
}

//Closes the current tab
function closeTab(){
	window.open('','_self').close();
}

//Edits the page-level JSF messages by adding alert, tabindex, and styling that matches the type of message (Error, Warning, Info)
function editMessages(){
	var messageList = document.getElementById("globalMsg");
	
	if(messageList != null){
		addAriaRole(messageList, "alert");
	
		var errorMsgs = messageList.getElementsByClassName("prsb-error");
		var warningMsgs = messageList.getElementsByClassName("prsb-warning");
		var infoMsgs = messageList.getElementsByClassName("prsb-info");
		var messageIcon = document.getElementById("messageIcon");
		var alertMessagesBox = document.getElementById("alertMessagesBox");
		if(errorMsgs.length > 0){
			messageIcon.innerHTML = 'error';
			messageIcon.classList.add('prsb-red');
			alertMessagesBox.classList.add('prsb-error');
		}
		else if(warningMsgs.length > 0){
			messageIcon.innerHTML = 'warning';
			messageIcon.classList.add('prsb-yellow');
			alertMessagesBox.classList.add('prsb-warning');
		}
		else{
			messageIcon.innerHTML = 'info';
			messageIcon.classList.add('prsb-blue');
			alertMessagesBox.classList.add('prsb-info');
		}
		
	}
}

//Adds aria role to an element
function addAriaRole(element, role){
	element.setAttribute("role", role);
}

//Gives an element focus with a 0.5 second delay. This allows the screen reader to read it properly
function giveFocusForReader(element){
	setTimeout(function(){
		element.focus();
	}, 500);
}