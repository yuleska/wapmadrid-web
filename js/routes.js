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
                for (i in r.responseJSON.routes) {
                    var nameRoute = r.responseJSON.routes[i].name;
                    var idRoute = r.responseJSON.routes[i]._id;
                    var distanceRoute = r.responseJSON.routes[i].distance;
                    $('#accordion').append('<div class="panel panel-default"><div class="panel-heading"><h4 class="panel-title"><a data-toggle="collapse" data-parent="#accordion" href="#collapse_' + idRoute + '" class="collapsed"><h4  style="font-weight:bold">' + nameRoute + '</h4>Longitud Ruta : ' + distanceRoute + ' metros</a></h4></div><div id="collapse_' + idRoute + '" class="panel-collapse collapse" style="height:0px;"><div class="panel-body"><div class="row"><div class="col-md-6"><img src="images/gallery/Arganzuela.png" class="img-responsive"></div><div class="col-md-6"><div id="map_' + idRoute + '" style="width:440px;height:379px;"></div></div></div></div></div></div>');
                    var mapProp = {
                        center: new google.maps.LatLng(40.437944725164726, -3.6795366500000455),
                        zoom: 11,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };
                    var mapId = "map_" + idRoute;
                    var map = new google.maps.Map(document.getElementById(mapId), mapProp);
                    var routeMap = new Array();
                    for (j in r.responseJSON.routes[i].coordinates) {
                        var routeLat = r.responseJSON.routes[i].coordinates[j]._lat;
                        var routeLong = r.responseJSON.routes[i].coordinates[j]._long;
                        routeMap.push(new google.maps.LatLng(routeLat, routeLong));
                    }

                    var polyline = new google.maps.Polyline({
                        path: routeMap,
                        map: map,
                        strokeColor: '#ff0000',
                        strokeWeight: 5,
                        strokeOpacity: 0.3,
                        clickable: false
                    });

                }
            } else
                alert("Error al leer las rutas");

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
