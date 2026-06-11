namespace CrawlerWorker;

public class CrawlWorker : BackgroundService
{
    private readonly IServiceProvider _services;
    private readonly ILogger<CrawlWorker> _logger;

    public CrawlWorker(
        IServiceProvider services,
        ILogger<CrawlWorker> logger)
    {
        _services = services;
        _logger = logger;
    }

    protected override async Task ExecuteAsync(
        CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope =
                    _services.CreateScope();

                var crawler =
                    scope.ServiceProvider
                         .GetRequiredService<
                             ActressCrawlerService>();

                await crawler.CrawlAsync();

                _logger.LogInformation(
                    "Crawl completed");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,
                    "Crawler error");
            }

            await Task.Delay(
                TimeSpan.FromHours(6),
                stoppingToken);
        }
    }
}