function addMatrixHelper(){
    var x = document.getElementById("theMatrix").value;
    //var y = document.getElementById("matrixOutput").value;
    //question for now
    // not to conflict with known
    addMatrix(x);
}

function addMatrix(theMatrix){
    var matrixString =theMatrix;
    //var output=theOutput;
                                    
    var m1 = "\\[";
    var m2 ="\\begin{bmatrix}";
    var m3 = "\\end{bmatrix}";
    var m4 = "\\]";
    // for making the string
    var m5= "\\\\";
                                    
    var partsM = matrixString.split(",");
    // splitting 1&2, 2&3
    var pairN=partsM.length;
    // number of pairs for Matrix
    var matrix=partsM[0];
    
    if(matrixString == "") {
    //document.getElementById("matrixOutput").innerHTML = output;
    }
    
    else{
        for(var i=1;i<pairN;i++){
            var pair= partsM[i];
            matrix=matrix + m5 + pair;
        }
                                                                    
        var finalMatrixCode = m1+ m2+ matrix + m3+ m4;
        //output=output + finalMatrixCode;
        // add in the end of question with known
        document.getElementById("matrixOutput").innerHTML = finalMatrixCode;
        //replace
 }
}
