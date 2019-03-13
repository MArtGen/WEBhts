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

    xhr.open("POST", "http://195.50.2.67:2403/zmag-collection");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
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
            console.log('success');
        }
    });

    xhr.open("GET", "http://195.50.2.67:2403/zmag-collection");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
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

    xhrids.open("GET", "http://195.50.2.67:2403/zmag-collection");
    xhrids.setRequestHeader("Content-Type", "application/json");
    xhrids.send();
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

    xhr.open("PUT", "http://195.50.2.67:2403/zmag-collection/"+document.getElementById("uid").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
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

    xhr.open("DELETE", "http://195.50.2.67:2403/zmag-collection/"+document.getElementById("did").value);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
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
    return row;
}

(function () {
    document.getElementById('cbutton').addEventListener(
        'click', onCreate
    );
    document.getElementById('rbutton').addEventListener(
        'click', onRead
    );
    document.getElementById('ubutton').addEventListener(
        'click', onUpdate
    );
    document.getElementById('pubutton').addEventListener(
        'click', onPrepareUpdate
    );
    document.getElementById('dbutton').addEventListener(
        'click', onDelete
    );
    console.log('Handlers is set')
})()