var logintry = 1;
  $(document).ready(function () {
    'use strict'
 
    var forms = document.querySelectorAll('.needs-validation');
    $("#logForm").submit(function(e) {
        e.preventDefault();
    });

    localStorage.removeItem("tokenLogin")

    Array.prototype.slice.call(forms)
        .forEach(function (form) {

            form.addEventListener('submit', function (event) {
                
                if (!form.checkValidity()) {

                    event.preventDefault()
                    event.stopPropagation()
                }
                else {
                   
                    var username = document.getElementById("exampleInputUsername").value;
                    var pass = document.getElementById("exampleInputPassword").value;
                    event.preventDefault();
                
                                    
                    fetch("https://localhost:5001/User/LoginUser/" + username + "/" + pass )
                    .then(resp =>{
                        resp.json().then(data=>{
                            if (data["status"] == "200")
                            {
                                localStorage.setItem("tokenLogin", username); 
                                location.href = "index.html";
                            }
                            else if (data["status"] == "201")
                            {
                                bootbox.alert("You entered invalid password!"); 
                                document.getElementById("exampleInputPassword").value = "";
                            }
                            else if (data["status"] == "202")
                            {
                                bootbox.alert("This username is not registred on our site!Try to register!"); 
                                document.getElementById("exampleInputPassword").value = "";
                            }
                            else
                            {
                                bootbox.alert("Something went wrong, please try again..."); 
                                document.getElementById("exampleInputUsername").value = "";
                                document.getElementById("exampleInputPassword").value = "";
                            }
                        }) 
                    });
                }
                            
                
                form.classList.add('was-validated')

            }, false)
        })
                
       
});



function EnableFunction() {
    logintry = 0;
    document.getElementById("exampleInputEmail").disabled = false;
    document.querySelector(".btn-user.loglang").disabled = false;
    document.getElementById("exampleInputPassword").classList.remove("invalid");
    let errorMesage = document.querySelector(".infbpass");
    errorMesage.innerHTML = "Pogrešna lozinka!";
    

}

