# epub-gen-memory

Generate EPUB books from HTML with a simple API in Node.js or the browser.

__This is a fork of [cpiber/epub-gen-memory](https://github.com/cpiber/epub-gen-memory) with some additional fixes (or features) used by https://epubkit.app__:

- Support passing local file path to `cover` option (instead of just URL)
- Remove the extra new line in the generated ncx chapter title
- Support img tag with data URL (base64) as src
- Support validating URLs before requests are made to them
- Support `css` and `cssFileName` option to add custom chapter CSS 
- Support `imageFetcherHeaders(url: string) => Headers` option to add custom headers to image fetcher
- Support `imageTransformer(image: Image) => Image` option to transform images before downloading

## Install

```
npm i @epubkit/epub-gen-memory
```

# License

MIT License