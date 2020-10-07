using System.Collections.Generic;
using Newtonsoft.Json;

public class PlaidSettings
{
    public string ClientId { get; set; }
    public string ClientSecret { get; set; }
    public string BaseUrl { get; set; }
}

public class TokenCreateDto
{
    [JsonProperty("client_id")]
    public string ClientId { get; set; }

    [JsonProperty("secret")]
    public string ClientSecret { get; set; }

    [JsonProperty("client_name")]
    public string ClientName { get; set; }

    [JsonProperty("country_codes")]
    public IEnumerable<string> CountryCodes { get; set; }

    [JsonProperty("language")]
    public string Language { get; set; }

    [JsonProperty("user")]
    public User User { get; set; }

    [JsonProperty("products")]
    public IEnumerable<string> Products { get; set; }

}

public class User
{

    [JsonProperty("client_user_id")]
    public string ClientUserId { get; set; }
}