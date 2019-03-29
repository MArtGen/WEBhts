function onRead(response, tables) {
    console.log(response);
    if(response.Friends !== undefined) result = response.Friends;
    else result = response.value;
    var resultTBody = document.createElement('tbody');
    var visAir = document.getElementById('airTab');
    var visPeo = document.getElementById('peoTab');
    if(tables == 'airports') {
        visAir.hidden = false;
        visPeo.hidden = true;
        result.map(function (newResp) {
            resultTBody.appendChild(parseAirToTableRow(newResp));
        });
        var table1 = document.getElementById('aTBody').parentElement;
        table1.replaceChild(resultTBody, document.getElementById('aTBody'));
        resultTBody.id = 'aTBody';
    }
    else {
        visAir.hidden = true;
        visPeo.hidden = false;
        result.map(function (newResp) {
            resultTBody.appendChild(parseRespToTableRow(newResp));
        });
        var table2 = document.getElementById('rTBody').parentElement;
        table2.replaceChild(resultTBody, document.getElementById('rTBody'));
        resultTBody.id = 'rTBody';
    }

    console.log('success');
}

function onCount(response) {
    alert("Count of all request data: " + response['@odata.count']);
}

function parseRespToTableRow(Resps) {
    var row = document.createElement('tr');

    fname = document.createElement('td');
    fname.innerText = Resps['FirstName'];
    row.appendChild(fname);

    lname = document.createElement('td');
    lname.innerText = Resps['LastName'];
    row.appendChild(lname);

    uname = document.createElement('td');
    uname.innerText = Resps['UserName'];
    row.appendChild(uname);

    gender = document.createElement('td');
    gender.innerText = Resps['Gender'];
    row.appendChild(gender);

    conc = document.createElement('td');
    conc.innerText = Resps['Concurrency'];
    row.appendChild(conc);

    email = document.createElement('td');
    email.innerText = Resps['Emails'];
    row.appendChild(email);

    return row;
}

function parseAirToTableRow(Resps) {
    var row = document.createElement('tr');

    iata = document.createElement('td');
    iata.innerText = Resps['IataCode'];
    row.appendChild(iata);

    icao = document.createElement('td');
    icao.innerText = Resps['IcaoCode'];
    row.appendChild(icao);

    nname = document.createElement('td');
    nname.innerText = Resps['Name'];
    row.appendChild(nname);

    return row;
}

function reading(str, tables) {
    var filter = str
    $.ajax({
        url: "https://services.odata.org/V4/TripPinServiceRW/" + filter,
        type: 'GET',
        datatype: 'json',
        success: function (response) {
            if (response['@odata.count'] !== undefined) onCount(response);
            else onRead(response, tables);
        },
        error: function () {
            console.log("Error of request");
        }
    });
    console.log("Reading")
}

$(function(){
    $('#1button').bind('click', function() { reading('People?$count=true'); });
    $('#2button').bind('click', function() { reading("People('keithpinckney')?$expand=Friends"); });
    $('#3button').bind('click', function() { reading('People?$orderby=LastName desc'); });
    $('#4button').bind('click', function() { reading('People?$search=Russell'); });
    $('#5button').bind('click', function() { reading('People?$select=FirstName, LastName'); });
    $('#6button').bind('click', function() { reading('People?$skip=10'); });
    $('#7button').bind('click', function() { reading('People?$top=2'); });
    $('#8button').bind('click', function() { reading("People?$filter=LastName eq 'Alfred'"); });
    $('#9button').bind('click', function() { reading("Airports?$filter=contains(Location/City/Region, 'California')", "airports"); });
    $('#10button').bind('click', function() { reading("Airports?$filter=IataCode eq 'CIA'&IcaoCode eq 'LIRA'&Name eq 'Rome Ciampino Airport'", "airports"); });
});