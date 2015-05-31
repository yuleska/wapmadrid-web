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

function readWalker_connect(id_in, id_walker_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlCMS = urlBase + "/api/cms/walker/read/" + id_in
    $.ajax({
        url: urlCMS,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "walkerID": id_walker_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                alert("here yuli");
                $('#Email1').append(r.responseJSON.walker.email);
                $('#Email').val(r.responseJSON.walker.email);
                $('#FirstName').val(r.responseJSON.walker.firstName)
                $('#LastName').val(r.responseJSON.walker.lastName)
                $('#City').val(r.responseJSON.walker.city);
                $('#About').val(r.responseJSON.walker.about);
                $('#Height').val(r.responseJSON.walker.height);
                var date = r.responseJSON.walker.birthDate;
                date = date.substring(0,10);
                $('#BirthDate').val(date);
                $('#Telephone').val(r.responseJSON.walker.telephone);
                var selectSmoker = document.getElementById('Smoker');
                for (i in selectSmoker.options) {
                    if (selectSmoker.options[i].value == r.responseJSON.walker.smoker) {
                        selectSmoker.options[i].selected = true;
                    }
                }
                var selectAlcohol = document.getElementById('Alcohol');
                for (i in selectAlcohol.options) {
                    if (selectAlcohol.options[i].value == r.responseJSON.walker.alcohol) {
                        selectAlcohol.options[i].selected = true;
                    }
                }
                if (r.responseJSON.walker.sex){
                    var o = document.getElementById("Male").parentNode;
                    o.classList.add("checked");
                }else{
                    var o = document.getElementById("Female").parentNode;
                    o.classList.add("checked");
                }
                var long = r.responseJSON.walker.weight.length;
                $('#Weight').val(r.responseJSON.walker.weight[long-1].value);

                
                //$('#Address').val(r.responseJSON.walker.address);
            } else
                alert("Error al leer el CMS");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function updateWalker(id_in, userId_in, token_in) {
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
            "email": email_in,
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
