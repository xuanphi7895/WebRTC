using HtmlAgilityPack;
namespace CrawlerWorker;

public class ParseService
{
    public List<Actress> ParseActresses(string html)
    {
        Console.WriteLine("ParseActresses");
        var doc = new HtmlDocument();
        doc.LoadHtml(html);

        var result = new List<Actress>();

        var links = doc.DocumentNode
            .SelectNodes("//a");

        if (links == null)
            return result;

        foreach (var link in links)
        {
            var href = link.GetAttributeValue("href", "");

            if (!href.Contains("/actress/"))
                continue;

            result.Add(new Actress
            {
                Name = link.InnerText.Trim(),
                ProfileUrl = href
            });
        }
        
        return result;
    }
}