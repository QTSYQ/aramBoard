export async function fetchChampionName() {
  return await fetch(
    `https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/champion.json`
  ).then((response) => response.json());
}
