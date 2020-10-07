using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

public interface IPlaidService
{
    public Task<LinkResponse> GetLinkToken(TokenCreateDto body);
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
        var jsonBod = JsonConvert.SerializeObject(body);
        var requestBody = new StringContent(
        jsonBod,
        Encoding.UTF8,
        "application/json");

        var response = await _client.PostAsync("/link/token/create", requestBody);

        var responseStream = await response.Content.ReadAsStringAsync();
        return JsonConvert.DeserializeObject<LinkResponse>(responseStream);
    }
}