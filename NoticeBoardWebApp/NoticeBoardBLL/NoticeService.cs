using NoticeBoardDAL.Data;
using NoticeBoardDAL.Entities;
using NoticeBoardDAL.Models;

namespace NoticeBoardBLL
{
    public class NoticeService
    {
        private readonly JsonLoader _jsonLoader;

        public NoticeService(JsonLoader jsonLoader)
        {
            _jsonLoader = jsonLoader;
        }

        public NoticeData GetAllNoticeData()
        {
            var data = _jsonLoader.Load();
            data.Notices = AllNoticesObj(data);
            return data;
        }
        public Notice GetNoticeById(int id)
        {
            var data = _jsonLoader.Load();
            var noticeById = AllNoticesObj(data)
                .FirstOrDefault(notice => notice.Id == id) ?? new Notice();

            return noticeById;
        }

        public void AddNotice(Notice notice)
        {
            var data = _jsonLoader.Load();

            var type = data.NoticeTypes?.FirstOrDefault(t => t.Id == notice.TypeId);
            if (type == null)
                throw new Exception($"Invalid TypeId: {notice.TypeId}");

            notice.Type = type;

            data.Notices ??= new List<Notice>();

            data.Notices.Add(notice);

            _jsonLoader.Save(data);
        }

        public bool UpdateNotice(Notice notice)
        {
            var data = _jsonLoader.Load();
            if (data == null)
                return false;

            var existing = data.Notices?.FirstOrDefault(n => n.Id == notice.Id);
            if (existing == null)
                return false;

            existing.NoticeName = notice.NoticeName ?? existing.NoticeName;
            existing.NoticeTitle = notice.NoticeTitle ?? existing.NoticeTitle;
            existing.NoticeContent = notice.NoticeContent ?? existing.NoticeContent;
            existing.Area = notice.Area ?? existing.Area;
            existing.Type = notice.Type ?? existing.Type;
            existing.Advertiser = notice.Advertiser ?? existing.Advertiser;

            _jsonLoader.Save(data);
            return true;
        }

        public bool DeleteNotice(int id)
        {
            var data = _jsonLoader.Load();
            if (data?.Notices == null)
                return false;

            var notice = data.Notices?.FirstOrDefault(n => n.Id == id);
            if (notice == null)
                return false;

            data.Notices?.Remove(notice);
            _jsonLoader.Save(data);
            return true;
        }

        private List<Notice> AllNoticesObj(NoticeData data)
        {
            var advertisers = data?.Advertisers;
            var noticeTypes = data?.NoticeTypes;
            var notices = _jsonLoader.Load().Notices?.Select(n =>
            {
                n.Advertiser = advertisers?.FirstOrDefault(a => a.Id == n.AdvertiserId);
                n.Type = noticeTypes?.FirstOrDefault(t => t.Id == n.TypeId);
                return n;
            }).ToList();

            return notices ?? new List<Notice>();
        }
    }
}
