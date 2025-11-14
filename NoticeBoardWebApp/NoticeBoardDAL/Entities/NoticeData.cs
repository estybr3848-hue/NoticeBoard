using NoticeBoardDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoticeBoardDAL.Entities
{
    public class NoticeData
    {
        public List<Notice>? Notices { get; set; }
        public List<Advertiser>? Advertisers { get; set; }
        public List<NoticeType>? NoticeTypes { get; set; }
    }
}
