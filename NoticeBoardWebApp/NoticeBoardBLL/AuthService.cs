using NoticeBoardDAL.Data;
using NoticeBoardDAL.Dtos;
using NoticeBoardDAL.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NoticeBoardBLL
{
    public class AuthService
    {
        private readonly JsonLoader _jsonLoader;

        public AuthService(JsonLoader jsonLoader)
        {
            _jsonLoader = jsonLoader;
        }

        public Advertiser? AuthUser(UserAuthDto userAuthDetails)
        {
            var currentAdvertiser = _jsonLoader.Load()?.Advertisers?
                .FirstOrDefault(adv => adv.UserName == userAuthDetails.UserName && adv.Password == userAuthDetails.Password);

            return currentAdvertiser;
        }
    }
}
