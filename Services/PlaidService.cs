using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

public interface IPlaidService
{
    public Task<LinkResponse> GetLinkToken(TokenCreateDto body);
    public Task<TokenResponse> ExchangePublicToken(string publicToken);
}

public class PlaidService : IPlaidService
{
    private readonly HttpClient _client;
    public PlaidSettings _plaidSettings;

    public PlaidService(HttpClient client, IOptions<PlaidSettings> plaidSettings)
    {
        client.BaseAddress = new Uri(plaidSettings.Value.BaseUrl);
        _client = client;
        _plaidSettings = plaidSettings.Value;
    }

    public async Task<LinkResponse> GetLinkToken(TokenCreateDto body)
    {
        body.ClientId = _plaidSettings.ClientId;
        body.ClientSecret = _plaidSettings.ClientSecret;
        var jsonBod = JsonConvert.SerializeObject(body);
        var requestBody = new StringContent(
        jsonBod,
        Encoding.UTF8,
        "application/json");

        var response = await _client.PostAsync("/link/token/create", requestBody);

        var responseStream = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<LinkResponse>(responseStream);
    }

    public async Task<TokenResponse> ExchangePublicToken(string publicToken)
    {
        var body = new Dictionary<string, string>();
        body["client_id"] = _plaidSettings.ClientId;
        body["secret"] = _plaidSettings.ClientSecret;
        body["public_token"] = publicToken;
        var jsonBod = JsonConvert.SerializeObject(body);
        var requestBody = new StringContent(
            jsonBod,
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync("/item/public_token/exchange", requestBody);
        var responseStream = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<TokenResponse>(responseStream);
    }
}