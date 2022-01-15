var user;
const mojiOglasi = new Array();
const likedAdds = new Array();
var lajkovaniservisi;
var objekti;
$(document).ready(function () {
    onLoadProfile(mojiOglasi);
    $("#izmeni-profil").hide();
    $("#info-change").hide();
    $("#promeni-sifru").hide();
    $("#sacuvano-objekti").hide();
    $("#moji-oglasi-btn").css("border-bottom", "solid");
    user = localStorage.getItem("tokenLogin");
    $("#forma-novi-oglas").hide();
    $("#load-oglas").hide();
    $("#confirm-oglas").hide()

    nabaviObjekte()
    

});

$("#moji-oglasi-btn").click(function () {
    if ($("#moji-oglasi:visible") ) {
        $("#sacuvano-objekti").fadeOut();
        $("#moji-oglasi").fadeIn();
    }

    $("#ucitajjosOglasa").fadeIn();
    $("#moji-oglasi-btn").css("border-bottom", "solid");
    $("#sacuvani-objekti-btn").css("border-bottom", "none");
    if (!$("#nacrtanoId").hasClass("nacrtano"))
        iscrtajOglase();

});
$("#ucitajjosOglasa").click(function () {
    var sakriveniOglasi = $("div.card[oglasAttr=1]:hidden");
    var k = 3;
    if (sakriveniOglasi.length < 3)
        k = sakriveniOglasi.length;
    for (var i = 0; i < k; i++) {
        $("#" + sakriveniOglasi[i].id).fadeIn();
        if (i==0)
            $("#refOgl").attr("href", "#" + sakriveniOglasi[i].id);

    }

});
$("#ucitajjosObj").click(function () {
    var sakriveniObj = $("div.card[objAttr=1]:hidden");
    var k = 3;
    if (sakriveniObj.length < 3)
        k = sakriveniObj.length;
    for (var i = 0; i < k; i++) {
        $("#" + sakriveniObj[i].id).fadeIn();
            if(i==0)
            $("#refObj").attr("href", "#" + sakriveniObj[i].id);

    }

});

$("#sacuvani-objekti-btn").click(function () {
    
//     if ($("#nacrtanoId").hasClass("nacrtano")) {
//         const sakriveniOglasi = $("div.card[oglasAttr=1]");

//         sakriveniOglasi.each(function () {
//             $(this).hide();
//         });
//     }
     if (!$("#nacrtaniObjId").hasClass("nacrtano")){
        if(likedAdds.length == 0 ){
             nabaviObjekte()
            
         }
         iscrtajObjekte();
        }
    if ($("#moji-oglasi:visible") ) {
        $("#moji-oglasi").fadeOut();
        $("#sacuvano-objekti").fadeIn();
      }
//     $("#ucitajjosObj").fadeIn();
     $("#sacuvani-objekti-btn").css("border-bottom", "solid");
     $("#moji-oglasi-btn").css("border-bottom", "none");

    //return false;
});

$("#promeni-sifru-btn").click(function () {

    if ($("#izmeni-profil:visible")) {
        $("#izmeni-profil").fadeOut();
    }
    $("#promeni-sifru").fadeIn();

    return false;
});

$("#izmeni-profil-btn").click(function () {
    
    $("#izmeni-profil").fadeIn();
    if ($("#promeni-sifru:visible")) {
        $("#promeni-sifru").fadeOut();
    }

    return false;
});

$("#cancel-izmeni-profil").click(function () {
    $("#izmeni-profil").fadeOut();
    return false;
});

$("#cancel-promeni-sifru").click(function () {
    $("#promeni-sifru").fadeOut();
    return false;
});

$("#potvrdiPromenuSifre").click(function () {

    var nova;
    var nova2;
    nova = $("#newPassword").val();
    nova2 = $("#repeatPassword").val();
    var username = localStorage.getItem("tokenLogin")
    if (nova != nova2) {
        bootbox.alert("Niste uleli isto lozinku 2 puta!");
        $("#repeatPassword").val() = ""

    }
    else {
        fetch("https://localhost:5001/User/UpdateUsersPass/" + username +"/"+ nova ,  {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            }
        }
        ).then(resp => {
            if (resp.status == 200) {
                $("#oldpassword").val(nova)
                $("#newPassword").val( ". . .");
                $("#repeatPassword").val(". . .");
                $("#promeni-sifru").fadeOut();
            }
            else {

               
            }
        })
    }
    return false;

});
$("#potvrdiPromenuIP").click(function () {

    var ime;
    var prezime;
    var user = localStorage.getItem("tokenLogin")
    ime = $("#first_name").val();
    prezime = $("#last_name").val();
    fetch("https://localhost:5001/User/EditFirstLastName/" + user +"/" + ime + "/"+prezime , {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'
        }
    }).then(resp => {
        if (resp.status == 200) {
            $("#izmeni-profil").fadeOut();
            bootbox.alert("Ime i Prezime uspesno promenjeni!")
        }
        else {
            
        }
    })

    return false;

});


function CrtajMojoglas(id, naslov, desc, tip, location, phonenumber, added_date, index) {
    var activeUser = localStorage.getItem("tokenLogin");
    const sectionOglas = document.getElementById("sectionOglas")
    let d1 = document.createElement("div");
    sectionOglas.appendChild(d1);
    d1.classList.add("card", "mb-2","mt-2");
    d1.id = id + "_mojoglas";
    if (index >= 3) {
        $("#" + d1.id).attr("oglasAttr", "1");
        $("#" + d1.id).hide();
    }

    let d11 = document.createElement("div");
    d11.classList.add("card-body");
    d1.appendChild(d11);
    let h5 = document.createElement("h5");
    h5.classList.add("card-title", "font-weight-bold", "text-dark");
    h5.innerHTML = naslov; //titlee
    d11.appendChild(h5);
    let pd1 = document.createElement("p");
    pd1.id = id +"desc"
    pd1.classList.add("card-text");
    pd1.innerText = desc; //opiss
    d11.appendChild(pd1);

    let d12 = document.createElement("div");
    d12.classList.add("card-footer", "col", "text-muted");
    d1.appendChild(d12);

    let divInfo =  document.createElement("div");
    divInfo.classList.add("d-flex" ,"justify-content-start" ,"row" , "mt-3","div3")

    let div31 = document.createElement("div")
    div31.classList.add("mt-3")
    p = document.createElement("p")
    p.innerText = "Phone number : "
    let span = document.createElement("span")
    span.id = id + "tel"
    span.classList.add("border", "rounded" ,"p-2")
    span.innerHTML = phonenumber
    p.appendChild(span)
    div31.appendChild(p)
    divInfo.appendChild(div31)
    

    let div32 = document.createElement("div")
    div32.classList.add("ml-3","mt-3","div32")
    p = document.createElement("p")
    p.classList.add("ploc")
    p.innerText = "Location : "
    span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2","location") // location - p- div - div
    span.id = id + "loc"
    span.innerHTML = location
    p.appendChild(span)
    div32.appendChild(p)

    let div33 = document.createElement("div")
    div33.classList.add("ml-3","mt-3")
    p = document.createElement("p")
    p.innerText = "Added date : "
    span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2")
    span.innerHTML = added_date.split('T')[0]
    p.appendChild(span)
    div33.appendChild(p)
    divInfo.appendChild(div33)
    divInfo.appendChild(div32);

    d11.appendChild(divInfo);



    let btnObrisi = document.createElement("button");
    btnObrisi.classList.add("btn", "btn-danger", "btn-sm", "btn-danger");
    btnObrisi.id = id + "_bo";
    btnObrisi.innerHTML = "<i class=\"fa fa-trash\"></i>"; ///dodaj kanticu 
    let btnIzmeni = document.createElement("button");
    btnIzmeni.classList.add("btn", "btn-info", "btn-sm", "btn-success", "mr-1");
    btnIzmeni.id = id + "_bi";
    btnIzmeni.innerHTML = "<i class=\"fas fa-pen\"></i>";
    d12.appendChild(btnIzmeni);
    d12.appendChild(btnObrisi);

    btnIzmeni.onclick = (ev) => {
        
        $("#novi-oglas-dugme").click();
        
        $("#selectbasic").find('option[value ="' + tip + '"]').attr("selected", "true");
        

        $('#textarea').val(desc);

        $("#textinputTel").val(phonenumber);//////////dodaj input
        $('#textinputTitle').val(naslov);
        $('#textinputGrad').val(location);
        $('#button1idP').click(function(ev){
            ev.preventDefault()
            var new_title, new_loc, new_phone, new_category,new_desc;

            new_title = $('#textinputTitle').val();
            new_loc = $('#textinputGrad').val();
            new_phone = $("#textinputTel").val();
            new_category = $("#selectbasic").children("option:selected").val();
            new_desc =  $('#textarea').val();
            console.log("tu sam ");
            fetch("https://localhost:5001/Adds/UpdateAdvertisement/"+ added_date ,  {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            } ,
            body: JSON.stringify({
                username : activeUser,
                add_title : new_title,
                added_date : added_date,
                description: new_desc,
                location: new_loc,
                phonenumber: new_phone,
                category: new_category
            })
        }
        ).then(resp => {
            if (resp.status == 200) {
                $("#"+id+"tel").html(new_phone)
                $("#"+id+"loc").html( new_loc)
                $("#"+id+"desc").html(new_desc); 
                
                $("#load-oglas").fadeIn().delay(4000).fadeOut();
                $("#oglasi").fadeOut().delay(4200).fadeIn()
                $("#forma-novi-oglas").delay(4200).fadeOut();
                $("#confirm-oglas").delay(4200).fadeIn().delay(2000).fadeOut();
                $("#novi-oglas-dugme").text("Dodaj oglas");
                $("#novi-oglas-dugme").append('&nbsp;<i class="fa fa-plus"></i>');
               // $("#filter-options :radio").each(function () { $(this).prop("disabled", false);});
               // $("input:radio[value="+tip+"]").prop("checked", true);

               // $("#filter-options :radio:checked").click();
                   
            }
            else {
                
                $("#load-oglas").fadeIn().delay(4000).fadeOut();
                $("#oglasi").fadeOut().delay(4200).fadeIn()
                $("#forma-novi-oglas").delay(4200).fadeOut();
                
            }  
            $("#textinputTitle").val("");
            $("#textinputTel").val("");
            $("#textinputGrad").val("");
            $("#textinput").val("");
            $('#textarea').val("");
            $('#textinput').val(""); 
        });
        $("#textinputTitle").val("");
        $("#textinputTel").val("");
        $("#textinputGrad").val("");
        $("#textinput").val("");
        $('#textarea').val("");
        $('#textinput').val(""); 
            return false;
        })
        

    }

    btnObrisi.onclick = (ev) => {
        $('#forma-novi-oglas').hide();



        let pom = btnObrisi.id;
        oglId = pom.split("_");


        fetch("https://localhost:5001/Adds/DeleteAdd/" + naslov+ "/"+ tip +"/"+ activeUser , {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }

        })
            .then(res => {
                if (res.status == 200)
                    $("#" + oglId[0] + "_mojoglas").remove();

            });
    };
}

function onLoadProfile(mojiOglasi) {

    var user = localStorage.getItem("tokenLogin");

    fetch("https://localhost:5001/User/GetUser/" + user).then(resp => {

        if (resp.status == 200) {
            resp.json().then(data => {
                console.log();
                document.getElementById("username").innerHTML = "@" + data['username'];
                document.getElementById("email").innerHTML = data['email'];
                document.getElementById("first_name").value = data['first_name'];
                document.getElementById("last_name").value = data['lats_name'];
                document.getElementById("oldpassword").value = data['password'];
            });
        }
        else {

        }
    });

    fetch("https://localhost:5001/Adds/GetUsersAdds/" + user).then(resp => {

        if (resp.status == 200) {
            resp.json().then(data => {
                console.log(data)
                data.forEach(el=>{
                    mojiOglasi.push(el)
                })
                iscrtajOglase(mojiOglasi)
               
            });
        }
        else {

        }
    });
    
  

}

function logout() {
    localStorage.removeItem("tokenLogin");
    location.href = "index.html";
}

function iscrtajOglase() {
  

    $("#nacrtanoId").addClass("nacrtano");
    var index = 0;
    var id = 0;
    console.log("csdsvsdvsd", mojiOglasi)
    mojiOglasi.forEach(element => {
        console.log("csdsvsdvsd")
        console.log(element);
        CrtajMojoglas(id, element.add_title, element.description, element.category, element.location, element.phonenumber, element.added_date,index);
        index++;
        id++;
    });

}
function iscrtajObjekte() {
    var index = 0;
    var id = 0; 
   
    likedAdds.forEach(element => {
        console.log("pa da") 
        crtajLajkObjekat(id, element.add_title, element.description, element.location, element.phonenumber,element.added_date, index);
        index++;
        id++;
    });
    $("#nacrtaniObjId").addClass("nacrtano");
   
}
function nabaviObjekte() {
    const respons= fetchLikedAdds(activeUser)
        respons.then(data => {
            if(data.length != 0){
                
                fetch("https://localhost:5001/Adds/GetAddsFromTitles",{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                }).then(resp => {
                    if (resp.status == 200) {
                        resp.json().then(data => {
                           
                           data.forEach(el =>{
                               likedAdds.push(el)
                           }) 
                        });
                    }
                    else {

                    }
                });
            }
        });

        console.log(likedAdds);
}


function crtajLajkObjekat(idobj, naslov, desc, location, phonenumber, added_date, index) {
    var activeUser = localStorage.getItem("tokenLogin");
    let sectionOglas = document.getElementById("sectionObjekti");
  
    let d1 = document.createElement("div");
    sectionOglas.appendChild(d1);
    d1.classList.add("card", "mb-2");
    d1.id = idobj + "_objekat";
  
  
    let d11 = document.createElement("div");
    d11.classList.add("card-body");
    d1.appendChild(d11);
    let h5 = document.createElement("h5");
    h5.classList.add("card-title", "text-dark", "font-weight-bold");
    h5.innerHTML = naslov; //titlee
  
    let buttLike = document.createElement("button");
    
    buttLike.classList.add("btn", "btn-link", "rounded", "rounded-circle", "confirm-oglas-btn", "butLike");
    buttLike.id = "like_" + idobj;
    buttLike.innerHTML = "<i  class='liked fas fa-heart' style='color:red'></i>";
    buttLike.onclick = (ev) => {
        fetch("https://localhost:5001/Adds/UnLikeAdd/"+ activeUser + "/"+ naslov ,  //added_date.split('T')[0],
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            if (res.status == 200){
                delete likedAdds[likedAdds.indexOf(naslov)]; 
                buttLike.innerHTML = "<i class='unliked far fa-heart' style='color:red'></i>";
                buttLike.classList.remove("liked");
                buttLike.classList.add("unliked");
            }
                
            
        }); 
        $("#"+idobj + "_objekat").delay(4000).fadeOut()
        $("#"+idobj+ "_objekat").delay(5000).remove()
    }

    h5.prepend(buttLike);
    d11.appendChild(h5);
    let pd1 = document.createElement("p");
    pd1.classList.add("card-text" );
    pd1.innerText = desc //opiss
    d11.appendChild(pd1);

    let divInfo =  document.createElement("div");
    divInfo.classList.add("d-flex" ,"justify-content-start" ,"row" , "mt-3","div3","pl-3")

    let div31 = document.createElement("div")
    div31.classList.add("mt-3")
    p = document.createElement("p")
    p.innerText = "Phone number : "
    let span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2")
    span.innerHTML = phonenumber
    p.appendChild(span)
    div31.appendChild(p)
    divInfo.appendChild(div31)
    

    let div32 = document.createElement("div")
    div32.classList.add("ml-3","mt-3","div32")
    p = document.createElement("p")
    p.classList.add("ploc")
    p.innerText = "Location : "
    span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2","location") // location - p- div - div
    span.innerHTML = location
    p.appendChild(span)
    div32.appendChild(p)

    let div33 = document.createElement("div")
    div33.classList.add("ml-3","mt-3")
    p = document.createElement("p")
    p.innerText = "Added date : "
    span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2")
    span.innerHTML = added_date.split('T')[0]
    p.appendChild(span)
    div33.appendChild(p)
    divInfo.appendChild(div33)
    divInfo.appendChild(div32);
    
    d11.appendChild(divInfo)
    
    
    if (index >= 3) {
      d1.setAttribute("objAttr", "1");
      d1.setAttribute("style", "display:none");
    }
  
  
  }

