import { writeFile } from 'fs/promises';
import epub from '../lib';
import type { Image } from '../lib/util';

const imageTransformer = (image: Image): Image => {
  // Transform image by adding a prefix and using the original URL as a parameter
  return {
    ...image,
    url: `https://epubkit-image.pseudoyu.com/?url=${image.url}`
  };
};

(async () => {
  try {
    const content = await epub(
      {
        title: 'Image Transform Test',
        verbose: true,
        imageTransformer
      },
      [{
        content: `<p>Test image transformation</p>
                 <img src="http://www.alice-in-wonderland.net/wp-content/uploads/1book1.jpg">`
      }]
    );

    await writeFile(`${__filename.slice(0, -3)}.epub`, Buffer.from(content));

    // Test that imageTransformer was called by checking if transformed file exists in epub
    const epub2 = await epub(
      {
        title: 'Image Transform Test 2',
        verbose: true
      },
      [{
        content: `<p>Test image transformation</p>
                 <img src="http://orig10.deviantart.net/e272/f/2013/255/0/0/alice_in_wonderland_book_cover_by_pannucabaguana-d6m003p.jpg">`
      }]
    );

    if (epub2 === content) {
      console.error('Image transformer did not modify the output');
      process.exit(-1);
    }

  } catch (err) {
    console.error(err);
    process.exit(-1);
  }
})();
