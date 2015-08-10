function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCredentials() {
    var id = getCookie("id");
    var token = getCookie("token");
    if (id == "" || token == "") {
        window.location.href = "index.html"
    }
}

function readCMS_connect(id_in, token_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/cms/read/" + id_in
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                $('#CMSname').append(r.responseJSON.name);
            } else
                alert("Error al leer el centro");

        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function readEvents_connect(id_in, token_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/events/"
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "GET",
        crossDomain: true,
        data: {},
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                for (i in r.responseJSON.events) {
                    var eventData = r.responseJSON.events[i];
                    //"2015-05-23;11:15"
                    var day = eventData.date.substring(8, 10);
                    var month = monthString(eventData.date.substring(5, 7));
                    var hour = eventData.date.substring(11, 16);
                    console.log(eventData);
                    if (i % 2 == 0) {
                        $('#eventlist').append('<li><time style="background-color:#710096"><span class="day">' + day + '</span><span class="month">' + month + '</span></time><div class="info"><h2 class="title">' + eventData.name + '</h2><p class="desc">' + eventData.text + '</p><p class="desc" style="color:#f15900">Hora:<span style="color:black"> ' + hour + '</span></p></div></li>');

                    } else {
                        $('#eventlist').append('<li><time style="background-color:#f15900"><span class="day">' + day + '</span><span class="month">' + month + '</span></time><div class="info"><h2 class="title" style="color:#710096">' + eventData.name + '</h2><p class="desc">' + eventData.text + '</p><p class="desc" style="color:#710096">Hora:<span style="color:black"> ' + hour + '</span></p></div></li>');

                    }
                }
            } else
                alert("Error al leer los eventos");

        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function monthString(month_in) {
    var monthDesc = "";
    if (month_in == "01") {
        monthDesc = "ENE";
    }
    if (month_in == "02") {
        monthDesc = "FEB";
    }
    if (month_in == "03") {
        monthDesc = "MAR";
    }
    if (month_in == "04") {
        monthDesc = "ABR";
    }
    if (month_in == "05") {
        monthDesc = "MAY";
    }
    if (month_in == "06") {
        monthDesc = "JUN";
    }
    if (month_in == "07") {
        monthDesc = "JUL";
    }
    if (month_in == "08") {
        monthDesc = "AGO";
    }
    if (month_in == "09") {
        monthDesc = "SEP";
    }
    if (month_in == "10") {
        monthDesc = "OCT";
    }
    if (month_in == "11") {
        monthDesc = "NOV";
    }
    if (month_in == "12") {
        monthDesc = "DIC";
    }
    return monthDesc;
}
