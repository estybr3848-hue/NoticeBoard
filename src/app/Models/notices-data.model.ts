import { Advertiser } from "./advertiser.model";
import { NoticeType } from "./notice-type.model";
import { Notice } from "./notice.model";

export class noticesData {
    notices!: Notice[];
    advertisers!: Advertiser[];
    noticeTypes!: NoticeType[];
}