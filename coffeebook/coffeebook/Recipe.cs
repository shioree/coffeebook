﻿using Newtonsoft.Json;

namespace coffeebook
{
    /// <summary>
    /// レシピの情報
    /// </summary>
    public partial class Recipe
    {
        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("userId")]
        public string UserId { get; set; }

        [JsonProperty("beans")]
        public Beans Beans { get; set; }

        [JsonProperty("style")]
        public Style Style { get; set; }

        [JsonProperty("evaluation")]
        public Evaluation Evaluation { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("memo")]
        public string Memo { get; set; }
    }

    /// <summary>
    /// 豆の情報
    /// </summary>
    public partial class Beans
    {
        [JsonProperty("origin")]
        public string Origin { get; set; }

        [JsonProperty("shop")]
        public string Shop { get; set; }

        [JsonProperty("roast")]
        public string Roast { get; set; }

        [JsonProperty("grain")]
        public string Grain { get; set; }
    }

    /// <summary>
    /// 評価の情報
    /// </summary>
    public partial class Evaluation
    {
        [JsonProperty("rating")]
        public int Rating { get; set; }

        [JsonProperty("taste")]
        public int Taste { get; set; }

        [JsonProperty("density")]
        public int Density { get; set; }

        [JsonProperty("harshness")]
        public int Harshness { get; set; }

        [JsonProperty("comment")]
        public string Comment { get; set; }
    }

    /// <summary>
    /// ドリップの情報
    /// </summary>
    public partial class Style
    {
        [JsonProperty("beansAmount")]
        public string BeansAmount { get; set; }

        [JsonProperty("steamTime")]
        public string SteamTime { get; set; }

        [JsonProperty("extractionTimeMinute")]
        public string ExtractionTimeMinute { get; set; }

        [JsonProperty("extractionTimeSecond")]
        public string ExtractionTimeSecond { get; set; }

        [JsonProperty("productAmount")]
        public string ProductAmount { get; set; }
    }

    /// <summary>
    /// 削除のインターフェース
    /// </summary>
    public partial class DeleteModel
    {
        [JsonProperty("id")]
        public string Id { get; set; }
    }
}
