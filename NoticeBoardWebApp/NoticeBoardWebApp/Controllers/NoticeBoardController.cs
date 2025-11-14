using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NoticeBoardBLL;
using NoticeBoardDAL.Entities;
using NoticeBoardDAL.Models;

namespace NoticeBoardWebApp.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class NoticeBoardController : ControllerBase
    {

        private readonly NoticeService _noticeService;

        public NoticeBoardController(NoticeService noticeService)
        {
            _noticeService = noticeService;
        }

        [HttpGet]
        public ActionResult<NoticeData> GetAllNoticeData()
        {
            var allNotices = _noticeService.GetAllNoticeData();
            if (allNotices == null)
                return NoContent();

            return Ok(allNotices);
        }

        [HttpGet("{id}")]
        public ActionResult<Notice> GetNoticeById(int id)
        {
            var Notice = _noticeService.GetNoticeById(id);
            if (Notice == null)
                return NotFound($"Notice with id {id} not found");

            return Ok(Notice);
        }

        [HttpPost]
        public IActionResult AddNotice([FromBody] Notice notice)
        {
            if (notice == null)
                return BadRequest("Notice is null");

            _noticeService.AddNotice(notice);
            return CreatedAtAction(nameof(GetNoticeById), new { id = notice.Id }, notice);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateNotice(int id,[FromBody] Notice notice)
        {
            if (notice == null || id != notice.Id)
                return BadRequest("Invalid data");

            var updated = _noticeService.UpdateNotice(notice);
            if (!updated)
                return NotFound($"Notice with id {id} not found");

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteNotice(int id)
        {
            var deleted = _noticeService.DeleteNotice(id);
            if (!deleted)
                return NotFound($"Notice with id {id} not found");

            return NoContent();
        }


    }
}
