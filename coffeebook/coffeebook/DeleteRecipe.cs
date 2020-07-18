using System.IO;
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
    public static class DeleteRecipe
    {
        [FunctionName("DeleteRecipe")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log,
            ExecutionContext context)
        {
            try
            {
                // 設定値読み込み
                var config = new ConfigurationBuilder()
                    .SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();

                // コンテナを取得する
                var connectionString = config.GetConnectionString(Consts.COSMOSDB_CONNECTION_STRING);
                var client = new CosmosClient(connectionString);
                var container = client.GetContainer(Consts.COFFEEBOOK_DB, Consts.RECIPES_CONTAINER);

                // セッションIDからユーザIDを取得する
                req.HttpContext.Request.Cookies.TryGetValue("sessionId", out string sessionId);
                string partitionKey = await UserService.GetUserIdFromSessionContainer(connectionString, sessionId);

                // 削除対象のidを取得する
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic deleteModel = JsonConvert.DeserializeObject(requestBody, typeof(DeleteModel));

                log.LogInformation(partitionKey + "のレシピID:" + (string)deleteModel.Id + "を削除します");

                ItemResponse<Recipe> deleteSessionResponse = await container.DeleteItemAsync<Recipe>((string)deleteModel.Id, new PartitionKey(partitionKey));

                return new OkResult();
            }
            catch(Exception ex)
            {
                log.LogInformation(ex.ToString());
                return new BadRequestResult();
            }
        }
    }
}