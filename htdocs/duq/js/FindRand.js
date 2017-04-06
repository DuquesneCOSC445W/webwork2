/*
 * @author Alexander Barnhart
 */
function splitAndInsertModified(pgString, beginIndex, endIndex, hintStr){
	//original author: Sean McShane 
	//modified by: Alexander Barnhart	
	var beginText = pgString.substr(0, beginIndex);
	var endText = pgString.substr(endIndex, pgString.length);

	pgString = beginText + hintStr + endText;
	return pgString;
}

function findRand(PGString)
{
	/* this function will take a pg file in string form and search within
	 * it for all random tags([rand]...[/rand]). the program will put these
	 * into an array-of-arrays called randTags[]. the format will be:
	 * randTags[n] = [startIndex, endIndex, [string1, string2, ... , lastString] ];
	 * this is with the assumption that the tagged string will be in the format:
	 * string1,string2,string3,etc.
	 */
	//the pg file in string form
	//the array to return.
	var randTags = [];
	
	var startIndex = 0;	//used for conditional.
	var index = 0;		//actual pointer to area in string. used for navigation.
	
	var beginString = 0;	//begin substring.
	var endString = 0;	//end substring.

	/* count all the occurences of [rand]...[/rand].
	 * this while loop's structure was adapted from code found on: 
	 * http://stackoverflow.com/questions/16897772/looping-through-string-to-find-multiple-indexes
	*/	
	var hasTags = false;
	while((index = PGString.indexOf("[rand]", startIndex)) > -1) {
		hasTags = true;
		beginString = PGString.indexOf("[rand]", startIndex) + 6;
		endString = PGString.indexOf("[/rand]",beginString);
		randTags.push(new Array(beginString, endString, PGString.substring(beginString, endString).split(",")));
		startIndex = endString;
	}
	var recievedArr = [];
	
	//calls another function on each element of the randTags array
		
	for(var i = 0; i < randTags.length; i++)	
	{
		recievedArr.push(translateRand(randTags[i]));
	}
	
	var n = 0;
	startIndex = 0;
	while((index = PGString.indexOf("[rand]", startIndex)) > -1) {
		beginString = PGString.indexOf("[rand]", startIndex);
		endString = PGString.indexOf("[/rand]", beginString) + 7;
		
		var newstring = splitAndInsertModified(PGString, beginString, endString, recievedArr[n]);
		PGString = newstring;
		n++;@Input1DArray01(0,1,C2,C3,Choice4,Choice5,Choice6);
        $randNum = random(2,6,1);
        $funcTrig = Formula($Input1DArray[$randNum]);
        $funcDeriv = funcTrig->D();

        startIndex = 0;
	}
	//return PGString;
	return hasTags;
}
	 //author James Murphy 	(Group C)
function translateRand(randTagsIn) //rename
{
    //both min and max are inclusive
    var maxSlot = randTagsIn.length;
    var minSlot = 2;					//im not sure what the values should be
    addingString1 = "@Input1DArray(";
    for (i = 0; i < maxSlot-1; i++){
        addingString1 += randTagsIn[i] + ",";    //not sure if it needs commas (for strings)
    }
    addingString1 += randTagsIn[maxSlot-1] + ");";
    var addingString2 = "$randNum = random("+minSlot+"," + (maxSlot -1) + ",1);"; //might need to remove -1
    var addingString3 = "trigFunc  = Formula($Input1DArray[$randNum]);";
    var addingString4 = "trigDeriv = trigFunc->D();";

    return "END_PGML\n" + addingString1 +"\n" + addingString2 +"\n" + addingString3 +"\n" +addingString4 + "\nBEGIN_PGML";
    //for non PGML
    //return addingString1 +"\n" + addingString2 +"\n" + addingString3 +"\n" +addingString4;
}
