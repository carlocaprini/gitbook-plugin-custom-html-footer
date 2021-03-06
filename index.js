var fs = require('fs');
var cheerio = require('cheerio');
var url = require('url');

var urls = [];

module.exports = {
    hooks: {
        "page": function (page) {

            var args = process.argv;
			var dest = "_book";
			if (args[2] == "build" && args.length >= 5) {
				dest = args[4];
			}

            if (this.output.name != 'website') return page;

            var lang = this.isLanguageBook() ? this.config.values.language : '';
            if (lang) lang = lang + '/';

            var outputUrl = this.output.toURL(dest + '/' + lang + page.path);

            urls.push({
                url: outputUrl + (outputUrl.substr(-5, 5) !== '.html' ? 'index.html' : '')
            });

            return page;

        },

        "finish": function () {
            var $, $el, html;
            var pathFile = this.options.pluginsConfig && this.options.pluginsConfig["custom-html-footer"] && this.options.pluginsConfig["custom-html-footer"].footerPath;
            var tmpl = '';

            if (pathFile && fs.existsSync(pathFile)) tmpl = fs.readFileSync(pathFile, {encoding: 'utf-8'});

            urls.forEach(item => {
                html = fs.readFileSync(item.url, {encoding: 'utf-8'});
                $ = cheerio.load(html);
                $el = $('body .book .book-body .body-inner');

                $el.append(tmpl);


                fs.writeFileSync(item.url, $.root().html(), {encoding: 'utf-8'});
            })
        }
    }
}
