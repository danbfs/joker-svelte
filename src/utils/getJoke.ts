import axios from "axios";

export const getJoke = async () => {
  const baseUrl =
    "https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";

  const joke = await axios.get(baseUrl);

  return joke.data;
};
