/* var GPA = 0;
var totCreds = 0;

function getLetGrade(elem) {
    var letGrade = parseFloat(document.getElementById('letter').value);
    var credits = parseInt(document.getElementById('cred').value);
    console.log(letGrade, credits, totCreds, GPA);
    if (totCreds === 0) {
        totCreds = credits;
    } else {
        totCreds += credits;
    }

    GPA = (letGrade * credits) / totCreds;
    GPA = GPA.toFixed(2)
    console.log(letGrade, credits, totCreds, GPA);

    document.getElementById('added').innerHTML = 'GPA: ' + GPA;
    console.log(elem.parentNode.id);
} */
var GPA = 0;
var totCreds = [0];
var totGrades = [0];

function roundDown(n, p) {
    var power = 10 ** p;
    n *= power;
    return Math.floor(n) / power
}

function getLetGrade(elem, count) {
    var letGrade = parseFloat(document.getElementById('letter' + count).value);
    var credits = parseInt(document.getElementById('cred' + count).value);
    if (credits<0){
        document.getElementById("cred"+elem.parentNode.id).style.borderColor="red";
        document.getElementById("cred"+elem.parentNode.id).style.boxShadow="0 0 10px red";
        //console.log(elem.parentNode.id);
        credits=0;
        alert("Credits must be greater than or equal to 0");
    }
    else if (credits>=0){
        document.getElementById("cred"+elem.parentNode.id).style.borderColor="white";
        document.getElementById("cred"+elem.parentNode.id).style.boxShadow="0 0 0 white";
        //console.log(elem.parentNode.id);
    }
    if (isNaN(credits)){
        credits=0;
    }
    //console.log(letGrade, credits, totCreds, GPA);
    totCreds[elem.parentNode.id] = credits;
    totGrades[elem.parentNode.id] = letGrade;

    GPA = getGPA(totGrades, totCreds);
    GPA = parseFloat(GPA);
    //console.log(letGrade, credits, totGrades, totCreds, GPA);
    if (isNaN(GPA)) {
        GPA = 0;
    }
    //console.log(GPA);
    document.getElementById('added').innerHTML = 'GPA : ' + roundDown(GPA, 2);
    //console.log(elem.parentNode.id);
    //console.log('getletgrade');
}

function getGPA(totGrades, totCreds) {
    var gradesAdd = 0;
    var credsAdd = 0;
    len = totGrades.length;
    for (var i = 0; i < len; i++) {
        gradesAdd += totGrades[i] * totCreds[i];
        credsAdd += totCreds[i];
    }
    //console.log('getgpa');
    //console.log(gradesAdd,credsAdd)
    return gradesAdd / credsAdd;
}

var divCount = 0;

/* function addCode2(){
    divCount++;
    document.getElementById(1).style.display='inline';
} */

function addCode() {
    //console.log(divCount)
    divCount ++;
    //document.getElementById('calculator').innerHTML += 
    var toAddOld= `<ul>
    <li><div class="course" id="` + divCount + `">
    <input class="list courseInput" type="text" placeholder="Course Name">
    <select id="letter` + divCount + `" class="list" onchange="getLetGrade(this,` + divCount + `),getCumulativeGPA()">
        <option value="0">Letter Grade</option>
        <option value="4.3">A+</option>
        <option value="4">A</option>
        <option value="3.7">A-</option>
        <option value="3.3">B+</option>
        <option value="3">B</option>
        <option value="2.7">B-</option>
        <option value="2.3">C+</option>
        <option value="2">C</option>
        <option value="1.7">C-</option>
        <option value="1.3">D+</option>
        <option value="1">D</option>
        <option value="0">F</option>
    </select>
    <select id="cred` + divCount + `" class="list" onchange="getLetGrade(this,` + divCount + `),getCumulativeGPA()">
        <option value="0">Credits</option>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
    </select>
</div></li>
</ul>`;
    var toAdd= `<ul>
    <li><div class="course" id="` + divCount + `">
    <input class="list courseInput" type="text" placeholder="Course Name">
    <select id="letter` + divCount + `" class="list" onchange="getLetGrade(this,` + divCount + `),getCumulativeGPA()">
        <option value="0">Letter Grade</option>
        <option value="4.3">A+</option>
        <option value="4">A</option>
        <option value="3.7">A-</option>
        <option value="3.3">B+</option>
        <option value="3">B</option>
        <option value="2.7">B-</option>
        <option value="2.3">C+</option>
        <option value="2">C</option>
        <option value="1.7">C-</option>
        <option value="1.3">D+</option>
        <option value="1">D</option>
        <option value="0">F</option>
    </select>
    <input placeholder="Credits" class="infoInput1" id="cred`+divCount+`" oninput="getLetGrade(this,`+divCount+`),getCumulativeGPA()" type="number" min='0'></input>
</div></li>
</ul>`;
    document.getElementById("calculator").insertAdjacentHTML('beforeend',toAdd);
    //GPA = 0;
    totCreds.push(0);
    totGrades.push(0);
    //console.log('addcode');
}

function getCumulativeGPA() {
    var prevGPA = parseFloat(document.getElementById("prevgpa").value);
    var prevCreds = parseFloat(document.getElementById("prevcreds").value);
    if (prevGPA<0){
        document.getElementById("prevgpa").style.borderColor="red";
        document.getElementById("prevgpa").style.boxShadow="0 0 10px red";
        //console.log(elem.parentNode.id);
        prevGPA=0;
        alert("GPA must be between 0 and 4.3 (included)");
    }
    else if(prevGPA>4.3){
        document.getElementById("prevgpa").style.borderColor="red";
        document.getElementById("prevgpa").style.boxShadow="0 0 10px red";
        //console.log(elem.parentNode.id);
        prevGPA=4.3;
        alert("GPA must be between 0 and 4.3 (included)");
    }
    else{
        document.getElementById("prevgpa").style.borderColor="white";
        document.getElementById("prevgpa").style.boxShadow="0 0 0 white";
        //console.log(elem.parentNode.id);
    }
    if (prevCreds<0){
        document.getElementById("prevcreds").style.borderColor="red";
        document.getElementById("prevcreds").style.boxShadow="0 0 10px red";
        //console.log(elem.parentNode.id);
        prevCreds=0;
        alert("Credits must be greater than or equal to 0");
    }
    else if (prevCreds>=0){
        document.getElementById("prevcreds").style.borderColor="white";
        document.getElementById("prevcreds").style.boxShadow="0 0 0 white";
        //console.log(elem.parentNode.id);
    }
    var credits = 0;
    for (var i = 0; i < totCreds.length; i++) {
        credits += totCreds[i];
    }
    var GPA = getGPA(totGrades, totCreds);
    if (isNaN(GPA)) {
        GPA = 0;
    }
    //console.log(prevGPA,prevCreds,GPA,credits,prevCreds,credits);
    var newGPA = (prevGPA * prevCreds + GPA * credits) / (prevCreds + credits);
    //console.log(newGPA);
    if (isNaN(newGPA)) {
        newGPA = 0;
    }
    //console.log(prevGPA,prevCreds,newGPA,credits);
    document.getElementById("cumulativegpa").innerHTML = "Cumulative GPA: " + roundDown(newGPA, 2);
    //console.log('getcumulgpa');
}