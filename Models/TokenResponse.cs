using Newtonsoft.Json;

public class TokenResponse
{
    [JsonProperty("link_token")]
    public string AccessToken { get; set; }
    [JsonProperty("item_id")]
    public string ItemId { get; set; }
    [JsonProperty("request_id")]
    public string RequestId { get; set; }
}