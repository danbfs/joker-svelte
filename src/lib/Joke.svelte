<script lang="ts">
  import type { JokeProps } from "src/types/Joke";
  import { library } from "@fortawesome/fontawesome-svg-core";
  import {
    faThumbsDown as SolidDislike,
    faThumbsUp as SolidLike,
    faEyeSlash as HiddenIcon,
    faEye as VisibleIcon,
  } from "@fortawesome/free-solid-svg-icons";
  import {
    faThumbsDown as RegularDislike,
    faThumbsUp as RegularLike,
  } from "@fortawesome/free-regular-svg-icons";
  import { FontAwesomeIcon } from "fontawesome-svelte";

  import { getJoke } from "../utils/getJoke";
  import JokeCard from "./JokeCard.svelte";
  import { afterUpdate } from "svelte";

  export let likedJokes: JokeProps[];
  export let dislikedJokes: JokeProps[];
  let isLiked = false;
  let isDisliked = false;
  let shouldShowLikedJokes = JSON.parse(
    window.localStorage.getItem("shouldShowLikedJokes")
  );

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
    if (isLiked) return;
    likedJokes.push(joke);
    likedJokes = likedJokes;
    dislikedJokes = dislikedJokes.filter(({ id }) => id !== joke.id);
  };
  const dislikeJoke = () => {
    if (isDisliked) return;
    dislikedJokes.push(joke);
    dislikedJokes = dislikedJokes;
    likedJokes = likedJokes.filter(({ id }) => id !== joke.id);
  };

  const toggleShouldShowLikedJokes = () => {
    shouldShowLikedJokes = !shouldShowLikedJokes;
  };

  $: {
    isLiked = likedJokes.includes(joke);
    isDisliked = dislikedJokes.includes(joke);
  }

  afterUpdate(() => {
    window.localStorage.setItem("likedJokes", JSON.stringify(likedJokes));
    window.localStorage.setItem("dislikedJokes", JSON.stringify(dislikedJokes));
    window.localStorage.setItem(
      "shouldShowLikedJokes",
      JSON.stringify(shouldShowLikedJokes)
    );
  });

  library.add(RegularDislike);
  library.add(RegularLike);
  library.add(SolidDislike);
  library.add(SolidLike);
  library.add(VisibleIcon);
  library.add(HiddenIcon);
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

<h2 on:click={toggleShouldShowLikedJokes}>
  Liked jokes <FontAwesomeIcon
    icon={shouldShowLikedJokes ? HiddenIcon : VisibleIcon}
    fill="rgb(255, 62, 0)"
    style="width: 24px; height: 24px"
  />
</h2>
{#if !!likedJokes.length && shouldShowLikedJokes}
  {#each likedJokes as likedJoke}
    <JokeCard joke={likedJoke} />
  {/each}
{/if}

<style>
  h2 {
    color: #ff3e00;
    font-size: 2rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    width: 14rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    cursor: pointer;
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
