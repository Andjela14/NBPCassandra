$("#novi-oglas-dugme").click(function(){
    if($('#forma-novi-oglas').is(":visible")){
        
        $("#forma-novi-oglas").fadeOut();
        $("#novi-oglas-dugme").text("Dodaj oglas");
        $("#novi-oglas-dugme").append('&nbsp;<i class="fa fa-plus"></i>');
    }
    else{

        $("#novi-oglas-dugme").text("Nazad");
        $("#novi-oglas-dugme").append('&nbsp;<i class="fa fa-arrow-left"></i>');
        $("#forma-novi-oglas").fadeIn();
    }
})

$("#button1id").click(function () {  //success
    var user = localStorage.getItem("tokenLogin");
    var phNum = $("#textinputTel").val();
    var opis = $('#textarea').val();
    var add_title = $('#textinputTitle').val();
    var location = $('#textinputGrad').val();
    
    var tip = $("#selectbasic").children("option:selected").val();

    console.log(user, phNum,opis,add_title)
    fetch("https://localhost:5001/Adds/AddAdvertisement",
    {
        method:'POST',
        body: JSON.stringify({
            username : user,
            add_title : add_title,
            added_date : "2022-01-14T19:57:11.515Z",
            description: opis,
            location: location,
            phonenumber: phNum,
            category: tip
        }),
        headers: 
        {
            'Content-type': 'application/json'
        }
    }).then(resp => 
        {
            if (resp.status == 200) {
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
                $("#novi-oglas-dugme").text("Dodaj oglas");
                $("#novi-oglas-dugme").append('&nbsp;<i class="fa fa-plus"></i>');
              //  $("#filter-options :radio").each(function () { $(this).prop("disabled", false);});
                
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
});

$("#button2id").click(function () { 
    $("#forma-novi-oglas").fadeOut();
    $("#novi-oglas-dugme").text("Dodaj oglas");
    $("#novi-oglas-dugme").append('&nbsp;<i class="fa fa-plus"></i>');
    return false;
});


//treba da na click uzmes token i posaljes na back i da posaljes podatke zaj sa podacima iz forme 