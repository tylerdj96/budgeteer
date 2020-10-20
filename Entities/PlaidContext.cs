using Microsoft.EntityFrameworkCore;

public class PlaidContext : DbContext
{
    public PlaidContext(DbContextOptions<PlaidContext> options)
        : base(options)
    { }
    public DbSet<Account> Accounts { get; set; }
    public DbSet<BudgeteerUser> BudgeteerUsers { get; set; }
}
