namespace CrawlerWorker;
public class FetchService
{
    private readonly HttpClient _httpClient;

    public FetchService(HttpClient httpClient)
    {
        _httpClient = httpClient;
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(
            "Mozilla/5.0");
    }

    public async Task<string> GetHtmlAsync(string url)
    {
        return await _httpClient.GetStringAsync(url);
    }
}