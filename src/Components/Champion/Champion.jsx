import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { keyframes } from "styled-components";
import { useQuery } from "react-query";
import { fetchChampionName } from "./api";
const Container = styled.div`
  border-radius: 8px;
  max-width: 540px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;

const ChampionContainer = styled.div`
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  margin: 20px 15px;
  position: relative;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      transparent,
      ${(props) => props.color},
      ${(props) => props.color}
    );
    transform-origin: bottom right;
    animation: animate 5s linear infinite;
  }
  &::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      0deg,
      transparent,
      ${(props) => props.color},
      ${(props) => props.color}
    );
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
  }
  @keyframes animate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const ChampionUl = styled.ul`
  border-radius: 8px;
  position: relative;
  inset: 1px;
  z-index: 1;
  width: 100%;
  background-color: #57606f;
  list-style: none;
  color: white;
  display: flex;
  flex-direction: column;
`;

const ChampionList = styled.li`
  border-bottom: 2px solid #2f3542;
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  display: inline-block;
  width: 32px;
  height: 32px;
  margin-right: 10px;
`;

const Button = styled.button`
  width: 33%;
  padding: 7px 0px;
  margin-top: 0.3em;
  background-color: rgba(0, 0, 0, 0);
  color: #dfe4ea;
  border-radius: 15px;
  font-size: 30px;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: ${(props) => props.color};
    background-color: #2d3436;
    color: ${(props) => props.color};
    cursor: pointer;
  }
`;

const ResetButton = styled.button`
  padding: 7px 14px;
  margin-top: 0.3em;
  background-color: rgba(0, 0, 0, 0);
  color: #ffa502;
  border-color: #ffa502;
  font-size: 32px;
  transition: all 0.3s ease-in-out;
  &:hover {
    border-color: #00b894;
    background-color: #2d3436;
    color: #00b894;
    cursor: pointer;
  }
`;

const ButtonContainer = styled.div`
  max-width: 480px;
  position: relative;
  margin: 0 auto;
  padding: 0px 15px;
  display: flex;
  justify-content: space-between;
  z-index: 10;
`;
export default function Champion() {
  const [count, setCount] = useState(0);
  const [championsDictionary, setChampionsDictionary] = useState({});

  // const { data: champion, refetch } = useQuery(
  //   "allChampions",
  //   fetchChampionName,
  //   {
  //     onSuccess: (data) => {
  //       // 성공시 호출
  //       for (const key in data.data) {
  //         champions.push([
  //           data.data[key].name,
  //           `http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${[
  //             key,
  //           ]}.png`,
  //         ]);
  //       }
  //       console.log(champions);
  //       shuffle(champions);
  //     },
  //     onError: (e) => {
  //       // 실패시 호출 (401, 404 같은 error가 아니라 정말 api 호출이 실패한 경우만 호출됩니다.)
  //       // 강제로 에러 발생시키려면 api단에서 throw Error 날립니다. (참조: https://react-query.tanstack.com/guides/query-functions#usage-with-fetch-and-other-clients-that-do-not-throw-by-default)
  //       console.log(e.message);
  //     },
  //   }
  // );

  useEffect(() => {
    (async () => {
      const rs = await fetch(
        "https://ddragon.leagueoflegends.com/cdn/12.22.1/data/ko_KR/champion.json"
      );
      const json = await rs.json();
      setChampionsDictionary(json.data);
    })();
  }, []);

  function shuffleKeys(obj) {
    const keys = Object.keys(obj);
    keys.sort(function (a, b) {
      return Math.random() - 0.5;
    });
    return keys;
  }

  function copyClipBoard(array) {
    return window.navigator.clipboard.writeText(
      array.map((champion) => championsDictionary[champion].name)
    );
  }
  const champions = shuffleKeys(championsDictionary);

  return (
    <>
      <Container>
        <ChampionContainer color={"#ff4757"}>
          <ChampionUl>
            {champions.slice(0, 15).map((champion, index) => {
              return (
                <ChampionList key={index} color={"#ff4757"}>
                  <Img
                    src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${championsDictionary[champion].image.full}`}
                  ></Img>
                  {championsDictionary[champion].name}
                </ChampionList>
              );
            })}
          </ChampionUl>
        </ChampionContainer>
        <ResetButton
          onClick={() => {
            setCount(count + 1);
          }}
        >
          리셋 ({count})
        </ResetButton>
        <ChampionContainer color={"#45f3ff"}>
          <ChampionUl>
            {champions.slice(16, 31).map((champion, index) => {
              return (
                <ChampionList key={index} color={"#00b894"}>
                  <Img
                    src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/champion/${championsDictionary[champion].image.full}`}
                  ></Img>
                  {championsDictionary[champion].name}
                </ChampionList>
              );
            })}
          </ChampionUl>
        </ChampionContainer>
      </Container>
      <ButtonContainer>
        <Button
          color={"#ff4757"}
          onClick={() => {
            copyClipBoard(champions.slice(0, 15));
          }}
        >
          복사
        </Button>
        <Button
          color={"#45f3ff"}
          onClick={() => {
            copyClipBoard(champions.slice(16, 31));
          }}
        >
          복사
        </Button>
      </ButtonContainer>
    </>
  );
}
