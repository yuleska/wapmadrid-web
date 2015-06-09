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

function readGroups_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/cms/group/list/" + id_in
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
                for (i in r.responseJSON.groups) {
                    var groupData = r.responseJSON.groups[i].groupsID;
                    var image = groupData.image;

                    if (image == "") {
                        image = "images/avatar/group150x150.png";
                    }
                    if (i % 2 == 0) {
                        $('#group-list').append('<div class="col-md-4"><div class="panel panel-default"><img src="' + image + '" class="img-responsive" style="margin-left:25%;margin-top:5%"><div class="panel-body"><p class="lead" style="font-size:20px;font-weight:bold;color:#f15900">' + groupData.name + '</p><div class="panel-footer"><p style="color:#f15900">Horario:<span style="color:#111"> ' + groupData.schedule + ' </span></p></div><div class="panel-footer"><p style="color:#f15900">Nivel:<span style="color:#111"> ' + groupData.level + ' </span></p></div></div></div></div>');
                    } else {
                        $('#group-list').append('<div class="col-md-4"><div class="panel panel-default"><img src="' + image + '" class="img-responsive" style="margin-left:25%;margin-top:5%"><div class="panel-body"><p class="lead" style="font-size:20px;font-weight:bold;color:#710096">' + groupData.name + '</p><div class="panel-footer"><p style="color:#f15900">Horario:<span style="color:#111"> ' + groupData.schedule + ' </span></p></div><div class="panel-footer"><p style="color:#f15900">Nivel:<span style="color:#111"> ' + groupData.level + ' </span></p></div></div></div></div>');
                    }
                }
            } else
                alert("Error al leer los grupos");


        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}
