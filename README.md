# Custom HTML Footer for Gitbook

This plugin allows to add a HTML footer to all pages in a book while ignoring the summary column in the process.

## Usage

1. Update your `book.json`

```json
{
  "plugins": [
    "custom-html-footer"
  ],
  "pluginsConfig": {
    "custom-html-footer": {
      "footerPath" : "custom-html-footers/footer.html"
    }
  }
}
```

2. Install the book dependencies `gitbook install`

## Note

This project is a fork of [gitbook-plugin-footer](https://www.npmjs.com/package/gitbook-plugin-footer).
