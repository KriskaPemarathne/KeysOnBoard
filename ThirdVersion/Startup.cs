using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ThirdVersion.Startup))]
namespace ThirdVersion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
