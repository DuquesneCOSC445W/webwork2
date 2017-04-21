function insertRandInits(pgString, initArr){
	for(var i=0; i < initArr.length; i++){
		initArr[i] = initArr[i] + " ";
		if(i == initArr.length-1){
			initArr[i] = initArr[i] + '<br>';
		}
		pgString = splitAndInsert(pgString, findIndex('TEXT(beginproblem());', pgString, 'before'), pgString.length, '<br>' + initArr[i]);
	}
	return pgString;
} 
