<script lang="ts">
  import Joke from "./lib/Joke.svelte";
import type { JokeProps } from "./types/Joke";
  
  let likedJokes: JokeProps[] = JSON.parse(window.localStorage.getItem('likedJokes')) || [];
  let dislikedJokes: JokeProps[] = JSON.parse(window.localStorage.getItem('dislikedJokes')) || [];
</script>

<main>
  <h1>Joker with Svelte :)</h1>

  <Joke {likedJokes} {dislikedJokes} />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4rem;
    font-weight: 100;
    line-height: 1.1;
    margin: 2rem auto;
    max-width: 14rem;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }
  }
</style>
