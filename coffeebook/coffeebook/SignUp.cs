using System;
using System.Text;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;

namespace coffeebook
{
    public static class SignUp
    {
        [FunctionName("SignUp")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "coffeebook-db",
                collectionName: "Users",
                ConnectionStringSetting = "cosmosdb-connection-string")] IAsyncCollector<User> userOut,
            ILogger log,
            ExecutionContext context)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic userIn = JsonConvert.DeserializeObject(requestBody, typeof(UserInfo));

                string meessage = userIn.Id + "のユーザー情報を登録します";
                log.LogInformation(meessage);

                #region ユーザーIDの重複チェック

                // 設定値読み込み
                var config = new ConfigurationBuilder()
                    .SetBasePath(context.FunctionAppDirectory)
                    .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                    .AddEnvironmentVariables()
                    .Build();

                var connectionString = config.GetConnectionString(Consts.COSMOSDB_CONNECTION_STRING);
                var client = new CosmosClient(connectionString);
                var usersContainer = client.GetContainer(Consts.COFFEEBOOK_DB, Consts.USERS_CONTAINER);

                var query = usersContainer.GetItemQueryIterator<User>(new QueryDefinition(
                    "select * from r where r.userId = @userId")
                    .WithParameter("@userId", (string)userIn.Id));

                List<User> results = new List<User>();
                while (query.HasMoreResults)
                {
                    var response = await query.ReadNextAsync();
                    results.AddRange(response.ToList());
                }

                if (results.Count() != 0)
                {
                    return new ConflictObjectResult("このユーザーIDは既に使用されています。");
                }

                #endregion

                // ハッシュの計算
                byte[] salt = UserService.GenerateSalt();
                byte[] hashedPassword = UserService.GenerateHashedValue(userIn.Password, salt);

                var user = new User
                {
                    UserId = userIn.Id,
                    HashedPassword = hashedPassword,
                    Salt = salt
                };

                await userOut.AddAsync(user);

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
