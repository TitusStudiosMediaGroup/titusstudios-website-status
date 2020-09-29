var delta_content = document.getElementById("delta");
const api_TreeURL = delta_content.getAttribute("tree")
let DELTA_generateRow = (a) => console.warn('Function not fetched yet')

fetch(api_TreeURL)
	.then(function(response) {
		return response.json()
	}).then(function(json) {
		function GetSortOrder(prop) {    
			return function(a, b) {    
				if (a[prop] > b[prop]) {    
					return 1;    
				} else if (a[prop] < b[prop]) {    
					return -1;    
				}    
				return 0;    
			}    
		}    

		var delta_content = document.getElementById("delta");
		
		DELTA_generateRow = (jsonstatus,jsondescription) => {
            var parentlocation = delta_content
            var box = document.createElementNS("http://www.w3.org/1999/xhtml","div")
            var context = document.createElementNS("http://www.w3.org/1999/xhtml","p")
            var description = document.createElementNS("http://www.w3.org/1999/xhtml","p")
            
            parentlocation.append(box)
            box.append(context)
            box.append(description)

            box.setAttribute("class","statusbox")      
            context.setAttribute("class","status")            
            description.setAttribute("class","description")     

            if (jsonstatus == "success") {
                box.style.backgroundColor = "rgb(50,215,75)"
                box.style.boxShadow = "0 0 10px rgb(50,215,75)"
            } 
            else if (jsonstatus == "pending") {
                box.style.backgroundColor = "rgb(255,159,10)"
                box.style.boxShadow = "0 0 10px rgb(255,159,10)"   
            } 
            else if (jsonstatus == "failure") {
                box.style.backgroundColor = "rgb(255,69,58)"        
                box.style.boxShadow = "0 0 10px rgb(255,69,58)"        
            } 
            else if (jsonstatus == "error") {
                box.style.backgroundColor = "rgb(255,69,58)"        
                box.style.boxShadow = "0 0 10px rgb(255,69,58)"        
            } 

            context.innerHTML = jsonstatus
            description.innerHTML = jsondescription
		}

        var status = json[0].state;
        var statusDescription = json[0].description;

        DELTA_generateRow(status,statusDescription)

	}).catch(function(ex) {
		DELTA_generateRow("error",ex)
		console.log('parsing failed', ex)
	}
)
