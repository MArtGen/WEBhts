function Workers(name, age, spec, exp, salary, gender) {
    this.id = randomInteger(1000, 9999);
    this.name = name;
    this.age = age;
    this.spec = spec;
    this.exp = exp;
    this.salary = salary;
    this.gender = gender;

    function randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    }
};
Workers.prototype.getId = function () {
    return this.id;
};
Workers.prototype.setId = function (id) {
    this.id = id;
};
Workers.prototype.getName = function () {
    return this.name;
};
Workers.prototype.setName = function (name) {
    this.name = name;
};
Workers.prototype.getAge = function () {
    return this.age;
};
Workers.prototype.setAge = function (age) {
    this.age = age;
};
Workers.prototype.getSpec = function () {
    return this.spec;
};
Workers.prototype.setSpec = function (spec) {
    this.spec = spec;
};
Workers.prototype.getExp = function () {
    return this.exp;
};
Workers.prototype.setExp = function (exp) {
    this.exp = exp;
};
Workers.prototype.getSalary = function () {
    return this.salary;
};
Workers.prototype.setSalary = function (salary) {
    this.salary = salary;
};
Workers.prototype.getGender = function () {
    return this.gender;
};
Workers.prototype.setGender = function (gender) {
    this.gender = gender;
};


function Factory_Worker(name, age, spec, exp, salary, gender, factory, workshop) {
    Workers.apply(this, arguments);
    this.factory = factory;
    this.workshop = workshop;
};
Factory_Worker.prototype.getFactory = function () {
    return this.factory;
};
Factory_Worker.prototype.setFactory = function (factory) {
    this.factory = factory;
};
Factory_Worker.prototype.getWorkshop = function () {
    return this.workshop;
};
Factory_Worker.prototype.setWorkshop = function (workshop) {
    this.workshop = workshop;
};

function Realway_Worker(name, age, spec, exp, salary, gender, realway, train) {
    Workers.apply(this, arguments);
    this.realway = realway;
    this.train = train;
};
Realway_Worker.prototype.getRealway = function () {
    return this.realway;
};
Realway_Worker.prototype.setRealway = function (realway) {
    this.realway = realway;
};
Realway_Worker.prototype.getTrain = function () {
    return this.train;
};
Realway_Worker.prototype.setTrain = function (train) {
    this.train = train;
};

/*For testing to localhost*/
/* Create */
function CreateWorker(name, age, spec, exp, salary, gender, factory, workshop, realway, train) {
    if (factory !== undefined || workshop !== undefined) {
        var worker = new Factory_Worker(name, age, spec, exp, salary, gender, factory, workshop);
    } else if (realway !== undefined || train !== undefined) {
        var worker = new Realway_Worker(name, age, spec, exp, salary, gender, realway, train);
    } else if (realway == undefined && train == undefined && factory == undefined && workshop == undefined) {
        var worker = new Workers(name, age, spec, exp, salary, gender)
    } else {
        console.log("Error of create");
    };
    return JSON.stringify(worker);
}

/* Read */
function ReadWorker(json_worker) {
    var worker = JSON.parse(json_worker);
    return worker;
}

/* Update */
function UpdateWorker(json_worker) {
    var upd_worker = JSON.parse(json_worker);
    if (upd_worker.factory !== undefined || upd_worker.workshop !== undefined) {
        for (var i in factory_work) {
            factory_work[i] = upd_worker[i];
        }
        return factory_work;
    } else if (upd_worker.realway !== undefined || upd_worker.train !== undefined) {
        for (var i in upd_worker) {
            realway_work[i] = upd_worker[i];
        }
        return realway_work;
    } else if (upd_worker.realway == undefined && upd_worker.train == undefined &&
        upd_worker.factory == undefined && upd_worker.workshop == undefined) {
        for (var i in work) {
            work[i] = upd_worker[i];
        }
        return work;
    } else {
        console.log("Error of update");
    }
}


/* Delete */
function DeleteWorker(json_worker) {
    var upd_worker = JSON.parse(json_worker);
    if (upd_worker.factory !== undefined || upd_worker.workshop !== undefined) {
        factory_work = undefined;
    } else if (upd_worker.realway !== undefined || upd_worker.train !== undefined) {
        realway_work = undefined;
    } else {
        work = undefined;
    }
}

/* For sending to server (object Worker)*/
function onCreate(ev) {
    ev.preventDefault();

    var data = JSON.stringify({
        "name": String(document.getElementById("cname").value),
        "age": Number(document.getElementById("cage").value),
        "spec": String(document.getElementById("cspec").value),
        "exp": String(document.getElementById("cexp").value),
        "salary": Number(document.getElementById("csal").value),
        "gender": String(document.getElementById("cgen").value)
    });

    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert(this.responseText);
            document.getElementById("createForm").dispatchEvent(new Event('submit'));
        } 
    });
}

function onRead() {
    console.log('Reading');
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.response);
            result=JSON.parse(this.response);
            var resultTBody=document.createElement('tbody');
            result.map(function(nthWorker){
                resultTBody.appendChild(parseWorkerToTableRow(nthWorker));
            });
            var table=document.getElementById('rTBody').parentElement;
            table.replaceChild(resultTBody,document.getElementById('rTBody'));
            resultTBody.id='rTBody';
        }
    });
}

function onPrepareUpdate(ev){
    ev.preventDefault();
    xhrids = new XMLHttpRequest();
    xhrids.withCredentials = true;
    xhrids.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            result=JSON.parse(this.response);
            var ids=document.createElement('select');
            ids.className='form-control';
            result.map(function(nthWorker){
                var id=document.createElement('option');
                id.innerHTML=nthWorker['id'];
                ids.appendChild(id);
            });
            var form=document.getElementById('uid').parentElement;
            form.replaceChild(ids,document.getElementById('uid'));
            ids.id='uid';
        }
    });
}

function onUpdate(ev) {
    ev.preventDefault();  
    var data = JSON.stringify({
        "name": String(document.getElementById("uname").value),
        "age": Number(document.getElementById("uage").value),
        "spec": String(document.getElementById("uspec").value),
        "exp": String(document.getElementById("uexp").value),
        "salary": Number(document.getElementById("usal").value),
        "gender": String(document.getElementById("ugen").value)
    });
    console.log(data);
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
}

function onDelete(ev) {
    ev.preventDefault();
    xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            console.log(this.responseText);
        }
    });
}

function parseWorkerToTableRow(Workers){
    var row=document.createElement('tr');

    id=document.createElement('th');
    id.innerText=Workers['id'];
    row.appendChild(id);

    wname=document.createElement('td');
    wname.innerText=Workers['name'];
    row.appendChild(wname);

    age=document.createElement('td');
    age.innerText=Workers['age'];
    row.appendChild(age);

    spec=document.createElement('td');
    spec.innerText=Workers['spec'];
    row.appendChild(spec);

    exp=document.createElement('td');
    exp.innerText=Workers['exp'];
    row.appendChild(exp);

    salary=document.createElement('td');
    salary.innerText=Workers['salary'];
    row.appendChild(salary);

    gender=document.createElement('td');
    gender.innerText=Workers['gender'];
    row.appendChild(gender);
    console.log(row);
    return row;
}

/* Test */
var work = new Workers("Vasia", 22, "Maintenance", "High level", 1000, "M");
var factory_work = new Factory_Worker("Olga", 23, "Carpenter", "Middle level", 750, "F", "MZOR", "12");
var realway_work = new Realway_Worker("Petia", 24, "Sinker", "Low level", 500, "M", "Minsk-Moskva", "4821-05");

var jsonwork = JSON.stringify(work);
var jsonfwork = JSON.stringify(factory_work);
var jsonrwork = JSON.stringify(realway_work);

console.log(CreateWorker("Vazgen", 45, "Sympathetic", "No level", 0, "M", undefined, undefined, "Moskva-Minsk", "5142-06"));
console.log(ReadWorker(jsonfwork));
console.log(UpdateWorker(CreateWorker("Victor", 45, undefined, "No level", undefined, undefined, undefined, undefined, undefined, "7851-06")));
DeleteWorker(jsonrwork);
console.log(work);
console.log(factory_work);
console.log(realway_work);