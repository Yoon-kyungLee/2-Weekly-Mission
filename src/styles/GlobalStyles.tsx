import reset from "./reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

${reset}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  text-decoration: none;
}

html {
  font-family: Pretendard, Arial, sans-serif;
  font-size: 62.5%;
  background-color: var(--white-color);

  --primary-color: #6d6afe;
  --red-color: #ff5b56;
  --black-color: #111322;
  --white-color: #ffffff;
  --gray-100-color: #3e3e43;
  --gray-80-color: #444;
  --gray-60-color: #9fa6b2;
  --gray-20-color: #ccd5e3;
  --gray-10-color: #e7effb;
  --gray-bg-color: #f0f6ff;
  --gradient-purple-orange: linear-gradient(
    91deg,
    #6d6afe 17.28%,
    #ff9f9f 74.98%
  );
  --gradient-orange-skyblue: linear-gradient(
    96deg,
    #fe8a8a 1.72%,
    #a4ceff 74.97%
  );
  --gradient-skyblue-yellow: linear-gradient(
    277deg,
    #6fbaff 59.22%,
    #ffd88b 93.66%
  );
  --gradient-purple-gray: linear-gradient(
    99deg,
    #6d7ccd 19.76%,
    rgba(82, 136, 133, 0.22) 52.69%
  );
  --gradient-red-blue: linear-gradient(271deg, #fe578f -9.84%, #68e8f9 107.18%);
  --gradient-purpleblue-skyblue: linear-gradient(
    91deg,
    #6d6afe 0.12%,
    #6ae3fe 101.84%
  );
}
br {
  display: block;
}

button {
  border-style: none;
  background-color: transparent;
  cursor: pointer;
}
`;

export default GlobalStyles;