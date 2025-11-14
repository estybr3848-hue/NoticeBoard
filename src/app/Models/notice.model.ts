import { Advertiser } from "./advertiser.model";
import { NoticeType } from "./notice-type.model";

export class Notice {
  id!: number;
  noticeName!: string;
  noticeTitle!: string;
  noticeContent!: string;
  area!: string;
  typeId!: number;
  type!: NoticeType;
  advertiserId!: number;
  advertiser!: Advertiser;
}