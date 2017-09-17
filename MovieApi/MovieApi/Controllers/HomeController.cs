using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Hosting;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using MovieApi.Models;

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
            if (Request.IsAuthenticated)
            {
                var context = new ApplicationDbContext();
                var userId = User.Identity.GetUserId();
                var movies = context.Users.FirstOrDefault(x => x.Id == userId).Movieslikes;
                ViewBag.id = id.Split()[0];
                return View(movies);
            }
            else
            {
                return View();
            }
            
        }

        [HttpGet]
        public ActionResult FavoritesMovies()
        {
            var context = ApplicationDbContext.Create();
            var userId = User.Identity.GetUserId();
            var movies = context.Users.FirstOrDefault(x => x.Id == userId).Movieslikes;
            return View(movies);
        }

        [HttpPost]
        public ActionResult FavoritesMovies(Movie movie)
        {
            var context = ApplicationDbContext.Create();
            var userId = User.Identity.GetUserId();
            var user = context.Users.FirstOrDefault(x => x.Id == userId);
            if (user.Movieslikes.Any(x => x.Id == movie.Id))
            {
                context.Movies.FirstOrDefault(x => x.Id == movie.Id).Users.Remove(user);
                user.Movieslikes.Remove(movie);
            }
            else
            {
                var genres = movie.GenresString.Split();
                foreach (var genre in genres)
                {
                    movie.Genres.Add(genre);
                }
                movie.Users.Add(user);
                context.Movies.Add(movie);
            }
            
            context.SaveChanges();
            
            return null;
        }
        
    }
}