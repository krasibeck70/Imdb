using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MovieApi.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult PopularMovies()
        {
            return View();
        }

        public ActionResult ComingSoon()
        {
            return View();
        }
        [HttpGet]
        public ActionResult MovieDetails(string id)
        {
            ViewBag.id = id;
            return View();
        }
    }
}