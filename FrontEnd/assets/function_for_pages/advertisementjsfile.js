// treba da povucem sacuvane oglase iz baze
// treba da napravim moj profil gde se vide postavljeni oglasi
// mogu da se izmene 
// mogu da se obrisu 
//

$( document ).ready(function() {
    var activeUser = localStorage.getItem("tokenLogin")
    console.log(activeUser)
    if(activeUser == undefined){
        location.href = "404.html"
    }
    $('#forma-novi-oglas').hide();
    $('#confirm-oglas').hide();
    $('#load-oglas').hide();

    const respons= fetchLikedAdds(activeUser)
    respons.then(data => {
        likedAdds = data
        drawLikedAdds(likedAdds)
    });

    

})

function drawLikedAdds(likedAdds){
    var id = 0;
    likedAdds.forEach(element => {
        drawLikedAdd(element, id)
        id = id+1
    });
}

function drawLikedAdd(add_title, id){
    var lista = document.getElementById("liked-adds")
    const elListe = document.createElement("li")
    elListe.classList.add("list-item" ,"p-3", "col-5", "mr-3", "ml-3")
    elListe.id = id;
    let div00 = document.createElement("div")
    div00.classList.add("col","d-flex","p-0" )
    let title = document.createElement("h5")
    title.id = id +"title";
    title.classList.add("h5","col-10","p-0")
    let div01 = document.createElement("div")
    div01.classList.add("col-1");

    title.innerHTML = add_title
    div00.appendChild(title)
   
    elListe.appendChild(div00)
    lista.appendChild(elListe)
    //lista.appendChild(div01)
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
                if(buttLike.classList.contains("liked")){
                            
                    fetch("https://localhost:5001/Adds/UnLikeAdd/"+ activeUser + "/"+ add_title ,  //added_date.split('T')[0],
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
                    $("#"+id).fadeOut()
                    $("#"+id).remove()
                }
            }
            else
            {
                bootbox.alert("You can like add only when you are logged in!")
            }
            
        };
        div00.appendChild(buttLike);
      
    
}