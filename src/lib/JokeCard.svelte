<script lang="ts">
  import type { Joke } from "../types/Joke";

  export let joke: Joke;
  let renderedJoke: string = "Loading...";

  $: {
    if (joke?.type === "single") {
      renderedJoke = joke.joke;
    } else if (joke?.type === "twopart") {
      renderedJoke = `${joke.setup}\n\n${joke.delivery}`;
    } else {
      renderedJoke = "Sorry, something went wrong :(";
    }
  }
</script>

<p>{renderedJoke}</p>

<style>
  p {
    font-family: inherit;
    font-size: inherit;
    padding: 1em 2em;
    color: #ff3e00;
    border-radius: 2em;
    border: 2px solid rgba(255, 62, 0, 0.1);
    outline: none;
    width: 70vw;
    margin-left: auto;
    margin-right: auto;
    font-variant-numeric: tabular-nums;
    white-space: pre-line;
  }
</style>
