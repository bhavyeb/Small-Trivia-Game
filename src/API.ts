// {"id":114598,"answer":"Yahoo!","question":"In 2008 Carl Icahn bought millions of shares in this Internet company with an exclamation point in its name","value":1000,"airdate":"2011-10-17T12:00:00.000Z","created_at":"2014-02-14T02:44:18.371Z","updated_at":"2014-02-14T02:44:18.371Z","category_id":15621,"game_id":null,"invalid_count":null,"category":{"id":15621,"title":"the is have it","created_at":"2014-02-14T02:44:17.457Z","updated_at":"2014-02-14T02:44:17.457Z","clues_count":10}}

export type Question = {
  answer: string;
  // category_id: number;
  id: number;
  question: string;
};

export const fetchQuizQuestions = async (amount: number) => {
  const endpoint = `https://jservice.io/api/random?count=${amount}`;
  // https://jservice.io/api/random?count=10
  const data = await (await fetch(endpoint)).json();
  return data.map((question: Question) => ({
    ...question,
  }));
};
