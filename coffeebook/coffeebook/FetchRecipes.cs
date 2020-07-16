using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

namespace coffeebook
{
    public static class FetchRecipes
    {
        [FunctionName("FetchRecipes")]
        public static async Task<IEnumerable<Recipe>> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            log.LogInformation("レシピ取得処理を実行します");

            // 設定情報の取得
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();
            var connectionString = config.GetConnectionString("cosmosdb-connection-string");

            req.HttpContext.Request.Cookies.TryGetValue("sessionId", out string sessionId);

            // ユーザーに紐づくレシピの取得
            var client = new CosmosClient(connectionString);
            var recipeContainer = client.GetContainer("coffeebook-db", "Recipes");

            var recipeQuery = recipeContainer.GetItemQueryIterator<Recipe>(new QueryDefinition(
                "select * from r where r.userId = @userId")
                .WithParameter("@userId", await UserService.GetUserIdFromSessionContainer(connectionString, sessionId)));

            List<Recipe> results = new List<Recipe>();
            while (recipeQuery.HasMoreResults)
            {                
                var response = await recipeQuery.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }
    }
}
