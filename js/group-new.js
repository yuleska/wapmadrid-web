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

function readallRoutes_connect() {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRoute = urlBase + "/api/routes/all"
    $.ajax({
        url: urlRoute,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "GET",
        crossDomain: true,
        data: {},
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                var selectRoute = document.getElementById('Route');
                for (i in r.responseJSON.routes) {
                    var text = r.responseJSON.routes[i].name;
                    var value = r.responseJSON.routes[i]._id;
                    selectRoute.options.add(new Option(text, value));
                }
            } else
                alert("Error al leer las rutas");

        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function readCMS_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
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

function readWappies_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/walker/list/" + id_in
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
                var selectCaptain = document.getElementById('Captain');
                for (i in r.responseJSON.walkers) {
                    var text = r.responseJSON.walkers[i].walkerID.displayName;
                    var value = r.responseJSON.walkers[i].walkerID._id;
                    selectCaptain.options.add(new Option(text, value));
                }
            } else
                alert("Error al leer los wappies");

        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function newGroup(id_in, token_in) {
    var name = document.getElementById('NameEvent').value;
    var dateEvent = document.getElementById('DateEvent').value;
    var timeEvent = document.getElementById('TimeEvent').value;
    var description = document.getElementById('Description').value;
    if (name == "" || dateEvent == "" || timeEvent == "" || description == "" ) {
        alert("Se deben rellenar todos los campos");
    } else {
        var date = dateEvent +";" +timeEvent;
        newEvent_connect(id_in, token_in, name, date, description);
    }
}

function logout_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/logout/" + id_in
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
                document.cookie = "id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "id_walker=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                window.location.href = "index.html";
            } else
                alert("Error al cerrar sesion");
            return null;
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}
