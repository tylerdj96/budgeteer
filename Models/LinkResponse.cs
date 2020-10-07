using Newtonsoft.Json;

public class LinkResponse
{
    [JsonProperty("link_token")]
    public string LinkToken { get; set; }

    [JsonProperty("expiration")]
    public string Expiration { get; set; }

    [JsonProperty("request_id")]
    public string RequestId { get; set; }
}