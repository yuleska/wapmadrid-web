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

function readHome_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/home/" + id_in
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
                $('#RoutesCount').append(r.responseJSON.routesCount);
                $('#GroupsCount').append(r.responseJSON.groupsCount);
                $('#WalkersCount').append(r.responseJSON.walkersCount);         
            } else
                alert("Error al leer los cambios");
                return null;
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
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