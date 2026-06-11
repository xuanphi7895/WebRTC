using CrawlerWorker;
using System.IO;
using System.Threading.Tasks;

public class CrawlerLogger : ICrawlerLogger
{
    private readonly string _logFolder;
    private readonly SemaphoreSlim _lock = new(1, 1);

    public CrawlerLogger()
    {
        _logFolder = Path.Combine(
            AppContext.BaseDirectory,
            "logs");

        Directory.CreateDirectory(_logFolder);
    }

    public async Task InfoAsync(string message)
    {
        await WriteAsync("INFO", message);
    }

    public async Task ErrorAsync(
        string message,
        Exception? ex = null)
    {
        await WriteAsync(
            "ERROR",
            $"{message}\n{ex}");
    }

    private async Task WriteAsync(
        string level,
        string message)
    {
        var file = Path.Combine(
            _logFolder,
            $"crawler-{DateTime.UtcNow:yyyyMMdd}.log");

        var line =
            $"[{DateTime.UtcNow:yyyy-MM-dd HH:mm:ss}] [{level}] {message}\n";

        await _lock.WaitAsync();

        try
        {
            await File.AppendAllTextAsync(
                file,
                line);
        }
        finally
        {
            _lock.Release();
        }
    }

    public async Task SaveHtmlAsync(
        string url,
        string html)
    {
        var folder = Path.Combine(
            AppContext.BaseDirectory,
            "html");

        Directory.CreateDirectory(folder);

        var fileName =
            $"{DateTime.UtcNow:yyyyMMddHHmmssfff}.html";

        var path =
            Path.Combine(folder, fileName);

        await File.WriteAllTextAsync(path, html);

        await InfoAsync(
            $"Saved HTML: {url} => {path}");
    }
}