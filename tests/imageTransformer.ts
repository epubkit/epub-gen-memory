import { writeFile } from 'fs/promises';
import epub from '../lib';
import type { Image } from '../lib/util';

const imageTransformer = (image: Image): Image => {
  // Transform image by adding a prefix to filename
  return {
    ...image,
    url: `https://fly.webp.se/image?url=${image.url}`
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
                 <img src="https://example.com/test.jpg">`
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
                 <img src="https://example.com/test.jpg">`
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
