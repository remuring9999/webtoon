import NaverWebtoon from "./index";
import fs from "fs";
import readline from "readline";

const client = new NaverWebtoon();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let titleId = "";

rl.question("검색할 웹툰 제목을 입력해주세요: ", async (query) => {
  const SearchResults = await client.search(query);
  console.log(SearchResults?.searchViewList.map((v) => v.titleName));
  // 1또는 2 선택
  rl.question("검색할 웹툰의 번호를 입력해주세요: ", async (index: any) => {
    titleId = SearchResults?.searchViewList[index - 1].titleId.toString() || "";
    const ArticleInfo = await client.getArticleInfo(titleId);
    console.log(`작품명: ${ArticleInfo?.titleName}`);
    console.log(`작가: ${ArticleInfo?.communityArtists[0].name}`);
    console.log(
      `태그 목록: ${ArticleInfo?.curationTagList.map((v) => v.tagName)}`
    );
    console.log(`이용 연령: ${ArticleInfo?.age.description}`);
    console.log(`연재요일: ${ArticleInfo?.publishDescription}`);
    console.log(`설명: ${ArticleInfo?.synopsis}\n\n\n`);

    const EpisodeList = await client.getEpisodeList(titleId);
    EpisodeList.forEach((v) => {
      console.log(`${v.subtitle}`);
    });

    rl.question(
      "다운로드할 에피소드 번호를 입력해주세요: ",
      async (index: any) => {
        const Episode = await client.getContent(titleId, index);
        //html 파일로 저장
        if (!Episode) return;

        const currentEpisode = EpisodeList.find((v) => v.no == index);
        if (!currentEpisode) return;

        const html = Episode.map((v) => `<img src="${v}"><br>`).join("\n");
        fs.writeFileSync(`${currentEpisode.subtitle}.html`, html);
        console.log("완료되었습니다.");

        rl.close();
      }
    );
  });
});
