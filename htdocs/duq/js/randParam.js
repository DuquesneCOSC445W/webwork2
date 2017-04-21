/**
 * Given an array of random parameter types obtained from the GUI, creates 
 * the perl initialization code to be then inserted into the final perl code for
 * the problem.
 *
 * @param paramInfo an array of random parameter type information. Size equal to
 * number of specified random parameters by the user. Expects type field of
 * three different string "num", "trig", and "reop" for random number,
 * trigonometry function, and relational operator.
 *
 * @author Derek S. Prijatelj
 */
function randParam(paramInfo){
    var randInit[]; // String[] of random param intialization PGML code
    
    for (int i = 0; i < paramInfo.length; i++){
        if (paramInfo[i].type === "num"){
            randInit[i] = randNum(i, paramInfo[i].min, paramInfo[i].max,
                paramInfo[i].step, paramInfo[i].zero);
        } else if (paramInfo[i].type === "trig"){
            randInit[i] = randTrig(i, paramInfo[i].funcs);
        } else if (paramInfo[i].type === "reop"){
            randInit[i] = randReOp(i, paramInfo[i].reops);
        } // otherwise ignore, incorrect type
    }

    insertRand(randInit);
}

/*  TODO
    I do not add any 'BEGIN_PGML' or 'END_PGML' tags because that should be
    handeld by the inserter when inserting all of these initialization variables
    all together. So all initialization code below is in perl, simple append
    END_PGML and BEGIN_PMGL to the end of the randPGMLInit list on printout.

    We also may experience error when calling our '$rand#' variables in PGML as
    is. Take note.
*/

/**
 * Creates the perl code for the initialization of a random variable for either
 * integers or floats.
 *
 * @author Derek S. Prijatelj
 */
function randNum(paramNum, min, max, step, zero = true){
    if (zero){
        return "$rand" + paramNum + " = random(" + min + ", " + max + ", "
            + step + ");";
    } else {
        return "$rand" + paramNum + " = non_zero_random(" + min + ", " + max
            + ", " + step + ");";
    }
}

/**
 * Creates the perl code for the initialization of a random variable that is a
 * string of any of the contents in the array. In this case, Releational
 * Operators
 *
 * @author Derek S. Prijatelj
 */
function randReOp(paramNum, reops){
    var init = "@reops" + paramNum + " = (\"";

    for(int i = 0; i < reops.length; i++){
        if (reops[i]s[i] === ">" || reops[i] === "<" || reops[i] === "<="
                || reops[i] === ">=" || reops[i] === "=" || reops[i] === "!="){
            init += reops[i]; 
            if (i < reops.length - 1){
                init += "\", \"";
            }
        }
    }
    init += "\");\n";

    init += "$randGen" + paramNum + " = random(0, " + (reops.length-1)
        + ", 1);\n";

    init += "$rand" + paramNum + " = $reops" + paramNum + "[$randGen" + paramNum
        + "];"

    return init;
}

/**
 * Creates the perl code for the initialization of a random variable that is a
 * string of any of the contents in the array, in this case Trigonometry
 * functions
 *
 * @author Derek S. Prijatelj
 */
function randTrig(paramNum, trigs){
    var init = "@trigs" + paramNum + " = (\"";

    for(int i = 0; i < trigs.length; i++){
        if (trigs[i]s[i] === "sin" || trigs[i] === "cos" || trigs[i] === "tan"
                || trigs[i] === "sec" || trigs[i] === "csc"
                || trigs[i] === "cot"){
            init += trigs[i]; 
            if (i < trigs.length - 1){
                init += "\", \"";
            }
        }
    }
    init += "\");\n";

    init += "$randGen" + paramNum + " = random(0, " + (trigs.length-1)
        + ", 1);\n";

    init += "$rand" + paramNum + " = $trigs" + paramNum + "[$randGen" + paramNum
        + "];"

    return init;
}
