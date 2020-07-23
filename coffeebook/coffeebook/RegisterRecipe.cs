using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coffeebook
{
    /// <summary>
    /// ÉåÉVÉsìoò^
    /// </summary>
    /// <returns>ìoò^ÇÃê¨î€</returns>
    public static class RegisterRecipe
    {
        [FunctionName("RegisterRecipe")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: Consts.COFFEEBOOK_DB,
                collectionName: Consts.RECIPES_CONTAINER,
                ConnectionStringSetting = Consts.COSMOSDB_CONNECTION_STRING)] IAsyncCollector<Recipe> recipeOut,
            ILogger log,
            ExecutionContext context)
        {
            log.LogInformation("ÉåÉVÉsìoò^èàóùÇé¿çsÇµÇ‹Ç∑");

            try
            {
                // ê›íËèÓïÒÇÃéÊìæ
                var config = new ConfigurationBuilder()
                    .SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();
                var connectionString = config.GetConnectionString(Consts.COSMOSDB_CONNECTION_STRING);

                req.HttpContext.Request.Cookies.TryGetValue(Consts.SESSION_ID_COOKIE, out string sessionId);

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic recipeIn = JsonConvert.DeserializeObject(requestBody, typeof(Recipe));

                // ÉåÉVÉsÇ…ÉÜÅ[ÉUÅ[IDÇïRÇ√ÇØÇÈ
                recipeIn.UserId = await UserService.GetUserIdFromSessionContainer(connectionString, sessionId);

                await recipeOut.AddAsync(recipeIn);

                return new OkResult();
            }
            catch
            {
                return new BadRequestResult();
            }
        }
    }
}
