﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MovieApi.Models
{
    public class Movie
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Poster { get; set; }
        public int Budget { get; set; }
        public IList<string> Genres { get; set; }
        public string Lenguage { get; set; }
        public string Overview { get; set; }
        public decimal Popularity { get; set; }
        public string RealeseDate { get; set; }
        public int Runtime { get; set; }
        public decimal VoteAverage { get; set; }
        public string Title { get; set; }
    }
}