
var activeUser = undefined;
var rate = 0;
var likedAdds = undefined;

function onIndexLoad() {
    var activeUser = localStorage.getItem("tokenLogin")
    if(activeUser != null)
    {
        setAllForLoggedInUser(activeUser)
        const respons= fetchLikedAdds(activeUser)
        respons.then(data => {
            likedAdds = data
        });
    }
    LoadLatest(activeUser);
    $("#predajOglas").click(function () {
        if(activeUser != null){
            location.href = "advertisments.html"
        }
        else{
            bootbox.alert("You can post add only when you are logged in!")
        }
    });
}

function LoadLatest(activeUser) {
    var username, add_title, added_date, description, location, phonenumber, category, rate, id = 0;

    fetch("https://localhost:5001/Adds/GetLatestAdds").then(resp => {

        if (resp.status == 200) {
            resp.json().then(data => {

                data.forEach(element => {
                    rate = 0;
                    username = element['username'];
                    add_title = element['add_title'];
                    added_date = element['added_date'];
                    description = element['description'];
                    location = element['location'];
                    phonenumber = element['phonenumber'];
                    category = element['category'];
                    
                    drawAdd(username, add_title, added_date, description, location, phonenumber, category, rate, id,activeUser);
                    uzmiPodatkeReviews(add_title, id, rate);
                    formazaNovurec(id, add_title);
                    id = id + 1

                });
                

            });
        }
        else {

        }
    });

}

$("#categories a").click(function(e){
    e.preventDefault();
    var category = $(this).html();

    var username, add_title, added_date, description, location, phonenumber, categoryi, rate, id = 0;
    console.log(category)
    fetch("https://localhost:5001/Adds/GetAddsByCategory/"+category ).then(resp => {

        if (resp.status == 200) {
            console.log("okk")
             resp.json().then(data => {
                console.log(data)
                 $("#product-list").empty()
                 data.forEach(element => {
                    rate = 0;
                    username = element['username'];
                    add_title = element['add_title'];
                    added_date = element['added_date'];
                    description = element['description'];
                    location = element['location'];
                    phonenumber = element['phonenumber'];
                    categoryi = element['category'];
                
                    drawAdd(username, add_title, added_date, description, location, phonenumber, categoryi, rate, id, localStorage.getItem("tokenLogin"));
                    uzmiPodatkeReviews(add_title, id, rate);
                    formazaNovurec(id, add_title);
                    id = id + 1

    });
                

             });
        }
        else {

        }
    });

})

$("#categories div").click(function(e){
    e.preventDefault();
    $("#product-list").empty()
    LoadLatest(localStorage.getItem("tokenLogin"))
});

function drawAdd(username, add_title, added_date, description, location, phonenumber, category, rate, id, activeUser) {
    var lista = document.getElementById("product-list")
    const elListe = document.createElement("li")
    elListe.classList.add("list-item" ,"p-3")
    elListe.id = id;
    let div00 = document.createElement("div")
    div00.classList.add("col","d-flex","p-0")
    let title = document.createElement("h2")
    title.id = 
    title.classList.add("h2","col-10","p-0")
    
    title.innerHTML = add_title
    div00.appendChild(title)
    elListe.appendChild(div00)

    let div01 = document.createElement("div");
    div01.classList.add("row", "mb-3");
    elListe.appendChild(div01);
    let d01 = document.createElement("div");
    d01.classList.add("col-8",);
    div01.appendChild(d01);
    let p01 = document.createElement("p");
    d01.appendChild(p01);
    let rateSpan = document.createElement("span");
    p01.appendChild(rateSpan);
    rateSpan.id = id + "_rate";
    rateSpan.classList.add("icons", "border", "border-rounded", "p-2");

    lista.appendChild(elListe)

    let div1 = document.createElement("div")
    div1.classList.add ("row", "mb-3");
    elListe.appendChild(div1);

    let div11 = document.createElement("div")
    div11.className = "col-4"
    div1.appendChild(div11)
    let p = document.createElement("p")
    p.classList.add("text-monospace");
    div11.appendChild(p)

    let a_username = document.createElement("a")
    a_username.classList.add("link-dark")
    a_username.innerHTML = "@" + username 
    p.appendChild(a_username);
   
    let div12 = document.createElement("div")
    div12.className = "col-4"
    div1.appendChild(div12)
    p = document.createElement("p")
    p.classList.add("text-monospace");
    p.innerText = "Category : " + category 
    div12.appendChild(p)
    
    let div13 = document.createElement("div")
    div13.className = "col-4"
    div1.appendChild(div13)

    let buttLike =  document.createElement("button");
    
    buttLike.id = "like_"+id;
    buttLike.style.height = "20.8px";
    buttLike.classList.add("btn", "rounded", "rounded-circle" );
    buttLike.innerHTML = "<i class='unliked far fa-heart' style='color:red'></i>";
    if(activeUser!= null){
        if (likedAdds && likedAdds.includes(add_title)){
            buttLike.classList.add("liked");
            buttLike.innerHTML = "<i class='liked fa fa-heart' style='color:red'></i>";
        }
        else {
            buttLike.classList.add("unliked");
            buttLike.innerHTML = "<i class='unliked far fa-heart' style='color:red'></i>";
        }
    }
    buttLike.onclick = (ev) => { 
        if(activeUser != null ){
            if(buttLike.classList.contains("unliked") ){
                fetch("https://localhost:5001/Adds/LikeAdd/"+ activeUser + "/"+ add_title + "/" + added_date.split('T')[0],
                {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(response => {
                    console.log('Success:', response.status);
                    likedAdds.concat(add_title)
                    buttLike.innerHTML = "<i class='liked fa fa-heart' style='color:red'></i>";
                    buttLike.classList.remove("unliked");
                    buttLike.classList.add("liked");
                }).catch((error) => {
                        console.error('Error:', error);
                    });
            }
            else if(buttLike.classList.contains("liked")){
                        
                fetch("https://localhost:5001/Adds/UnLikeAdd/"+ activeUser + "/"+ add_title + "/" + added_date.split('T')[0],
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => {
                    if (res.status == 200){
                        delete likedAdds[likedAdds.indexOf(add_title)]; 
                        buttLike.innerHTML = "<i class='unliked far fa-heart' style='color:red'></i>";
                        buttLike.classList.remove("liked");
                        buttLike.classList.add("unliked");
                    }
                        
                    
                });   
            }
        }
        else
        {
            bootbox.alert("You can like add only when you are logged in!")
        }
        
    };
    div00.appendChild(buttLike);

    let div2 = document.createElement("div")
    div2.classList.add("row", "m-auto", "border" ,"rounded" ,"p-2")
    p = document.createElement("p")
    p.innerText = description
    div2.appendChild(p)

    elListe.appendChild(div2);

    let div3 = document.createElement("div")
    div3.classList.add("row" , "mt-3","div3")
    div3.id = "div3"
    
    let div31 = document.createElement("div")
    div31.classList.add("ml-3","mt-3")
    p = document.createElement("p")
    p.innerText = "Phone number : "
    let span = document.createElement("span")
    span.classList.add("border", "rounded" ,"p-2")
    span.innerHTML = phonenumber
    p.appendChild(span)
    div31.appendChild(p)
    div3.appendChild(div31)
    

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
    div3.appendChild(div33)
    div3.appendChild(div32);

    elListe.appendChild(div3);


    let d3 = document.createElement("div");
    d3.classList.add("col", "d-flex", "flex-row-reverse");
    elListe.appendChild(d3);

    let d4 = document.createElement("div");
    d4.classList.add("p-1");
    d3.appendChild(d4);
    let butt = document.createElement("button");
    butt.classList.add("btn", "btn-dark", "button-recenzija");
    butt.setAttribute("type", "button");
    //butt.id = id;
    butt.innerHTML = "<i class=\"fas fa-plus\"></i>";
    d4.appendChild(butt);
    let r1 = document.createElement("div");
    r1.classList.add("recenzije" + id, "container", "bg-light", "pb-2", "pt-2", "rounded");
    r1.setAttribute("style", "display: none");

    elListe.appendChild(r1);

    butt.onclick = (ev) => {
       

        if ($(".recenzije" + id).is(":visible")) {
            $(".recenzije" + id).delay(100).fadeOut();
            butt.innerHTML = '<i class="fas fa-plus"></i>';
     
        }
        else {
            $(".recenzije" + id).delay(100).fadeIn();
            butt.innerHTML = '<i class="fas fa-times"></i>';
          
        }
    };
    let d5 = document.createElement("div"); 
    d5.classList.add("p-2");
    d5.innerHTML = "<span class=\"p-2 h6 text-end\">Recenzije : </span>";
    d3.appendChild(d5);



    let hr1 = document.createElement("h2");
    hr1.className = "h6"
    hr1.innerHTML = "Komentari & Recenzije";

    let dr1 = document.createElement("div");
    dr1.classList.add("forma-nova-recenzija" + id);
    dr1.onclick = (ev) => {

        $(".forma-nova-recenzija" + id + ".container").fadeIn();
    }
    r1.appendChild(hr1);
    r1.appendChild(dr1);

    let r2 = document.createElement("div");
    r2.classList.add("comments", "section", "border", "rounded", "mt-5");
    r1.appendChild(r2);
    let r3 = document.createElement("div");
    r3.classList.add("row");
    r2.appendChild(r3);
    let r4 = document.createElement("div");
    r4.classList.add("col-sm-12");
    r3.appendChild(r4);
    let r5 = document.createElement("div");
    r5.classList.add("review-block");

    r5.id = id + "_revBlock"; /////////////////////id bloka za review
    r4.appendChild(r5);

}

function setAllForLoggedInUser(){
    var loginbutton = document.getElementById("uloguj-se");
    loginbutton.innerHTML = "<i class=\"fa fa-user\" id=\"user-icon\"></i>Izloguj se";
    loginbutton.onclick = (ev) =>{
      logoutUser();
    } 
  
  }

function crtajOcenu(rateSpan, rate) {
    rateSpan.innerHTML = ""
  
    let iel;
    for (var i = 1; i < 6; i++) {
        iel = document.createElement("i");
        if (rate >= i) {
            iel.classList.add("fas");
        }
        else {
            iel.classList.add("far");
        }
        iel.classList.add("fa-star");
        rateSpan.appendChild(iel);
    }
    rateSpan.innerHTML += "&nbsp; <strong>" + rate + "</strong>";
}

function nacrtajRecenzije(username, datumPostavlajnja, opis, rate, id) {
    const revBlok = document.getElementById(id + "_revBlock");
    let glavniDiv, d1, d2, d3,rbn;

    glavniDiv = document.createElement("div");
    glavniDiv.classList.add("row");
    glavniDiv.id = id + username;
    glavniDiv.setAttribute("sakriveni", "1");

    d1 = document.createElement("div");
    d1.classList.add("row", "col-sm-12" )
    d2 = document.createElement("div");
    d2.classList.add("col-sm-9");
    rbn= document.createElement("div");
    rbn.classList.add("review-block-name", "col-sm-6");
    d1.appendChild(rbn);

    let a1= document.createElement("h6");
    a1.classList.add("pl-3", "pt-3","h6", "aElUsername");
    a1.innerHTML = "@"+ username;
    rbn.appendChild(a1);
    let rbd= document.createElement("div");
    rbd.classList.add("review-block-date", "col-sm-6","pt-3");
    rbd.innerHTML = datumPostavlajnja + "<br/>";
    d1.appendChild(rbd);
    
    glavniDiv.appendChild(d1);


    glavniDiv.appendChild(d2);
    d3 = document.createElement("div");
    d2.appendChild(d3);
    d3.classList.add("review-block-rate", "pl-3");
    crtajOcenu(d3, rate);


    d4 = document.createElement("div");
    d4.classList.add("review-block-description", "p-3");
    d4.innerHTML = opis;
    d2.appendChild(d4);
   
    revBlok.prepend(glavniDiv);

}


