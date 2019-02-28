class Workers {
    constructor(name, age, spec, exp, salary, gender) {
        this.name = name;
        this.age = age;
        this.spec = spec;
        this.exp = exp;
        this.salary = salary;
        this.gender = gender;
    }
    get getName() {
        return this.name;
    };
    /**
     * @param {any} name
     */
    set setName(name) {
        this.name = name;
    };
    get getAge() {
        return this.age;
    };
    /**
     * @param {any} age
     */
    set setAge(age) {
        this.age = age;
    };
    get getSpec() {
        return this.spec;
    };
    /**
     * @param {any} spec
     */
    set setSpec(spec) {
        this.spec = spec;
    };
    get getExp() {
        return this.exp;
    };
    /**
     * @param {any} exp
     */
    set setExp(exp) {
        this.exp = exp;
    };
    get getSalary() {
        return this.salary;
    };
    /**
     * @param {any} salary
     */
    set setSalary(salary) {
        this.salary = salary;
    };
    get getGender() {
        return this.gender;
    };
    /**
     * @param {any} gender
     */
    set setGender(gender) {
        this.gender = gender;
    };
}

class Factory_Worker extends Workers {
    constructor(name, age, spec, exp, salary, gender, factory, workshop) {
        super(name, age, spec, exp, salary, gender);
        this.factory = factory;
        this.workshop = workshop;
    }
    get getFactory() {
        return this.factory;
    };
    /**
     * @param {any} factory
     */
    set setFactory(factory) {
        this.factory = factory;
    };
    get getWorkshop() {
        return this.workshop;
    };
    /**
     * @param {any} workshop
     */
    set setWorkshop(workshop) {
        this.workshop = workshop;
    };
}

class Realway_Worker extends Workers {
    constructor(name, age, spec, exp, salary, gender, realway, train) {
        super(name, age, spec, exp, salary, gender);
        this.realway = realway;
        this.train = train;
    }
    get getRealway() {
        return this.realway;
    };
    /**
     * @param {any} realway
     */
    set setRealway(realway) {
        this.realway = realway;
    };
    get getTrain() {
        return this.train;
    };
    /**
     * @param {any} train
     */
    set setTrain(train) {
        this.train = train;
    };
}

/* Create */
function CreateWorker(name, age, spec, exp, salary, gender, factory, workshop, realway, train) {
    if (factory !== undefined || workshop !== undefined) {
        var worker = new Factory_Worker(name, age, spec, exp, salary, gender, factory, workshop);
    } 
    else if (realway !== undefined || train !== undefined) {
        var worker = new Realway_Worker(name, age, spec, exp, salary, gender, realway, train);
    } 
    else if (realway == undefined && train == undefined && factory == undefined && workshop == undefined) {
        var worker = new Workers(name, age, spec, exp, salary, gender)
    }
    else {
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
    if(upd_worker.factory !== undefined || upd_worker.workshop !== undefined) {
        for (var i in factory_work) {
            factory_work[i] = upd_worker[i];
        }
        return factory_work;
    } 
    else if(upd_worker.realway !== undefined || upd_worker.train !== undefined) {
        for (var i in upd_worker) {
            realway_work[i] = upd_worker[i];
        }
        return realway_work;
    }
    else if(upd_worker.realway == undefined && upd_worker.train == undefined && 
            upd_worker.factory == undefined && upd_worker.workshop == undefined) {
        for (var i in work) {
            work[i] = upd_worker[i];
        }
        return work;
    }
    else {
        console.log("Error of update");
    }
}


/* Delete */
function DeleteWorker(json_worker) {
    var upd_worker = JSON.parse(json_worker);
    if(upd_worker.factory !== undefined || upd_worker.workshop !== undefined) {
        factory_work = undefined;
    }
    else if(upd_worker.realway !== undefined || upd_worker.train !== undefined) {
        realway_work = undefined;
    }
    else {
        work = undefined;
    }
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
console.log(UpdateWorker(CreateWorker("Victor", 45, undefined, "No level", undefined, undefined, undefined, undefined, undefined, "5851-06")));
DeleteWorker(jsonrwork);
console.log(work);
console.log(factory_work);
console.log(realway_work);