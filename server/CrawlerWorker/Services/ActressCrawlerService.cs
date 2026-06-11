namespace CrawlerWorker;

public class ActressCrawlerService
{
    private readonly FetchService _fetch;
    private readonly ParseService _parser;
    private readonly ActressRepository _repo;
    private readonly ICrawlerLogger _logger;

    public ActressCrawlerService(
        FetchService fetch,
        ParseService parser,
        ActressRepository repo,
        ICrawlerLogger logger)
    {
        _fetch = fetch;
        _parser = parser;
        _repo = repo;
         _logger = logger;
    }

    public async Task CrawlAsync()
    {
        await _logger.InfoAsync(
            "Start crawl");

        var html =
            await _fetch.GetHtmlAsync(
                "https://sextb.net/actress/alice-kisaki");

        await _logger.SaveHtmlAsync(
            "F:\\File\\html",
            html);

        var actresses =
            _parser.ParseActresses(html);

        foreach (var actress in actresses)
        {
            Console.WriteLine(actress.Name, actress.ProfileUrl);
            // Console.WriteLine(actress.ProfileUrl);
            // Console.WriteLine(actress.ThumbnailUrl);
            await _repo.SaveAsync(actress);
        }
    }
}