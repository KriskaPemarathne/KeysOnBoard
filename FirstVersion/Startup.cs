using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FirstVersion.Startup))]
namespace FirstVersion
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
