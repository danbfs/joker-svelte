import type { Joke } from "src/types/Joke";

export const jokeParser = (jokeData: Joke) => {
	if (!jokeData) return;
	if (jokeData.type === "twopart") {
		return `${jokeData.setup} - ${jokeData.delivery}`
	}
	if (jokeData.type === "single") {
		return jokeData.joke
	}

  return 'Invalid joke'
};
