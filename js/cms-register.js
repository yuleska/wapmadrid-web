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
    var id = getCookie("id_admin");
    var token = getCookie("token_admin");
    if (id == "" || token == "") {
        window.location.href = "index.html"
    }
}

function readallRoutes_connect() {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
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

function registerCMS(id_in, token_in) {
    var password = document.getElementById('Password').value;
    var username = document.getElementById('Username').value;
    var route = document.getElementById('Route').value;
    var name = document.getElementById('Name').value;
    //var image = "dhkjsahdksa";
    var address = document.getElementById('Address').value;
    var telephone = document.getElementById('Telephone').value;
    var openingHours = document.getElementById('OpeningHours').value;
    if (username == "") {
        alert("Se debe introcucir un nombre de usuario");
    } else if (password == "") {
        alert("Se debe introducir una contraseña");
    } else registerCMS_connect(id_in, token_in, username, password, route, name, /* image, */ address, telephone, openingHours);
}

function registerCMS_connect(id_in, token_in, username_in, password_in, route_in, name_in, address_in, telephone_in, openingHours_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/admin/cms/register/" + id_in
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "username": username_in,
            "password": password_in,
            "route": route_in,
            "name": name_in,
            //"image": image_in,
            "address": address_in,
            "telephone": telephone_in,
            "openingHours": openingHours_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                window.location.href = "cms-list.html";
                event.preventDefault();
            } else
                alert("Error al guardar los cambios");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function logout_connect(id_in, token_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/admin/logout/" + id_in
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
                document.cookie = "id_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "token_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "username_admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
                document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
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
