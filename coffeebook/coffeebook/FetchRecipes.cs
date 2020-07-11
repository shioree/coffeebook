using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Azure.Cosmos.Fluent;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

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

            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            // クライアントを取得する
            var connectionString = config.GetConnectionString("cosmosdb-connection-string");
            var client = new CosmosClient(connectionString);

            // Sessionコンテナを取得する
            var sessionContainer = client.GetContainer("coffeebook-db", "Session");

            // セッションIDからユーザIDを取得する
            req.HttpContext.Request.Cookies.TryGetValue("sessionId", out string sessionId);

            var sessionQuery = sessionContainer.GetItemQueryIterator<Session>(new QueryDefinition(
                "select * from r where r.sessionId = @sessionId")
                .WithParameter("@sessionId", sessionId));

            var sessions = new List<Session>();
            while (sessionQuery.HasMoreResults)
            {
                var response = await sessionQuery.ReadNextAsync();
                sessions.AddRange(response.ToList());
            }

            // Usersコンテナを取得する
            var userContainer = client.GetContainer("coffeebook-db", "Recipes");

            var userQuery = userContainer.GetItemQueryIterator<Recipe>(new QueryDefinition(
                "select * from r where r.userId = @userId")
                .WithParameter("@userId", sessions[0].UserId));

            List<Recipe> results = new List<Recipe>();
            while (userQuery.HasMoreResults)
            {                
                var response = await userQuery.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }
    }
}
