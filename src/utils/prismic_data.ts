import { PrismicDocument } from "@prismicio/client"

export type Content = {
  title: string;
  titleContent: string;
  linkAction: string;
  mobileTitle: string;
  mobileContent: string;
  mobileBanner: string;
  webTitle: string;
  webContent: string;
  webBanner: string;
}

export default function dataPrismic(document: PrismicDocument): Content {
  const content: Content = {} as Content
  if (document) {
    const {
      link_action,
      mobile, mobile_banner,
      mobile_content, sub_title,
      title, title_web, web_banner,
      web_content
    } = document.data

    content.title = title[0].text
    content.linkAction = link_action
    content.mobileContent = mobile_content
    content.mobileBanner = mobile_banner
    content.mobileTitle = mobile
    content.webTitle = title_web
    content.webContent = web_content
    content.titleContent = sub_title
    content.webBanner = web_banner
  }
  return content
}