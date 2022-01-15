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
    public class AddsController : ControllerBase
    {   
        [HttpPost]
        [Route("AddAdvertisement")]
        public ActionResult AddAdvertisement([FromBody] Advertisement add)
        {
            try
            {
                if(DataProvider.AddUserAdd(add) && DataProvider.AddLatestAdd(add) && DataProvider.AddAddsByCategory(add))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPost]
        [Route("LikeAdd/{username}/{add_title}/{added_date}")]
        public ActionResult LikeAdd([FromRoute(Name = "username")]string us,[FromRoute(Name = "add_title")] string title, [FromRoute(Name = "added_date")]string date)
        {
            try
            {
                if(DataProvider.LikeAdd(us,title,date))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpDelete]
        [Route("UnlikeAdd/{username}/{add_title}/{added_date}")]
        public ActionResult UnikeAdd([FromRoute(Name = "username")]string us,[FromRoute(Name = "add_title")] string title, [FromRoute(Name = "added_date")]string date)
        {
            try
            {
                if(DataProvider.UnlikeAdd(us,title,date))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpDelete]
        [Route("UnlikeAdd/{username}/{add_title}")]
        public ActionResult UnikeAddDel([FromRoute(Name = "username")]string us,[FromRoute(Name = "add_title")] string title)
        {
            try
            {
                if(DataProvider.UnlikeAdd(us,title, ""))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpGet]
        [Route("GetLikedAdds/{username}")]
        public IActionResult GetLikedAdds([FromRoute(Name = "username")] string us)
        {
            try
            {
                return Ok(DataProvider.GetLikedAdds(us));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
        
        [HttpGet]
        [Route("GetLatestAdds")]
        public IActionResult GetLatestAdds()
        {
            try
            {
                return Ok(DataProvider.GetLatestAdds());
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPost]
        [Route("GetAddsFromTitles")]
        public IActionResult GetAddsFromTitles([FromBody] string[] data){
            try
            {
                return Ok(DataProvider.GetAddsFromTitles(data));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpGet]
        [Route("GetAddsByCategory/{category}")]
        public IActionResult GetAddsByCategory([FromRoute(Name = "category")] string category)
        {
            try
            {
                return Ok(DataProvider.GetAddsByCategory(category));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpGet]
        [Route("GetUsersAdds/{username}")]
        public IActionResult GetUsersAdds([FromRoute(Name = "username")] string username)
        {
            try
            {
                return Ok(DataProvider.GetUsersAdds(username));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        

        [HttpGet]
        [Route("GetAddReviews/{add_title}")]
        public IActionResult GetAddReviews([FromRoute(Name = "add_title")] string add_title)
        {
            try
            {
                return Ok(DataProvider.GetAddReviews(add_title));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
       
        [HttpGet]
        [Route("GetAddRate/{add_title}")]
        public IActionResult GetAddRate([FromRoute(Name = "add_title")] string add_title)
        {
            try
            {
                return Ok(DataProvider.GetAddRate(add_title));
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPost]
        [Route("AddReview")]
        public ActionResult AddReview( [FromBody] Review review)
        {
            try
            {
                if(DataProvider.AddReview(  review))
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpPut]
        [Route("UpdateAdvertisement/{date}")]
        public IActionResult UpdateAdvertisement([FromBody] Advertisement add, [FromRoute(Name = "date")]string date)
        {
            try
            {
                return Ok(DataProvider.UpdateAdvertisement(add, "LatestAdds" , " added_date = '"+ date+"'") &&
                            DataProvider.UpdateAdvertisement(add, "Adds_by_category", "category = '"+ add.category +"'") &&
                           DataProvider.UpdateAdvertisement(add, "UsersAdds", "username = '"+add.username+"'" )
                );
            }
            catch(Exception e)
            {
                return BadRequest(e.ToString());
            }
        }

        [HttpDelete]
        [Route("DeleteAdd/{add_title}/{category}/{username}")]
        public ActionResult DeleteAdd([FromRoute(Name = "add_title")] string add_title,
                                        [FromRoute(Name = "category")] string category,
                                        [FromRoute(Name = "username")] string username)
        {
            if(DataProvider.DeleteAdd("LatestAdds", add_title, "' " ) && 
               DataProvider.DeleteAdd("UsersAdds", add_title, "' and  username = '"+ username +"' ") &&
                DataProvider.DeleteAdd("Adds_by_category", add_title, "' and  category = '"+ category +"' ")
            )
            {
                return Ok();
            }
            return BadRequest();
        }
    }
}