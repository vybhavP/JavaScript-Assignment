var fs=require('fs');
var address=fs.createReadStream('Indicators.csv');
var rl=require('readline').createInterface({
		input:address,
});
var headersArray=[];//to store headers into an array
var totalValues=[];//total CSV file values array
var maleArray=[];
var jsonObjectArrayF = [];
var jsonObjectArrayM = [];//to store the final json Object
var jsonObjectArrayT = [];
var obj={};
var countrynames= ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
												"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];


var LifeExpentencyOfFeMale = fs.createWriteStream("LifeExpentencyOfFeMale.json");
var LifeExpentencyOfMale = fs.createWriteStream("LifeExpentencyOfMale.json");
var LifeExpentencyOfTotal = fs.createWriteStream("LifeExpentencyOfTotal.json");
// var createWriteStream = fs.createWriteStream("LifeExpentencyOfMale.json");
// var createWriteStream = fs.createWriteStream("LifeExpentencyOfTotal.json");

	var isHeader=true;//initializing the value of isHeader value true(if the isHeader value is false then the loop discontinues)
			rl.on('line',function(line){//this function extract only the headings of CSV in firstline
			var firstline=true;
			if(isHeader){//To extract headers in a CSV
				headersArray=line.split(",");//used to split the values which are separated by ','s'
				console.log(headersArray);//used to print the headersArray
				isHeader=false;//after firstline ends we are stopping the procedure by assigning false to isHeader
			}/*end of extracting headers in a CSV*/
			else {//it enters into this else part after completing first line in CSV

					totalValues=line.split(",");//spliting the values in CSV separating by comma except the InidcatorName

				if(totalValues[3].startsWith(" female (years)")){//if the third column value ends with the word "birth", then the third and fourth columns will combines
       			if((totalValues[5]>=1960)&&totalValues[5]<=2015){
				var singlevalue={};
        		for(var i=0;i<countrynames.length;i++){//it checks for the values only for asian countries
	          if(totalValues[0]==countrynames[i]){//it checks for the country names which are in the asian countries   					
					 
					 	singlevalue["year"]=totalValues[5];
					 	singlevalue["countryname"]=totalValues[0];
						singlevalue["female"]=totalValues[6];
						jsonObjectArrayF.push(singlevalue);					
						//LifeExpentencyOfFeMale.write(JSON.stringify(singlevalue));					
						//console.log(singlevalue);
						//singlevalue.year or singlevalue[""] gives the years in the singlevalue object
						//singlevalue.countryname gives the countryname in the singlevalue object
						//singlevalue.female gives the female value in the singlevalue object					 				
					
      		}//end of extracting values of asian countries

		}//end of for loop
}
      }//end of extraction of birth columns(female)
      if(totalValues[3].startsWith(" male (years)")){//if the third column value ends with the word "birth", then the third and fourth columns will combines
       			if((totalValues[5]>=1960)&&totalValues[5]<=2015){
				var singlevalue={};
				
        		for(var i=0;i<=0;i++){//it checks for the values only for asian countries
	          if(totalValues[0]==countrynames[i]){//it checks for the country names which are in the asian countries 
					 
					 	singlevalue["year"]=totalValues[5];
					 	singlevalue["countryname"]=totalValues[0];
						singlevalue["male"]=totalValues[6];
						//console.log(singlevalue);
						jsonObjectArrayM.push(singlevalue);	
						//console.log(jsonObjectArray);
						//obj[totalValues[5]]=jsonObjectArray;	
									
						//LifeExpentencyOfMale.write(JSON.stringify(singlevalue));					
					 				
					
      		}//end of extracting values of asian countries

		}//end of for loop
		//jsonObjectArray=[];
		//singlevalue={};		
}

//console.log(obj);
      }//end of extraction of birth columns(male)
      
  	if(totalValues[3].startsWith(" total (years)")){//if the third column value ends with the word "birth", then the third and fourth columns will combines
       			if((totalValues[5]>=1960)&&totalValues[5]<=2015){
				var singlevalue={};
        		for(var i=0;i<countrynames.length;i++){//it checks for the values only for asian countries
	          if(totalValues[0]==countrynames[i]){//it checks for the country names which are in the asian countries
					 
					 	singlevalue["year"]=totalValues[5];
					 	singlevalue["countryname"]=totalValues[0];
						singlevalue["total"]=totalValues[6];
						jsonObjectArrayT.push(singlevalue);					
						//LifeExpentencyOfTotal.write(JSON.stringify(singlevalue));					
						//console.log(singlevalue);					 				
					
      		}//end of extracting values of asian countries
		}//end of for loop
	}
   }//end of extraction of birth columns(total)

  }//end of extraction of data except heading

 }//end of .on
).on('close',()=>{

	// console.log( jsonObjectArrayF[0].year );
	// console.log( jsonObjectArrayF[0].countryname );
	// console.log( jsonObjectArrayF[0].female );
	// console.log( jsonObjectArrayM[0].year );
	// console.log( jsonObjectArrayM[0].countryname );
	// console.log( jsonObjectArrayM[0].male );
	// console.log( jsonObjectArrayT[0].year );
	// console.log( jsonObjectArrayT[0].countryname );
	// console.log( jsonObjectArrayT[0].total );

	LifeExpentencyOfTotal.write(JSON.stringify(jsonObjectArrayT));
	

	LifeExpentencyOfFeMale.write(JSON.stringify(jsonObjectArrayF));
	

	LifeExpentencyOfMale.write(JSON.stringify(jsonObjectArrayM));
	

	//console.log( jsonObjectArrayM);
});
