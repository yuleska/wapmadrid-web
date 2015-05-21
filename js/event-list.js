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

function readEvents_connect(id_in, token_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlRegister = urlBase + "/api/events/"
    $.ajax({
        url: urlRegister,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "GET",
        crossDomain: true,
        data: {
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                for (i in r.responseJSON.events) {
                    var eventData = r.responseJSON.events[i];
                    console.log(eventData);
                    if (i%2 == 0){
                        $('#listEvents').append('<tr class="tbl-item" style="background-color:#dbdbdb"><td class=""><div class="row"><div class="col-md-1"><img src="images/avatar/wappy128.png" class="img-responsive" /></div><div class="col-md-9"><p class="title">'+eventData.name+'</p></div><div class="col-md-2"><a href="walker-edit.html"  class="btn btn-orange">Editar</a></div></div></td></tr>');
                    }else{
                        $('#listEvents').append('<tr class="tbl-item"><td class=""><div class="row"><div class="col-md-1"><img src="images/avatar/wappy128.png" class="img-responsive" /></div><div class="col-md-9"><p class="title">'+eventData.name+'</p></div><div class="col-md-2"><a href="walker-edit.html"  class="btn btn-orange">Editar</a></div></div></td></tr>');

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
