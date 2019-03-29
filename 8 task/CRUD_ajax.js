class Workers {
    constructor (name, age, spec, exp, salary, gender) {
        this.id = randomInteger(1000, 9999);
        this.name = name;
        this.age = age;
        this.spec = spec;
        this.exp = exp;
        this.salary = salary;
        this.gender = gender;
    };

    static randomInteger(min, max) {
        var rand = min - 0.5 + Math.random() * (max - min + 1)
        rand = Math.round(rand);
        return rand;
    };

    get getName()   { return this.name;   }
    get getAge()    { return this.age;    }
    get getSpec()   { return this.spec;   }
    get getExp()    { return this.exp;    }
    get getSalary() { return this.salary; }
    get getGender() { return this.gender; }
    set setName(name)     { this.name = name;    }
    set setAge(age)       { this.age = age;      }
    set setSpec(spec)     { this.spec = spec;    }
    set setExp(exp)       {this.exp = exp;       }
    set setSalary(salary) {this.salary = salary; }
    set setGender(gender) {this.gender = gender; }
};

class Factory_Worker extends Workers {
    constructor(name, age, spec, exp, salary, gender, factory, workshop) {
        super(this, arguments);
        this.factory = factory;
        this.workshop = workshop;
    };

    get getFactory()  { return this.factory;  }
    get getWorkshop() { return this.workshop; }
    set setFactory(factory)   { this.factory = factory;   }
    set setWorkshop(workshop) { this.workshop = workshop; } 
};

class Realway_Worker extends Workers {
    constructor(name, age, spec, exp, salary, gender, realway, train) {
        super(this, arguments);
        this.realway = realway;
        this.train = train;
    };

    get getRealway() { return this.realway; }
    get getTrain()   { return this.train;   }
    set setRealway(realway) { this.realway = realway; }
    set setTrain(train)     { this.train = train;     }
};

/* For sending to server (object Worker)*/
function onCreate() {
    console.log("Creating");
    var newdata = ({
        name: $('#cname').val(),
        age: $('#cage').val(),
        spec: $('#cspec').val(),
        exp: $('#cexp').val(),
        salary: $('#csal').val(),
        gender: $('#cgen').val(),
    });
    console.log(newdata);
    $.ajax({
        url: "http://195.50.2.67:2403/zmag-collection/",
        type: 'POST',
        datatype: 'json',
        data: newdata,
        success: function (result) {
            alert("Create was successful");
        },
        error: function () {
            alert("Error of creating");
        }
    });
}

function onRead() {
    console.log('Reading');
    $.ajax({
        url: "http://195.50.2.67:2403/zmag-collection/",
        type: 'GET',
        datatype: 'json',
        success: function (response) {
            $('#rTBody tr').remove();
            for (i=0; i<response.length; i++) {
                $('#WorkersTalbe > tbody:last-child').append('<tr><td>' + response[i].id     + '</td>' +
                                                                 '<td>' + response[i].name   + '</td>' +
                                                                 '<td>' + response[i].age    + '</td>' +
                                                                 '<td>' + response[i].spec   + '</td>' +
                                                                 '<td>' + response[i].exp    + '</td>' +
                                                                 '<td>' + response[i].salary + '</td>' +
                                                                 '<td>' + response[i].gender + '</td></tr>');
            }
        },
        error: function () {
            alert("Error of reading");
        }
    });
}

function preparetoUpd() {
    $.ajax({
        url: "http://195.50.2.67:2403/zmag-collection/",
        type: 'GET',
        datatype: 'json',
        success: function (response) {
            if($('#uid > option').length < response.length) {
                for (i=0; i<response.length; i++) {
                    $('#uid').append('<option>' + response[i].id + '</option>');
                };
            };
        },
        error: function () {
            console.log("Error of preparing");
        }
    });
};

function onUpdate(id) {
    var updObj = ({
        name: $('#uname').val(),
        age: $('#uage').val(),
        spec: $('#uspec').val(),
        exp: $('#uexp').val(),
        salary: $('#usal').val(),
        gender: $('#ugen').val(),
    });
    let promise = new Promise((resolve, reject) => {
        console.log("Updating")
        $.ajax({
            url: "http://195.50.2.67:2403/zmag-collection/" + id,
            type: 'PUT',
            datatype: 'json',
            data: updObj,
            success: function () {
                console.log("Update was successful");
                resolve("success");
            },
            error: function () {
                console.log("Error of updating");
                reject("error");
            }
        });
    })
    promise.then(
        success => {
            alert("Fulfilled: " + success);
        },
        error => {
            alert("Rejected: " + error);
        }
    )
}

function onDelete(id) {
    console.log("Deleting");
    $.ajax({
        url: "http://195.50.2.67:2403/zmag-collection/" + id,
        type: 'DELETE',
        datatype: 'json',
        success: function () {
            alert("Delete was successful");
        },
        error: function () {
            alert("Error of deleting");
        }
    });
}

$(function(){
    $('#rbutton').click( function() {
        onRead(); 
    });
    $('#cbutton').click( function(ev) {
        ev.preventDefault();
        onCreate(); 
    });
    $('#uid').click( function(ev) {
        ev.preventDefault();
        preparetoUpd(); 
    });
    $('#pubutton').click( function(ev) {
        ev.preventDefault();
        $('#uid > option').remove();
    });
    $('#ubutton').click( function(ev) {
        ev.preventDefault();
        onUpdate($('#uid').val()); 
    });
    $('#dbutton').click( function(ev) {
        ev.preventDefault();
        onDelete($('#did').val()); 
    });
});