using Microsoft.Extensions.Options;
using NoticeBoardDAL.Entities;
using NoticeBoardDAL.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace NoticeBoardDAL.Data
{
    public class JsonLoader
    {
        private readonly string _jsonFilePath;

        public JsonLoader(IOptions<JsonLoaderOptions> options)
        {
            _jsonFilePath = options.Value.JsonPath;
        }

        public NoticeData Load()
        {
            if (!File.Exists(_jsonFilePath))
                return new NoticeData();

            var json = File.ReadAllText(_jsonFilePath);
            var data = JsonSerializer.Deserialize<NoticeData>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return data ?? new NoticeData();
        }

        public void Save(NoticeData data)
        {
            var json = JsonSerializer.Serialize(data, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(_jsonFilePath, json);
        }
    }
}
