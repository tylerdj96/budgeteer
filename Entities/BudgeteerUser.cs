using System;

public class BudgeteerUser
{
    public Guid Id { get; set; }
    public string OktaEmail { get; set; }
    public Account Account { get; set; }
}