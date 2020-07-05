using System;
using System.Text;
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
    public static class SignUp
    {
        [FunctionName("SignUp")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: "coffeebook-db",
                collectionName: "Users",
                ConnectionStringSetting = "cosmosdb-connection-string")] IAsyncCollector<User> userOut,
            ILogger log)
        {
            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                dynamic userIn = JsonConvert.DeserializeObject(requestBody, typeof(UserInfo));

                string meessage = userIn.Id + "のユーザー情報を登録します";
                log.LogInformation(meessage);

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
            catch
            {
                return new BadRequestResult();
            }
        }
    }
}
