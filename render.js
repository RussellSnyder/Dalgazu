dust.debugLevel = "INFO";

var markdownToHtml = new showdown.Converter();

var client = contentful.createClient({
    space: 'p8g5hhwzdmvd',
    accessToken: '275b7d15c144636920af68bd6b1b11b191c4acda2b37d846f6a2e23a889312ce',
    resolveLinks: true
})


// WELCOME
client.getEntries({'sys.id': '5l0sd3lMM8Ai2qIOQC6OeU'}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = entry.fields;
        data.logo = data.mainPhoto.fields.file.url;
        renderSection(data, 'welcome');
    });
})

client.getEntries({
    'content_type': 'members'
}).then(function (entries) {
        entries.items.forEach(function (entry) {
            var data = {
                parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
                parallaxHeight: entry.fields.parallaxHeight,
                title: entry.fields.title,
                members: entry.fields.members.map(function(m) {
                    var data = m.fields;
                    data.description = markdownToHtml.makeHtml(data.description);
                    data.photoSrc = data.photo.fields.file.url;
                    return data;
                })
            }
            renderSection(data, 'members');
        })
    })


// nav and Footer
$(document).ready(function() {
    dust.render('nav',{},
        function (err, nav) {
            $('header#nav').html(nav);
        });
    dust.render('footer',{},
        function (err, footer) {
            console.log(footer)
            $('body').append(footer);
        });
});

function renderSection(data, name) {
    dust.render(name, data,
        function (err, out) {
            $('#' + name).html(out);
        });
}