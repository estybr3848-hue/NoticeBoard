namespace NoticeBoardDAL.Models
{
    public class Notice
    {
        public int Id {  get; set; }
        public int AdvertiserId { get; set; }
        public Advertiser? Advertiser { get; set; }
        public string? NoticeName { get; set; }
        public string? NoticeTitle { get; set; }
        public string? NoticeContent { get; set; }
        public string? Area { get; set; }
        public int TypeId { get; set; }
        public NoticeType? Type { get; set; }

    }
}
