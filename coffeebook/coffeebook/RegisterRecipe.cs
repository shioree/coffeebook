using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

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
                ConnectionStringSetting = "cosmosdb-connection-string")] IAsyncCollector<Recipe> recipeOut,
            ILogger log)
        {
            log.LogInformation("ÉåÉVÉsìoò^èàóùÇé¿çsÇµÇ‹Ç∑");

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic recipeIn = JsonConvert.DeserializeObject(requestBody, typeof(Recipe));

            await recipeOut.AddAsync(recipeIn);
        }
    }
}
