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
                $('#Route').append(r.responseJSON.route.name);
            } else
                alert("Error al leer los cambios");
               
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function registerWalker(id_in, token_in) {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var rePassword = document.getElementById('RePassword').value;
    var username = document.getElementById('Username').value;
    var firstName = document.getElementById('FirstName').value;
    var lastName = document.getElementById('LastName').value;
    var male = document.getElementById('Male').checked;
    var female = document.getElementById('Female').checked;
    if (male){
        var sex = true;
    } else if (female){
        var sex = false;
    } else {
        alert("Se debe elegir el sexo");
    }
    var date = document.getElementById('BirthDate').value;
    var birthDate = new Date(date);
    var city = document.getElementById('City').value;
    var height = document.getElementById('Height').value;
    var weight = document.getElementById('Weight').value;
    var smoker = document.getElementById('Smoker').selectedIndex;
    var alcohol = document.getElementById('Alcohol').selectedIndex;
    var about = document.getElementById('About').value;
    var telephone = document.getElementById('Telephone').value;
    var address = document.getElementById('Address').value;
    if (username == "") {
        alert("Se debe introcucir un nombre de usuario");
    } if (password == "" || (password != rePassword)) {
        alert("Se debe introducir una contraseña");
    } else {
        alert("here yuli");
        registerWalker_connect(id_in, token_in, email, username, password, firstName, lastName, sex, birthDate, city, height, weight, smoker, alcohol, about, telephone, address)};
}


function registerWalker_connect(id_in, token_in, email_in, username_in, password_in, firstName_in, lastName_in, sex_in, birthDate_in, city_in, height_in, weight_in, smoker_in, alcohol_in, about_in, telephone_in, address_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/cms/walker/register/" + id_in
    alert("here yuli");
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "email": email_in,
            "username": username_in,
            "password": password_in,
            "firstName": firstName_in,
            "lastName": lastName_in,
            "sex": sex_in,
            "birthDate": birthDate_in,
            "city": city_in,
            "height": height_in,
            "weight": weight_in,
            "smoker": smoker_in,
            "alcohol": alcohol_in,
            "about": about_in,
            "telephone": telephone_in,
            "address": address_in
        },
        complete: function(r) {
            console.log(r);
            alert("here yu ajax");
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                console.log("wappy save")
                //window.location.href = "walker-list.html";
                //event.preventDefault();
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