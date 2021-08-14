type CommonJokeProps = {
  category: string;
  error: boolean;
  flags: {
    [key: string]: boolean;
  };
  lang: string;
  id: number;
  safe: boolean;
};

export type Joke =
  | (CommonJokeProps & {
      type: 'twopart';
      setup: string;
      delivery: string;
    })
  | (CommonJokeProps & {
      type: 'single';
      joke: string;
    });
