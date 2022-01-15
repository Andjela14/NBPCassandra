var logintry=1;
async function checkLoginSession()
{
    let token=window.localStorage.getItem("tokenLogin");
    
    if(token!=null)
    {
        //ako je token!=null znaci da je ulogovan neki korisnik i proverava se njegova 
        //sesija
        let response=await fetch("https://localhost:5001/Login/CheckLoginSession/"+token,{
            method:"GET"
        });
        let json_response=await response.json();
        return json_response;
    }
    else
        return -1;//takodje se vraca kao response posto je async funkcija
}
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation');
    onloadLanguage();
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
             
          if (!form.checkValidity() ) {
            
            event.preventDefault()
            event.stopPropagation()
          }
          else {
               event.preventDefault();

               var email = document.getElementById("exampleInputEmail").value;
               var pass  = document.getElementById("exampleInputPassword").value;
               fetch("https://localhost:5001/Login/LoginUserByEmail/" + email +"/"+ pass
                )
               .then(resp=>{
                   
                if(resp.status == 200 ){
                    resp.json().then(data =>{
                        console.log(data.value,data.value['uname']);
                        
                       localStorage.setItem("tokenLogin",data.value['uname']);
                      location.href= 'index-user.html';
                        
                    }); 
               }
               else if(resp.status == 202 ){
                   logintry++;console.log(logintry );
                   document.getElementById("exampleInputEmail").value = email; 
                   
                   document.getElementById("exampleInputPassword").classList.add("invalid");
                   document.getElementById("exampleInputPassword").value="";
                    
                   if(logintry>=4){
                       bootbox.confirm("Several times you entered wrong password, if you like to resert your password click on Forgotten password belove the form.", function(result){ 
                           result; 
                       });
                   }
                   
               }
               else if(resp.status == 404){
                   console.log("404");
                   location.href= '404.html'; 
               }});
          }
          form.classList.add('was-validated')
          
        }, false)
      })
  })();
  function forgottenpass(e){
    e.preventDefault();
    e.stopPropagation();
     var email = document.getElementById("exampleInputEmail").value;
     console.log(email);
     if(email==undefined || email==""){
     
        bootbox.prompt({
        title: "Please enter your email address!", 
        centerVertical: true,
        callback: function(result){ 
            
                const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(re.test(String(result).toLowerCase())){
                    email= result;
                  
                }
                else{
                    bootbox.alert("You entered invalid password!");
                    return;
                }
                    
            
            
        }
    });
    }
    else {
        console.log("daaaa");
    }
     fetch("https://localhost:5001/Login/SendEmail/" + email).then(resp=>{
                   
                         if(resp.status == 200 ){
                             bootbox.alert("Email for informations  needed to recovery password is sent to your email address " +email+" !");
                             return;
                           
                           
                        }
                        else if(resp.status == 303 ){
                         bootbox.alert("Email address you entered isnt registrated in this aplication, you can register now,just click on Register button!");
                         return;
                           
                        }
                        else {
                            console.log("404");
                            location.href= '404.html'; 
                        }
                         });
    

    
}
     
       