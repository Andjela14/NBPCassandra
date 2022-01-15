$(document).ready(function () {
 
  let username = localStorage.getItem("tokenLogin");
  console.log(username)
  //if(provera != null)
  //var urll = "index.html";
  //proveraKorisnika(provera, urll, "true");

}
);
function proveraKorisnika(provera, url, foo) {

  // if (provera != null || provera == "") {
  //   console.log(provera);
  //   if (new Date(JSON.parse(provera)['exp']) > new Date()) {

  //     checkLoginSession(JSON.parse(provera)['user'])
  //       .then(data => {
  //         if (data['status'] == "200") {
  //           if (data['url'] != "")
  //             url = data['url'];
  //           if (JSON.parse(provera)['conf'] == foo) {
  //             location.href = url;
  //             //console.log("dabreeeee");
  //           }

  //         } else {

  //         }

  //       });

  //   }
  //   else {
  //     console.log("trrrrrtcghvjk");
  //   }
  // }
}
