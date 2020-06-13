using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace coffeebook
{
    public static class RegisterRecipe
    {
        [FunctionName("RegisterRecipe")]
        public static async Task Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "coffeebook-db",
                collectionName: "Recipes",
                ConnectionStringSetting = "cosmosdb-connection-string")] IAsyncCollector<string> recipeOut,
            ILogger log)
        {
            log.LogInformation("ÉåÉVÉsìoò^èàóùÇé¿çsÇµÇ‹Ç∑");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();

            await recipeOut.AddAsync(requestBody);
        }
    }
}
