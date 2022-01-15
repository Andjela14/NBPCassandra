var rateNewReview=1;
var descNewReview;
var avatarNewReview;
var usernameNewReview;
var dateNewReview;

function getNewRate(add_title, id){
    var rate = 0;
    fetch("https://localhost:5001/Adds/GetAddRate/"+add_title).then(resp => {

        if (resp.status == 200) {
            resp.json().then(data =>  {
                rate =  data;
                $(id +"_rate").empty()
                crtajOcenu(document.getElementById(id +"_rate"), rate);
            });
        }
        else {
        }
    });
    
    return rate;
}


function formazaNovurec(id ,add_title){
$(".forma-nova-recenzija"+id).html(
`<div class="container"  >
    <div class="row mt-10">
    <div class="col-sm-12">
    <div class="well well-sm">
        <div class="text-right">
            <a class="btn btn-green open-review-box" id="ostRec_`+id +`" href="#reviews-anchor">Ostavite recenziju <i class="fas fa-plus"></i></a> 
        </div>
    
        <div class="row post-review-box" id="po_`+id +`" style="display:none;" >                                                                         
            <div class="col-md-12">
                <div accept-charset="UTF-8"  >
                    
                    <input class="ratings-hidden" name="rating" type="hidden">                                                          
                    <textarea class="form-control animated new-review" id="desc_`+id +`"  cols="50" name="comment" placeholder="..." rows="5"></textarea>  
    
                    <div class="text-right">
                        <div class="stars starrr text-primary" data-rating="0">
                        <span type="button" class="glyphicon .glyphicon-star-empty glyphicon-star-empty" broj=1></span>
                        <span type="button" class="glyphicon .glyphicon-star-empty glyphicon-star-empty" broj=2></span>
                        <span type="button" class="glyphicon .glyphicon-star-empty glyphicon-star-empty" broj=3></span>
                        <span type="button" class="glyphicon .glyphicon-star-empty glyphicon-star-empty" broj=4></span>
                        <span type="button" class="glyphicon .glyphicon-star-empty glyphicon-star-empty" broj=5></span>
                        </div>
                        <a class="btn btn-danger close-review-box" id="`+ id+`_closeButt" style=" margin-right: 10px;">                
                        <span class="glyphicon glyphicon-remove"></span></a>
                        <button class="btn btn-success" id="`+ id+`_suceButt" >Sacuvaj</button>
                    </div>
                </div>
            </div>
        </div>
    </div> 
     
    </div>
    </div>
</div>`);
 $("#ostRec_"+id).click(function(){
    var toka = localStorage.getItem("tokenLogin");
  
    $("#ostRec_"+id).hide();
    $("#po_"+id).fadeIn();
    $("span[broj]").click(function()
    {
        var br = $(this).attr("broj");
        rateNewReview =br;
        while(br>0){
            $("span[broj="+br+"]").removeClass("glyphicon-star-empty");
            $("span[broj="+br+"]").addClass("glyphicon-star");
            br--;
        }

    });
    $("#"+id+"_suceButt").click(function(){
        
        descNewReview= $("#desc_"+id).val();

        var username = localStorage.getItem("tokenLogin");
        if(username != null){

            console.log(rateNewReview, descNewReview)
            fetch("https://localhost:5001/Adds/AddReview",{
                method:'POST',
                body: JSON.stringify({
                        username : username,
                        add_title : add_title,
                        r_added_date : "2022-01-13T13:58:57.936Z",
                        rate: rateNewReview,
                        description : descNewReview
                    }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                }).then(resp => {
                    if (resp.status == 200) {
                         
                        $("#"+id +"_rate").empty();
                        $("#"+ id + username).remove(); 
                        getNewRate(add_title, id)
                        nacrtajRecenzije(username ,new Date().toString().split('G')[0], descNewReview, rateNewReview, id);
                        
                        $("#desc_"+id).val("");
                        $("span[broj]").each(function(){
                            if($(this).hasClass("glyphicon-star")){
                                $(this).removeClass("glyphicon-star");
                                $(this).addClass("glyphicon-star-empty");
                            }
                            
                        })
                        $("#po_"+id).fadeOut();
                        $("#ostRec_"+id).fadeIn();
                    } 
                    else 
                    {
                        bootbox.alert("Some error has occured, please, try again!")
                    }
            });
        }
        else{
            bootbox.alert("You can post your review only when you are logged in!")
            $("#"+id+"_closeButt").click()
        }
     
        
    });

});


$("#"+id+"_closeButt").click(function(){
    
    $("#desc_"+id).val("");
    $("span[broj]").each(function(){
        if($(this).hasClass("glyphicon-star")){
            $(this).removeClass("glyphicon-star");
            $(this).addClass("glyphicon-star-empty");
        }
        
    })
    $("#po_"+id).fadeOut();
    $("#ostRec_"+id).fadeIn();

});

}

function uzmiPodatkeReviews(add_title, id){
    
    var rate = 0;
    fetch("https://localhost:5001/Adds/GetAddReviews/"+add_title).then(resp => {

        if (resp.status == 200) {
            resp.json().then(data => {

                data.forEach(el=>{
                    nacrtajRecenzije(el['username'], new Date(Date.parse(el['r_added_date'])).toString().split(' G')[0], el['description'], el['rate'], id);
                    rate = rate + el['rate']
                });

                var rateSpan = document.getElementById(id + "_rate")
                rate = (rate/data.length) || 0;
                crtajOcenu(rateSpan, rate);

            });
        }
        else {
            
            //mozda neko obavestenje nema liked services
        }
    });
    
}

$(".button-recenzija").click(function () {
    
    if ($($(this).parent().parent().siblings(".recenzije")).is(":visible")) {
        $(this).parent().parent().siblings(".recenzije").delay(100).fadeOut();
        $(this).html('<i class="fas fa-plus"></i>');
    }
    else {
        $(this).parent().parent().siblings(".recenzije").delay(100).fadeIn();
        $(this).html('<i class="fas fa-times"></i>');
    }

    return false;

});


