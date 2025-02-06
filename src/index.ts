import httpClient from "./httpClient";
import {
  ArticleInfo,
  EpisodeList,
  ImageContentsArray,
  SearchWebtoonResult,
  ArticleList,
} from "./types";

export default class NaverWebtoon {
  private client: httpClient;
  private requestOptions: RequestInit = {};

  constructor(requestOptions?: RequestInit) {
    if (requestOptions) this.requestOptions = requestOptions;
    this.requestOptions.headers = {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/132.0.0.0 Safari/537.36",
    };
    this.client = new httpClient(this.requestOptions);
  }

  /**
   * 웹툰 이미지 콘텐츠를 가져옵니다.
   * @param titleId 불러올 작품 ID
   * @param episodeId 불러올 에피소드 ID
   * @returns {Promise<ImageContentsArray | null>}
   */
  public async getContent(
    titleId: string,
    episodeId: number
  ): Promise<ImageContentsArray[] | null> {
    const URL = `https://comic.naver.com/webtoon/detail?titleId=${titleId}&no=${episodeId}&week=fri`;
    const Request = await this.client.get(URL);
    const Response = await Request.text();
    const Contents = await this.parseContents(Response);

    return Contents;
  }

  /**
   * 웹툰을 검색합니다.
   * @param query 검색할 웹툰 제목
   * @returns {Promise<SearchWebtoonResult | null>}
   */
  public async search(query: string): Promise<SearchWebtoonResult | null> {
    const URL = `https://comic.naver.com/api/search/all?keyword=${encodeURIComponent(
      query
    )}`;
    const Request = await this.client.get(URL);
    const Response = await Request.json();

    return Response.searchWebtoonResult;
  }

  /**
   * 웹툰정보를 불러옵니다.
   * @param titleId 불러올 작품 ID
   * @returns {Promise<ArticleInfo | null>}
   */
  public async getArticleInfo(titleId: string): Promise<ArticleInfo | null> {
    const URL = `https://comic.naver.com/api/article/list/info?titleId=${titleId}`;
    const Request = await this.client.get(URL);
    const Response = await Request.json();

    return Response;
  }

  async getEpisodeList(titleId: string) {
    const URL = `https://comic.naver.com/api/article/list?titleId=${titleId}&page=1`;
    const Request = await this.client.get(URL);
    const Response: EpisodeList = await Request.json();

    let totalPages = Response.pageInfo.totalPages;
    let episodeList: ArticleList[] = [];

    // 미리보기 웹툰 episodeList에 추가
    episodeList.push(...Response.articleList);

    // 나머지 페이지 불러오기
    for (let i = 2; i <= totalPages; i++) {
      const URL = `https://comic.naver.com/api/article/list?titleId=${titleId}&page=${i}&sort=DESC`;
      const Request = await this.client.get(URL);
      const Response: EpisodeList = await Request.json();
      episodeList.push(...Response.articleList);
    }

    return episodeList;
  }

  // 웹툰 이미지콘텐츠 파싱
  private async parseContents(
    contents: string
  ): Promise<ImageContentsArray[] | null> {
    // 콘텐츠 이미지 정규식
    const regExp =
      /https:\/\/image-comic.pstatic.net\/webtoon\/\d+\/\d+\/\d+_\w+_\d+\.jpg/g;
    const result = contents.match(regExp);

    return result;
  }
}
