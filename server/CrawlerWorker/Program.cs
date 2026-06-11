using CrawlerWorker;
using MySqlConnector;
using Microsoft.EntityFrameworkCore;

var builder = Host.CreateApplicationBuilder(args);

builder.Services.AddScoped<MySqlConnection>(_ =>
    new MySqlConnection(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddHostedService<Worker>();

builder.Services.AddHttpClient();

builder.Services.AddSingleton<FetchService>();
builder.Services.AddSingleton<ParseService>();
builder.Services.AddSingleton<ICrawlerLogger, CrawlerLogger>();

builder.Services.AddScoped<ActressRepository>();
builder.Services.AddScoped<ActressCrawlerService>();

builder.Services.AddHostedService<CrawlWorker>();

var host = builder.Build();
host.Run();
