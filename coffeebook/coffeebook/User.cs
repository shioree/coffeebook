using Newtonsoft.Json;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Security.Cryptography;

namespace coffeebook
{
    public partial class UserInfo
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("password")]
        public string Password { get; set; }
    }

    public partial class User
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("hashedPassword")]
        public byte[] HashedPassword { get; set; }

        [JsonProperty("salt")]
        public byte[] Salt { get; set; }
    }

    public partial class Session
    {
        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("sessionId")]
        public string SessionId { get; set; }
    }

    public class UserService
    {
        /// <summary>
        /// ソルトを生成
        /// </summary>
        /// <returns>ソルト</returns>
        public static byte[] GenerateSalt()
        {
            using var rng = RandomNumberGenerator.Create();
            {
                var buff = new byte[128 / 8];
                rng.GetBytes(buff);
                return buff;
            }
        }

        /// <summary>
        /// パスワードとソルトからハッシュを作成
        /// </summary>
        /// <returns>ハッシュ</returns>
        public static byte[] GenerateHashedValue(string password, byte[] salt)
        {
            var b = new Rfc2898DeriveBytes(
                password,
                salt,
                100,
                HashAlgorithmName.SHA256);
            return b.GetBytes(256);
        }

        /// <summary>
        /// セッションIDを生成
        /// </summary>
        /// <returns>セッションID</returns>
        public static string GenerateSessionId()
        {
            return Encoding.UTF8.GetString(GenerateSalt());
        }
    }
}
