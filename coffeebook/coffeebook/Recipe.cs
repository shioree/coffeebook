using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace coffeebook
{
    public partial class Recipe
    {
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

    public partial class Evaluation
    {
        [JsonProperty("rating")]
        public string Rating { get; set; }

        [JsonProperty("taste")]
        public string Taste { get; set; }

        [JsonProperty("density")]
        public string Density { get; set; }

        [JsonProperty("harshness")]
        public string Harshness { get; set; }

        [JsonProperty("comment")]
        public string Comment { get; set; }
    }

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
}
