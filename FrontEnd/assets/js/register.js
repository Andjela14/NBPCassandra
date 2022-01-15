(function () {
    'use strict'
  
    var forms = document.querySelectorAll('.needs-validation');
    Array.prototype.slice.call(forms).forEach(function (form){

      form.addEventListener('submit', function (event) {
        
        if (!form.checkValidity() ) {
          event.preventDefault()
          event.stopPropagation()
        }
        else if(document.getElementById("examplePasswordInput").value  != document.getElementById("exampleRepeatPasswordInputa").value){
            console.log(document.getElementById("exampleRepeatPasswordInputa").value, document.getElementById("examplePasswordInput").value )
            document.getElementById("exampleRepeatPasswordInputa").classList.add("invalid");
            document.getElementById("exampleRepeatPasswordInputa").value="";
            event.preventDefault()
            event.stopPropagation()
        }
        else {
            event.preventDefault();
           
            var lastName = document.getElementById("exampleFirstName").value;
            var firstName = document.getElementById("exampleLastName").value;
            var username = document.getElementById("exampleUsername").value;
            var password = document.getElementById("examplePasswordInput").value;
            var Email = document.getElementById("exampleInputEmail").value;
      
            console.log(lastName,firstName,password ,Email);

            fetch("https://localhost:5001/User/RegisterUser",{
            method:'POST',
            body: JSON.stringify({
                username: username,
                first_name: lastName,
                lats_name: firstName,
                email: Email,
                password: password
                }),
                headers: {
                  'Content-type': 'application/json',
                }
            }
            ).then(resp => {
                if (resp.status == 200) {
                  resp.json().then(data=>{
                    if(data[0][0]){
                      bootbox.alert({ 
                        message: "Your account has been successfully created! You can login now!",
                        callback: function(){ location.href = "login.html"; }    
                      });
                    }
                    else
                    {
                      document.getElementById("exampleUsername").value="";
                      bootbox.alert("This username isn't available. Please try another one..");
                      event.preventDefault()
                      event.stopPropagation()
                    }
                  })
                }  
                else
                {
                    location.href = '404.html';
                }    
          });
        }
        form.classList.add('was-validated')
           
         }, false)

    })

})()
