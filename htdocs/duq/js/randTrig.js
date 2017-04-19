function randTrig(randVarNum,randTagsIn) //rename
{
    //both min and max are inclusive
    var maxSlot = randTagsIn.length;
    var minSlot = 0;
    addingString1 = "@Input1DArray = (";
    for (i = 0; i < maxSlot-1; i++){
        addingString1 += "\"" + randTagsIn[i] + "\",";    //not sure if it needs commas (for strings)
    }
    addingString1 += "\"" + randTagsIn[maxSlot-1] + "\");"
    var addingString12 = "$randVar" + randVarNum + " = random("+minSlot+"," + (maxSlot -1) + ",1);";

    var addingString3 = "$trigFunc"+ randVarNum +"  = Formula($Input1DArray[$randNum"+ randVarNum +"]);";
    var addingString4 = "$trigDeriv = $trigFunc" + randVarNum + "->D();";     //might need to add back in

    return "END_PGML\n" + addingString1 +"\n" + addingString12 +"\n" + addingString3 + "\n" + addingString4 + "\nBEGIN_PGML";
}