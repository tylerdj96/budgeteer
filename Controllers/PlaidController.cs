using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace budgeteer.Controllers
{
    [ApiController]
    [Route("api/v1")]
    public class PlaidController : ControllerBase
    {
        public IPlaidService _plaidService { get; set; }
        public PlaidController(IPlaidService plaidService)
        {
            _plaidService = plaidService;
        }

        [HttpPost]
        [Route("link")]
        public async Task<ActionResult<LinkResponse>> GetLinkToken([FromBody] TokenCreateDto body)
        {
            var linkResponse = await _plaidService.GetLinkToken(body);
            return Ok(linkResponse);
        }

        [HttpPost]
        [Route("token")]
        public async Task<ActionResult<TokenResponse>> ExchangePublicToken([FromBody] string publicToken)
        {
            var tokenResponse = await _plaidService.ExchangePublicToken(publicToken);
            return Ok(tokenResponse);
        }
    }
}
