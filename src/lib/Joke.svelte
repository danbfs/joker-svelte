<script lang="ts">
import type { Joke } from "src/types/Joke";

import { getJoke } from "../utils/getJoke";
import JokeCard from "./JokeCard.svelte";

  let joke: Joke
  let fetching = false

  const fetchNewJoke = async () => {
    fetching = true
    const newJoke = await getJoke()
    joke = newJoke
    fetching = false
  }

  if (!joke) fetchNewJoke()

</script>

<JokeCard {joke} />

<button on:click={fetchNewJoke}>
  {fetching ? 'Fetching...' : 'Get new joke'} 
</button>

<style>
  button {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    background-color: rgba(255, 62, 0, 0.1);
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0);
    outline: none;
    width: 200px;
    font-variant-numeric: tabular-nums;
    cursor: pointer;
  }

  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
