using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coffeebook
{
    public static class RegisterRecipe
    {
        [FunctionName("RegisterRecipe")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "coffeebook-db",
                collectionName: "Recipes",
                ConnectionStringSetting = "cosmosdb-connection-string")] IAsyncCollector<Recipe> recipeOut,
            ILogger log,
            ExecutionContext context)
        {
            log.LogInformation("レシピ登録処理を実行します");

            try
            {
                // 設定情報の取得
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

                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic recipeIn = JsonConvert.DeserializeObject(requestBody, typeof(Recipe));

                recipeIn.UserId = sessions[0].UserId;

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
