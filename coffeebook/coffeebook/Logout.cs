using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.Cosmos;
using Newtonsoft.Json;
using System;

namespace coffeebook
{
    public static class Logout
    {
        [FunctionName("Logout")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            // 設定値読み込み
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            // セッションIDからユーザIDを取得する
            req.HttpContext.Request.Cookies.TryGetValue("sessionId", out string sessionId);

            // コンテナを取得する
            var connectionString = config.GetConnectionString("cosmosdb-connection-string");
            var client = new CosmosClient(connectionString);
            var container = client.GetContainer("coffeebook-db", "Session");

            var query = container.GetItemQueryIterator<Session>(new QueryDefinition(
                "select * from r where r.sessionId = @sessionId")
                .WithParameter("@sessionId", sessionId));

            List<Session> results = new List<Session>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            string documentId = results[0].Id;
            string partitionKey = results[0].UserId;

            log.LogInformation(partitionKey + "をログアウトします");

            ItemResponse<Session> deleteSessionResponse = await container.DeleteItemAsync<Session>(documentId, new PartitionKey(partitionKey));
            req.HttpContext.Response.Cookies.Delete(UserConst.sessionId);

            return new OkResult();
        }
    }
}
