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

var GPA=0;
var totCreds=[];
var totGrades=[];

function getLetGrade(elem,count) {
    var letGrade = parseFloat(document.getElementById('letter'+count).value);
    var credits = parseInt(document.getElementById('cred'+count).value);
    console.log(letGrade, credits, totCreds, GPA);
    totCreds[elem.parentNode.id]=credits;
    totGrades[elem.parentNode.id]=letGrade;

    GPA = getGPA(totGrades,totCreds);
    GPA = parseFloat(GPA);
    console.log(letGrade, credits, totCreds, totGrades, GPA);
    if (isNaN(GPA)){
        GPA=0;
    }
    document.getElementById('added').innerHTML = 'GPA: ' + GPA.toFixed(2);
    console.log(elem.parentNode.id);
}

function getGPA(totGrades,totCreds){
    var gradesAdd=0;
    var credsAdd=0;
    len=totGrades.length;
    for (var i=0;i<len;i++){
        gradesAdd+=totGrades[i]*totCreds[i];
        credsAdd+=totCreds[i];
    }
    return gradesAdd/credsAdd;
}

var divCount = 0;

function addCode() {
    console.log(divCount)
    divCount += 1
    document.getElementById('calculator').innerHTML += `<div id="` + divCount + `">
    <textarea rows="1" placeholder="Course Name"></textarea>
    <select name="" id="letter` + divCount + `" class="list" onchange="getLetGrade(this,` + divCount + `)">
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
    </select>
    <select name="" id="cred` + divCount + `" class="list" onchange="getLetGrade(this,` + divCount + `)">
        <option value="0">Credits</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
    </select>
    </div>`;
    GPA=0;
    totCreds=[];
    totGrades=[];
}

function getCumulativeGPA(){
    var prevGPA = parseFloat(document.getElementById("prevgpa").value);
    var prevCreds = parseFloat(document.getElementById("prevcreds").value);
    var credits=0;
    for (var i=0;i<totCreds.length;i++) {
        credits+=totCreds[i];
    }
    var newGPA= (prevGPA*prevCreds+getGPA(totGrades,totCreds)*credits)/(prevCreds+credits);
    if (isNaN(newGPA)){
        newGPA=0;
    }
    document.getElementById("cumulativegpa").innerHTML="Cumulative GPA: "+newGPA.toFixed(2);
}