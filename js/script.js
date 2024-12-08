var divCount = [0];
var semCount = 0;

function roundDown(n, p) {
    if (n.toString().charAt(4)=='9'){
        return Math.ceil(n * 100) / 100;
    }
    var power = 10 ** p;
    n *= power;
    return Math.floor(n) / power
}

function addCode(semCount) {
    //console.log(divCount)
    divCount[semCount] ++;
    //document.getElementById('calculator').innerHTML += 
    var toAdd= `<ul>
    <li><div class="course" id="` + divCount[semCount] + `">
    <input class="list courseInput" type="text" placeholder="Course Name" id="course` + divCount[semCount] + ` sem`+ semCount +`">
    <select id="letter` + divCount[semCount] + ` sem`+ semCount +`" class="list" onchange="computeGPA()">
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
    <input placeholder="Credits" class="infoInput1" id="cred`+divCount[semCount]+` sem`+ semCount +`" oninput="computeGPA()" type="number" min='0'></input>
</div></li>
</ul>`;
    document.getElementById("semCourse"+semCount).insertAdjacentHTML('beforeend',toAdd);
    //console.log('addcode');
}

function addSem() {
    semCount++;
    divCount.push(0);
    var toAdd = `<div class="semesterDivider" id="` + semCount + `">
            <input type="text" placeholder="Semester" class="semesterName" id="sem`+ semCount +`">
            <div id="semCourse` + semCount + `">
                <ul>
                    <li>
                        <div class="course" id="0">
                            <input class="list courseInput" type="text" placeholder="Course Name" id="course0 sem`+ semCount +`">
                            <select id="letter0 sem`+ semCount +`" class="list" onchange="computeGPA()">
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
                            <input placeholder="Credits" class="infoInput1" id="cred0 sem`+ semCount +`" oninput="computeGPA()" type="number" min='0'></input>
                        </div>
                    </li>
                </ul>
            </div>
            <div style="display: flex;">
                <button onclick="addCode(` + semCount + `)" class="btn btn-primary custom-buttons" style="margin-left: auto;margin-right: auto;">Add Course</button>
            </div>
            <div style="display: flex;">
                <h3 class="title2" id='added` + semCount + `' style="margin-left: auto;margin-right: auto;">GPA :</h3>
            </div>
        </div>`;
    document.getElementById("calculator").insertAdjacentHTML('beforeend',toAdd);
}

function computeGPA() {
    var allPoints = 0;
    var allCreds = 0;
    for (var i = 0; i <= semCount; i++) {
        var points = 0;
        var creds = 0;
        for (var j = 0; j <= divCount[i]; j++) {
            var point = parseFloat(document.getElementById('letter' + j+' sem'+i).value);
            if (isNaN(point)) {
                point = 0;
            }
            var credit = parseInt(document.getElementById('cred' + j+' sem'+i).value);
            if (isNaN(credit)) {
                credit = 0;
            }
            points += point * credit;
            creds += credit;  
        }
        allPoints += points;
        allCreds += creds;
        var gpa = points / creds
        if (gpa.toString().length > 4){
            gpa = roundDown(gpa, 2);
        }
        if (isNaN(gpa)) {
            gpa = 0;
        }
        document.getElementById('added' + i).innerHTML = 'GPA : ' + gpa;
    }
    var gpa = allPoints / allCreds;
    if (gpa.toString().length > 4){
        gpa = roundDown(gpa, 2);
    }
    if (isNaN(gpa)) {
        gpa = 0;
    }
    document.getElementById('cumulativegpa').innerHTML = 'Cumulative GPA : ' + gpa;
}

// make a function that will save divCount, semCount, and the values of the inputs for letter grades and credits
function saveData(){
    var data = {
        divCount: divCount,
        semCount: semCount
    }
    for (var i = 0; i <= semCount; i++) {
        for (var j = 0; j <= divCount[i]; j++) {
            data['letter' + j+' sem'+i] = document.getElementById('letter' + j+' sem'+i).value;
            data['cred' + j+' sem'+i] = document.getElementById('cred' + j+' sem'+i).value;
            data['course' + j+' sem'+i] = document.getElementById('course' + j+' sem'+i).value;
        }
        data['sem' + i] = document.getElementById('sem' + i).value;
    }
    localStorage.setItem('data', JSON.stringify(data));
}

// make a function that will load the data from localStorage
function loadData(){
    var data = JSON.parse(localStorage.getItem('data'));
    if (data){
        if (data.semCount>0){
            for (var i = 0; i < data.semCount; i++){
                addSem();
            }
        }
        semCount = data.semCount;
        for (var i = 0; i <= semCount; i++) {
            if (data.divCount[i]>0){
                for (var j = 0; j < data.divCount[i]; j++){
                    addCode(i);                }
            }
        }
        divCount = data.divCount;

        for (var i = 0; i <= semCount; i++) {
            for (var j = 0; j <= divCount[i]; j++) {
                document.getElementById('letter' + j+' sem'+i).value = data['letter' + j+' sem'+i];
                document.getElementById('cred' + j+' sem'+i).value = data['cred' + j+' sem'+i];
                document.getElementById('course' + j+' sem'+i).value = data['course' + j+' sem'+i];
            }
            document.getElementById('sem' + i).value = data['sem' + i];
        }
        computeGPA();
    }
}

function delData(){
    localStorage.removeItem('data');
}