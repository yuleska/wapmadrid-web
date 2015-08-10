function login() {
    var password = document.getElementById('Password').value;
    var username = document.getElementById('Username').value;
    if (username == "") {
        alert("Se debe introcucir un nombre de usuario");
    } else if (password == "") {
        alert("Se debe introducir una contraseña");
    } else login_connect(username, password);
}

function login_connect(username_in, password_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlLogin = urlBase + "/api/admin/login"
    $.ajax({
        url: urlLogin,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "username": username_in,
            "password": password_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                var id = json._id;
                var token = json.token;
                //Use cookies if user wants to remember his session           
                document.cookie = "id_admin=" + id;
                document.cookie = "token_admin=" + token;
                document.cookie = "username_admin=" + username_in;
                window.location.href = "cms-register.html"
            } else
                alert("Contraseña y/o usuario incorrectos");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}
