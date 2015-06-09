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

function readCMS_connect(id_in, userId_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlCMS = urlBase + "/api/admin/cms/read/" + id_in
    $.ajax({
        url: urlCMS,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "userID": userId_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                $('#CMSname').append(r.responseJSON.user.name);
                $('#Username').append(r.responseJSON.user.username);
                $('#Email').append(r.responseJSON.user.email);
                $('#Username1').val(r.responseJSON.user.username);
                $('#CMSname1').val(r.responseJSON.user.name);
                $('#Email1').val(r.responseJSON.user.email);
                var selectRoute = document.getElementById('Route');
                for (i in selectRoute.options) {
                    if (selectRoute.options[i].value == r.responseJSON.user.route._id) {
                        selectRoute.options[i].selected = true;
                        $('#RouteName').append(selectRoute.options[i].text);
                    }
                }
                $('#Telephone').val(r.responseJSON.user.telephone);
                $('#OpeningHours').val(r.responseJSON.user.openingHours);
                $('#Address').val(r.responseJSON.user.address);
            } else
                alert("Error al leer el CMS");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function updateCMS(id_in, userId_in, token_in) {
    console.log(token_in);
    console.log(id_in);
    console.log(userId_in);
    var password = document.getElementById('Password').value;
    var rePassword = document.getElementById('RePassword').value;
    var username = document.getElementById('Username1').value;
    var name = document.getElementById('CMSname1').value;
    var selectRoute = document.getElementById('Route');
    var route = selectRoute.options[selectRoute.selectedIndex].value;
    var email = document.getElementById('Email1').value;
    var telephone = document.getElementById('Telephone').value;
    var openingHours = document.getElementById('OpeningHours').value;
    var address = document.getElementById('Address').value;
    if (username == "") {
        alert("Se debe introcucir un nombre de usuario");
    } else if (password == "") {
        alert("Se debe introducir una contraseña");
    } else if (password != rePassword) {
        alert("Deben coincidir las contraseñas");
    } else updateCMS_connect(username, password, id_in, userId_in, token_in, name, route, email, telephone, openingHours, address);
}

function updateCMS_connect(username_in, password_in, id_in, userId_in, token_in, name_in, route_in, email_in, telephone_in, openingHours_in, address_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlUpdate = urlBase + "/api/admin/cms/update/" + id_in
    $.ajax({
        url: urlUpdate,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "userID": userId_in,
            "username": username_in,
            "password": password_in,
            "name": name_in,
            "email":email_in,
            "route": route_in,
            "address": address_in,
            "telephone": telephone_in,
            "openingHours": openingHours_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                alert("Cambios guardados con exito");
                window.location.href = "cms-list.html";
                event.preventDefault();
            } else
                alert("Error al guardar los cambios");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
    return false;
}

function logout_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
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
