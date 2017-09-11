using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MovieApi.Startup))]
namespace MovieApi
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
