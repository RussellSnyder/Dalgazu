// dust.debugLevel = "INFO";

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

// ABOUT
client.getEntry('42yd6zYsBa4GuqCEIIIoAI').then(function (entry) {
    var data = entry.fields;
    data.description = markdownToHtml.makeHtml(data.description);
    renderSection(data, 'about');
})

// EVENTS
client.getEntries({'sys.id': '4v6AWWaHFeGSWMqIwsAECK'}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = {
            parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
            parallaxHeight: entry.fields.parallaxHeight,
            title: entry.fields.title,
            events: entry.fields.events.map(function (m) {
                var data = m.fields;
                data.description = markdownToHtml.makeHtml(data.description);
                data.date = moment(data.dateAndTime).format('LL');
                return data;
            })
        }
        renderSection(data, 'upcoming');
    });
})

// MEMBERS
client.getEntries({
    'content_type': 'members'
}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = {
            parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
            parallaxHeight: entry.fields.parallaxHeight,
            title: entry.fields.title,
            members: entry.fields.members.map(function (m) {
                var data = m.fields;
                data.description = markdownToHtml.makeHtml(data.description);
                data.photoSrc = data.photo.fields.file.url;
                return data;
            })
        }
        renderSection(data, 'members');
    })
})

// Music
client.getEntries({
    'content_type': 'musics'
}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = {
            parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
            parallaxHeight: entry.fields.parallaxHeight,
            headline: entry.fields.headline,
            featureVideo: entry.fields.featureVideo,
            text: markdownToHtml.makeHtml(entry.fields.text),
            music: entry.fields.music.map(function (m) {
                return {
                    title: m.fields.title,
                    date: moment(m.fields.date).format('LL'),
                    src: m.fields.dropBoxLink
                }
            })
        }
        renderSection(data, 'music');
    })
})

// Support
client.getEntries({
    'content_type': 'supportSection'
}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = {
            parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
            parallaxHeight: entry.fields.parallaxHeight,
            headline: entry.fields.headline,
            description: markdownToHtml.makeHtml(entry.fields.description),
            waysToSupport: entry.fields.waysToSupport.map(function (m) {
                if (m.fields) {
                    return {
                        title: m.fields.title,
                        description: markdownToHtml.makeHtml(m.fields.description),
                        link: m.fields.link,
                        src: m.fields.photo.fields.file.url
                    }
                }
            })
        }
        renderSection(data, 'support');
    })
})

// CONTACT
client.getEntries({
    'content_type': 'contactSection'
}).then(function (entries) {
    entries.items.forEach(function (entry) {
        var data = {
            parallaxPhoto: entry.fields.parallaxPhoto.fields.file.url,
            parallaxHeight: entry.fields.parallaxHeight,
            headline: entry.fields.headline,
            description: markdownToHtml.makeHtml(entry.fields.description),
            waysToContact: entry.fields.waysToContact.map(function (m) {
                return {
                    title: m.fields.title,
                    data: m.fields.data
                }
            })
        }
        renderSection(data, 'contact');
    })
})


// nav and Footer
$(document).ready(function () {
    dust.render('nav', {},
        function (err, nav) {
            $('header#nav').html(nav);

            $("nav ul li a[href^='#']").on('click', function (e) {
                e.preventDefault();
                var hash = this.hash.substring(1, this.hash.length);
                $('html, body').animate({
                    scrollTop: $('#' + hash).offset().top
                }, 500, function () {
                    window.location.hash = hash;
                });
                var $toggler = $('button.navbar-toggler');
                if ($toggler.attr('aria-expanded') === 'true') {
                    $toggler.attr('aria-expanded', 'false');
                    $toggler.toggleClass('collapsed');
                    $('.navbar-collapse#navbarNav').toggleClass('show')
                }

            });

        });
    dust.render('footer', {},
        function (err, footer) {
            $('body').append(footer);
        });

    if ($(window).width() < 600)
        $('body').attr('data-offset', 0)
});

function renderSection(data, name) {
    dust.render(name, data,
        function (err, out) {
            $('#' + name + '-section').html(out);
        });
}

