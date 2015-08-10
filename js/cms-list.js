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

function readallCMS_connect(id_in, token_in) {
    var urlBase = "http://wapmadrid.madridsalud.es:3100";
    var urlRegister = urlBase + "/api/admin/cms/read/all/" + id_in
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
                for (i in r.responseJSON.user) {
                    console.log(r.responseJSON.user[i].name);
                    if (i % 2 == 0) {
                        $('#listallCMS').append('<tr class="tbl-item" style="background-color:#dbdbdb"><td class=""><div class="row"><div class="col-md-1"><img src="images/avatar/cms.jpg" class="img-responsive" /></div><div class="col-md-9"><p class="title">' + r.responseJSON.user[i].name + '</p></div><div class="col-md-2"><a onclick="readCMS_connect(this.id)" href="#" id="btn_' + r.responseJSON.user[i]._id + '" class="btn btn-orange">Editar</a></div></div></td></tr>');
                    } else {
                        $('#listallCMS').append('<tr class="tbl-item"><td class=""><div class="row"><div class="col-md-1"><img src="images/avatar/cms.jpg" class="img-responsive" /></div><div class="col-md-9"><p class="title">' + r.responseJSON.user[i].name + '</p></div><div class="col-md-2"><a href="#"  onclick="readCMS_connect(this.id)" id="btn_' + r.responseJSON.user[i]._id + '" class="btn btn-orange">Editar</a></div></div></td></tr>');

                    }
                }
            } else
                alert("Error al leer los CMS");

        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function readCMS_connect(id_in) {
    var long = id_in.length;
    var id = id_in.substring(4,long);
    document.cookie="userId="+id;
    window.location.href = "cms-edit.html";
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
