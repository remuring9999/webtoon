// 웹툰 이미지 링크 배열타입
export interface ImageContentsArray {
  [index: number]: string;
}

// 작품참여 작가 정보
interface CommunityArtists {
  artistId: number;
  name: string;
  artistTypeList: ["ARTIST_WRITER", "ARTIST_PAINTER"];
  profileBadge: "WEBTOON";
  profileImageUrl: string;
  profilePageUrl: string;
}

// 장르 정보
interface GenreList {
  description: string;
  type: string;
}

// 연재 요일 (한글화)
type PublishDescriptionLocalized =
  | "월요웹툰"
  | "화요웹툰"
  | "수요웹툰"
  | "목요웹툰"
  | "금요웹툰"
  | "토요웹툰"
  | "일요웹툰";

// 해쉬태그 정보
interface TagList {
  id: number;
  tagName: string;
  urlPath: string;
  curationType: string;
}

// 베스트도전, 소설 제외한 웹툰 검색결과 타입
export interface SearchWebtoonResult {
  totalCount: number; // 검색 결과 총 개수
  searchViewList: [
    {
      titleId: number; // 작품 ID
      titleName: string; // 작품명
      webtoonLevelCode: string;
      thumbnailUrl: string; // 썸네일 URL
      displayAuthor: string; // 작가
      communityArtists: [CommunityArtists]; // 참여 작가
      synopsis: string; // 작품 설명
      finished: boolean; // 완결 여부
      adult: boolean; // 청소년 이용불가 여부
      nineteen: boolean; // unknown
      bm: boolean; // 24시간마다 무료로 볼 수 있는 작품 여부
      up: boolean; // 새로운 에피소드 업데이트 여부
      rest: boolean; // 휴재 여부
      greatestContest: false; // 지상최대공모전 참여작품
      greatestWinning: false; // 지상최대공모전 수상작품
      webtoonLevelUp: false; // 베스트도전 레벨업 작품
      bestChallengeLevelUp: false; // 베스트도전 레벨업 작품
      potenUp: false; // 포텐업 작품
      publishDescription: [PublishDescriptionLocalized]; // 연재 요일 (한글화)
      articleTotalCount: number; // 전체 에피소드 수
      lastArticleServiceDate: string; // 최종 업데이트 날짜
      tagList: [TagList]; // 해쉬태그
      genreList: [GenreList]; // 장르
      new: boolean; // 신규작품 여부
    }
  ];
}

//작품정보
export interface ArticleInfo {
  titleId: number; // 작품 ID
  titleName: string; // 작품명
  age: {
    description: string;
    type: string;
  }; // 이용가능연령
  communityArtists: [CommunityArtists]; // 참여 작가
  contentsNo: number; // unknown
  curationTagList: [TagList]; // 해쉬태그
  favoriteCount: number; // 관심수
  finished: boolean; // 완결 여부
  firstArticle: {
    charge: boolean; // 유료 여부
    no: number; // 에피소드 번호
    subtitle: string; // 에피소드 제목
  };
  new: boolean; // 신규작품 여부
  thumbnailUrl: string; // 썸네일 URL
  publishDayOfWeekList: []; // 연재 요일
  publishDescription: [PublishDescriptionLocalized]; // 연재 요일 (한글화)
  rest: boolean; // 휴재 여부
  synopsis: string; // 작품 설명
}

export interface EpisodeList {
  titleId: number; // 작품 ID
  totalCount: number; // 전체 에피소드 수
  finished: boolean; // 완결 여부
  articleList: ArticleList[]; // 에피소드 리스트
  chargeFolderArticleList: ArticleList[]; // 유료 에피소드 리스트
  pageInfo: ArticlePageInfo; // 페이지 정보
}

export interface ArticleList {
  bgm: boolean; // 배경음악 여부
  charge: boolean; // 유료 여부
  no: number; // 에피소드 번호
  serviceDateDescription: string; // 업로드 날짜
  starScore: number; // 별점
  subtitle: string; // 에피소드 제목
  thumbnailUrl: string; // 썸네일 URL
  up: boolean; // 새로운 에피소드 업데이트 여부
}

// 에피소드 리스트 페이지 정보
interface ArticlePageInfo {
  totalRows: number; // 전체 에피소드 수
  totalPages: number; // 전체 페이지 수
}
