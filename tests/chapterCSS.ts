import type { Chapter, Options } from '../lib';

const date = new Date();
date.setFullYear(2000);

export const optionsAlice: Options = {
  title: "Alice's Adventures in Wonderland",
  author: "Lewis Carroll",
  publisher: "Macmillan & Co.",
  date: date.toString(),
  cover: "http://orig10.deviantart.net/e272/f/2013/255/0/0/alice_in_wonderland_book_cover_by_pannucabaguana-d6m003p.jpg",
  version: 3,
  verbose: true,
};

export const contentAlice: Chapter[] = [
  {
    title: "About the author",
    content: "<div>test</div>",
    url: 'http://www.alice-in-wonderland.net',
    author: 'Charles Lutwidge Dodgson',
    beforeToc: true,
    css: 'body {background: red;}'
  },
];
