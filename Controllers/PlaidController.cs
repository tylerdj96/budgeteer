using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace budgeteer.Controllers
{
    [ApiController]
    [Route("/api/v1/link")]
    public class PlaidController : ControllerBase
    {
        public IPlaidService _plaidService { get; set; }
        public PlaidController(IPlaidService plaidService)
        {
            _plaidService = plaidService;
        }

        [HttpPost]
        public async Task<IActionResult> GetLinkToken([FromBody] TokenCreateDto body)
        {
            var linkResponse = await _plaidService.GetLinkToken(body);
            return Ok(linkResponse);
        }
    }
}
