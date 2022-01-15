using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OglasiSe.Models;

namespace OglasiSe
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        [HttpGet]
        [Route("LoginUser/{username}/{password}")]
        public IActionResult LoginUser([FromRoute(Name = "username")]string username, [FromRoute(Name = "password")]string password)
        { 
            String registred = DataProvider.RegistredUser(username, password);
            if (registred == "yes")
            {
                return  new JsonResult(new { status = "200"});
            }
            else if (registred == "no")
            {
                return  new JsonResult(new { status = "202"});
            }
            else if (registred == "badPassword")
            {
                return  new JsonResult(new { status = "201"});
            }
            else{
                return  new JsonResult(new { status = "404"});
            }
        }

        [HttpPost]
        [Route("RegisterUser")]
        public IActionResult RegisterUser([FromBody] User user)
        {
            try{ 
                return Ok(DataProvider.AddUser(user));  
            }
            catch(Exception e){
                return BadRequest(e.ToString());
            }
        }

        [HttpDelete]
        [Route("DeleteUser/{username}")]
        public ActionResult DeleteUser([FromRoute(Name = "username")] string username)
        {
            try 
            {
                DataProvider.DeleteUsersAdds(username);
                DataProvider.DeleteUser(username);
                return Ok();
            }
            catch(Exception e){
                return BadRequest(e.ToString());
            }
        }

        [HttpGet]
        [Route("GetAllUsers")]
        public IActionResult GetAllUseres()
        {
            try
            {
                return Ok(DataProvider.GetAllUsers());
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpGet]
        [Route("GetUser/{username}")]
        public ActionResult GetUser([FromRoute(Name ="username")]string username)
        {
            User user = DataProvider.GetUser(username);
            if (user == null)
            {
                return Ok(false);
            }

            return Ok(user);
        }

        [HttpGet]
        [Route("GetAllAdvertisements")]
        public IActionResult GetAllAdvertisements()
        {
            try
            {
                return Ok(DataProvider.GetAllAdvertisements());
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPut]
        [Route("EditFirstLastName/{username}/{first_name}/{lats_name}")]
        public IActionResult EditFirstLastName([FromRoute(Name ="username")]string username, [FromRoute(Name ="first_name")]string first_name, [FromRoute(Name ="lats_name")]string last_name)
        {
            if(DataProvider.updateUsersName(username,first_name,last_name))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [Route("UpdateUsersPass/{username}/{new_pass}")]
        public IActionResult UpdateUsersPass([FromRoute(Name ="username")]string username, [FromRoute(Name ="new_pass")]string new_pass)
        {
            try
            {
                return Ok(DataProvider.updateUsersPass(username, new_pass));
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
    }
}