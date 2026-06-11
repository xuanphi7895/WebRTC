public interface ICrawlerLogger
{
    Task InfoAsync(string message);
    Task ErrorAsync(string message, Exception? ex = null);
    Task SaveHtmlAsync(string url, string html);
}