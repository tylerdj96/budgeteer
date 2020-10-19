using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

public interface IPlaidService
{
    public Task<LinkResponse> GetLinkToken(TokenCreateDto body);
    public Task<string> ExchangePublicToken(string publicToken);
    public Task SaveAccessToken(TokenResponse response);
    public Task<object> FetchTransactions(DateTime startTime, DateTime endTime);

}

public class PlaidService : IPlaidService
{
    private readonly HttpClient _client;
    private readonly PlaidContext _context;
    public PlaidSettings _plaidSettings;

    public PlaidService(HttpClient client, PlaidContext context, IOptions<PlaidSettings> plaidSettings)
    {
        client.BaseAddress = new Uri(plaidSettings.Value.BaseUrl);
        _plaidSettings = plaidSettings.Value;
        _client = client;
        _context = context;
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

    public async Task<string> ExchangePublicToken(string publicToken)
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
        var tokenResponse = JsonConvert.DeserializeObject<TokenResponse>(responseStream);
        await SaveAccessToken(tokenResponse);
        return tokenResponse.AccessToken;
    }

    public async Task SaveAccessToken(TokenResponse response)
    {
        _context.Add(new Account
        {
            Id = Guid.NewGuid(),
            AccessToken = response.AccessToken,
            ItemId = response.ItemId,
            RequestId = response.RequestId
        });
        await _context.SaveChangesAsync();
    }

    public async Task<object> FetchTransactions(DateTime startTime, DateTime endTime)
    {
        var account = _context.Accounts.Where(acc => acc.Id == Guid.Parse("FFA80A49-0976-482D-A1C5-8DF38BD83576")).FirstOrDefault();
        var body = new Dictionary<string, object>();
        body["client_id"] = _plaidSettings.ClientId;
        body["secret"] = _plaidSettings.ClientSecret;
        body["access_token"] = account.AccessToken;
        body["start_date"] = startTime.ToString("yyyy-MM-dd");
        body["end_date"] = endTime.ToString("yyyy-MM-dd");
        // var options = new { count = "250", offset = "200" };
        // body["options"] = options;


        var jsonBod = JsonConvert.SerializeObject(body);
        var requestBody = new StringContent(
            jsonBod,
            Encoding.UTF8,
            "application/json");

        var response = await _client.PostAsync("/transactions/get", requestBody);
        var responseStream = await response.Content.ReadAsStringAsync();
        var test = JObject.Parse(responseStream);
        return test;
        // var test2 = test.Values();
        // return test2;
    }
}