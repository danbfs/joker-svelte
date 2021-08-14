<script lang="ts">
  import type { JokeProps } from "src/types/Joke";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faThumbsDown as SolidDislike,
    faThumbsUp as SolidLike,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faThumbsDown as RegularDislike,
    faThumbsUp as RegularLike,
  } from "@fortawesome/free-regular-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";

  import { getJoke } from "../utils/getJoke";
  import JokeCard from "./JokeCard.svelte";

  export let likedJokes: JokeProps[];
  export let dislikedJokes: JokeProps[];
  let isLiked = false;
  let isDisliked = false;

  let joke: JokeProps;
  let fetching = false;

  const fetchNewJoke = async () => {
    fetching = true;
    const newJoke = await getJoke();
    joke = newJoke;
    fetching = false;
  };

  if (!joke) fetchNewJoke();

  const likeJoke = () => {
    if (isLiked) return
    likedJokes.push(joke);
    dislikedJokes = dislikedJokes.filter(({id}) => id !== joke.id);
  };
  const dislikeJoke = () => {
    if (isDisliked) return
    dislikedJokes.push(joke);
    likedJokes = likedJokes.filter(({id}) => id !== joke.id);
  };

  $: {
    isLiked = likedJokes.includes(joke);
    isDisliked = dislikedJokes.includes(joke);
  }

  library.add(RegularDislike);
  library.add(RegularLike);
  library.add(SolidDislike);
  library.add(SolidLike);
</script>

<JokeCard {joke} />

<button class="icon" on:click={dislikeJoke}>
  <FontAwesomeIcon
    icon={isDisliked ? SolidDislike : RegularDislike}
    fill="rgb(255, 62, 0)"
  />
</button>
<button on:click={fetchNewJoke}>
  {fetching ? "Fetching...." : "Get new joke"}
</button>
<button class="icon" on:click={likeJoke}>
  <FontAwesomeIcon
    icon={isLiked ? SolidLike : RegularLike}
    fill="rgb(255, 62, 0)"
  />
</button>

{#if !!likedJokes.length}
<h2>Liked jokes</h2>
{/if}
{#each likedJokes as likedJoke}
<JokeCard joke={likedJoke} />
{/each}

<style>

  h2 {
    color: #ff3e00;
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }
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

  button.icon {
    width: fit-content;
  }
  button:focus {
    border: 2px solid #ff3e00;
  }

  button:active {
    background-color: rgba(255, 62, 0, 0.2);
  }
</style>
