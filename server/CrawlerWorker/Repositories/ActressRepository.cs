using Dapper;
using MySqlConnector;
namespace CrawlerWorker;
public class ActressRepository
{
    private readonly string _connectionString;

    public ActressRepository(IConfiguration config)
    {
        _connectionString =
            config.GetConnectionString("Default")!;
    }

    public async Task SaveAsync(Actress actress)
    {
        await using var conn =
            new MySqlConnection(_connectionString);

        await conn.ExecuteAsync(
            @"INSERT IGNORE INTO actresses
              (name, profile_url, thumbnail_url)
              VALUES
              (@Name, @ProfileUrl, @ThumbnailUrl)",
            actress);
    }
}