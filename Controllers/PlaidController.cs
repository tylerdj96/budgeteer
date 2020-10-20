using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace budgeteer.Controllers
{
    [ApiController]
    [Route("api/v1")]
    [Authorize]
    [EnableCors("AllowAll")]
    public class PlaidController : ControllerBase
    {
        public IPlaidService _plaidService { get; set; }
        public PlaidController(IPlaidService plaidService)
        {
            _plaidService = plaidService;
        }

        [HttpGet]
        [Route("transactions")]
        public async Task<JsonResult> GetTransactions([FromQuery] DateTime startDate, [FromQuery] DateTime endDate)
        {
            var transactions = await _plaidService.FetchTransactions(startDate, endDate);
            return new JsonResult(transactions);
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
        public async Task<ActionResult<string>> ExchangePublicToken([FromBody] string publicToken)
        {
            var token = await _plaidService.ExchangePublicToken(publicToken);
            return Ok(token);
        }
    }
}
