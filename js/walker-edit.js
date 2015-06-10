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
                $('#Route').append(r.responseJSON.route.name);
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
                $('#AllName').append(r.responseJSON.walker.firstName + " " + r.responseJSON.walker.lastName);
                $('#Username').append(r.responseJSON.walker.username);
                $('#Email1').append(r.responseJSON.walker.email);
                $('#Username1').val(r.responseJSON.walker.username);
                $('#Email').val(r.responseJSON.walker.email);
                $('#FirstName').val(r.responseJSON.walker.firstName)
                $('#LastName').val(r.responseJSON.walker.lastName)
                $('#City').val(r.responseJSON.walker.city);
                $('#About').val(r.responseJSON.walker.about);
                $('#Address').val(r.responseJSON.walker.address);
                $('#Height').val(r.responseJSON.walker.height);
                var date = r.responseJSON.walker.birthDate;
                date = date.substring(0, 10);
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
                if (r.responseJSON.walker.sex) {
                    var o = document.getElementById("Male").parentNode;
                    o.classList.add("checked");
                    document.getElementById('Male').checked = true;
                } else {
                    var o = document.getElementById("Female").parentNode;
                    o.classList.add("checked");
                    document.getElementById('Female').checked = true;
                }
                var long = r.responseJSON.walker.weight.length;
                $('#Weight').val(r.responseJSON.walker.weight[long - 1].value);

                var weight = r.responseJSON.walker.weight;
                var diet = r.responseJSON.walker.diet;
                var dates = [];
                var imcData = [];
                for (i in weight) {
                    var date = weight[i].date;
                    var day = date.substring(8, 10);
                    var month = date.substring(5, 7);
                    var year = date.substring(0, 4);
                    date = day + "-" + month + "-" + year;
                    var imc = weight[i].imc.toFixed(2);
                    dates.push(date);
                    imcData.push(parseFloat(imc));
                }
                console.log(dates);
                console.log(imcData);

                var datesDiet = [];
                var dietData = [];
                for (i in diet) {
                    var date = diet[i].date;
                    var day = date.substring(8, 10);
                    var month = date.substring(5, 7);
                    var year = date.substring(0, 4);
                    date = day + "-" + month + "-" + year;
                    datesDiet.push(date);
                    dietData.push(diet[i].value);
                }
                console.log(datesDiet);
                console.log(dietData);


                var chartImc = new Highcharts.Chart({
                    chart: {
                        renderTo: 'bar-chart-imc'
                    },
                    title: {
                        text: 'Resultados IMC'
                    },
                    xAxis: {
                        title: {
                            text: 'Fecha'
                        },
                        categories: dates
                    },
                    yAxis: {
                        title: {
                            text: 'IMC'
                        }
                    },
                    series: [{
                        name: 'IMC',
                        data: imcData
                    }]
                });

                var chartDiet = new Highcharts.Chart({
                    chart: {
                        renderTo: 'bar-chart-diet'
                    },
                    title: {
                        text: 'Resultados Test dieta'
                    },
                    xAxis: {
                        title: {
                            text: 'Fecha'
                        },
                        categories: datesDiet
                    },
                    yAxis: {
                        min:0,
                        max:14,
                        title: {
                            text: 'Puntos'
                        }
                    },
                    series: [{
                        name: 'Puntos',
                        data: dietData
                    }]
                });

            } else
                alert("Error al leer Wappy");
        },
        onerror: function(e, val) {
            alert("No se ha podido realizar la peticion");
        }
    });
}

function updateWalker(id_in, id_walker_in, token_in) {
    var email = document.getElementById('Email').value;
    var password = document.getElementById('Password').value;
    var rePassword = document.getElementById('RePassword').value;
    var username = document.getElementById('Username1').value;
    var firstName = document.getElementById('FirstName').value;
    var lastName = document.getElementById('LastName').value;
    var male = document.getElementById('Male').checked;
    var female = document.getElementById('Female').checked;
    if (male) {
        var sex = true;
    } else if (female) {
        var sex = false;
    } else {
        alert("Se debe elegir un sexo");
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
    } else if (password == "") {
        alert("Se debe introducir una contraseña");
    } else if (password != rePassword) {
        alert("Se debe introducir la misma contraseña en ambos campos");
    } else updateWalker_connect(id_in, token_in, id_walker_in, email, username, password, firstName, lastName, sex, birthDate, city, height, weight, smoker, alcohol, about, telephone, address);
}

function updateWalker_connect(id_in, token_in, id_walker_in, email_in, username_in, password_in, firstName_in, lastName_in, sex_in, birthDate_in, city_in, height_in, weight_in, smoker_in, alcohol_in, about_in, telephone_in, address_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlUpdate = urlBase + "/api/cms/walker/info/" + id_in
    $.ajax({
        url: urlUpdate,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "walkerID": id_walker_in,
            "email": email_in,
            //"username": username_in,
            //"password": password_in,
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
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                alert("Cambios guardados con exito");
                window.location.href = "walker-list.html";
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

function saveDietTest(id_in, id_walker_in, token_in) {
    var answArray = [];
    var res = 0;
    var msg = "";
    for (i = 0; i < 14; i++) {
        var answ = "answ" + i;
        console.log(answ);
        var selectAnsw = document.getElementById(answ);
        var answValue = selectAnsw.options[selectAnsw.selectedIndex].value;
        answArray.push(parseInt(answValue));
        res = res + parseInt(answValue);
    }
    console.log(answArray);
    console.log(res);
    if (res < 5) {
        msg = "Muy baja adherencia a la dieta mediterránea";
    } else if (res >= 5 && res <= 7) {
        msg = "Baja adherencia a la dieta mediterránea";
    } else if (res >= 8 && res <= 10) {
        msg = "Buena adherencia  a la dieta mediterránea";
    } else if (res >= 11 && res <= 14) {
        msg = "Excelente adherencia a la dieta mediterránea";
    }
    console.log(msg);
    alert(msg);
    saveDietTest_connect(id_in, id_walker_in, token_in, res);

}

function saveDietTest_connect(id_in, id_walker_in, token_in, res_in) {
    var urlBase = "http://www.proyectowap.tk:3100";
    var urlUpdate = urlBase + "/api/cms/walker/update/diet/" + id_in
    $.ajax({
        url: urlUpdate,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        dataType: "json",
        type: "POST",
        crossDomain: true,
        data: {
            "token": token_in,
            "walkerID": id_walker_in,
            "diet": res_in
        },
        complete: function(r) {
            console.log(r);
            var json = JSON.parse(r.responseText);
            if (json.error == "0") {
                alert("Cambios guardados con exito");
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
    ///api/cms/walker/update/exercise/
