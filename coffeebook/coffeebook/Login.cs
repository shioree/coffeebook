using System;
using System.Text;
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
    /// <summary>
    /// ログイン
    /// </summary>
    /// <remarks>ログインに成功したら、セッションIDをCookieに格納する</remarks>
    /// <returns>ログインの成否</returns>
    public static class Login
    {
        [FunctionName("Login")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            [CosmosDB(
                databaseName: Consts.COFFEEBOOK_DB,
                collectionName: Consts.SESSION_CONTAINER,
                ConnectionStringSetting = Consts.COSMOSDB_CONNECTION_STRING)] IAsyncCollector<Session> sessionOut,
            ILogger log,
            ExecutionContext context)
        {
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody, typeof(UserInfo));

            string message = data.Id + "のログインを認証します";
            log.LogInformation(message);

            // 設定値読み込み
            var config = new ConfigurationBuilder()
                .SetBasePath(context.FunctionAppDirectory)
                .AddJsonFile("local.settings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .Build();

            // コンテナを取得する
            var connectionString = config.GetConnectionString(Consts.COSMOSDB_CONNECTION_STRING);
            var client = new CosmosClient(connectionString);
            var usersContainer = client.GetContainer(Consts.COFFEEBOOK_DB, Consts.USERS_CONTAINER);

            var query = usersContainer.GetItemQueryIterator<User>(new QueryDefinition(
                "select * from r where r.userId = @userId")
                .WithParameter("@userId", (string)data.Id));

            List<User> results = new List<User>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            if (results.Count() != 0)
            {
                // パスワードの確認
                byte[] hashedPassword = UserService.GenerateHashedValue(data.Password, results[0].Salt);

                if (!Enumerable.SequenceEqual(results[0].HashedPassword, hashedPassword))
                {
                    return new BadRequestResult(); // パスワード認証失敗
                }

                // セッション情報の作成
                string sessionId = UserService.GenerateSessionId();
                var session = new Session
                {
                    UserId = data.Id,
                    SessionId = sessionId
                };
                await sessionOut.AddAsync(session);

                // Cookieへセッション情報を格納
                //var cookieOption = new CookieOptions()
                //{
                //    Secure = true,
                //    SameSite = SameSiteMode.None
                //};
                //req.HttpContext.Response.Cookies.Append("sessionId", sessionId, cookieOption); // フロントエンドで上手く扱えていないため、保留中
                req.HttpContext.Response.Cookies.Append(UserConst.sessionId, sessionId);

                return new OkResult();
            }
            else
            {
                return new BadRequestResult(); // ユーザー情報なし
            }
        }
    }
}
