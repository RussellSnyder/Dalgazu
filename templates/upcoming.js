!function(){function e(e,a){return e.write('<div class="parallax upcoming"style="background-image: url(\'').reference(a.get(["parallaxPhoto"],!1),a,"h").write("'); min-height: ").reference(a.get(["parallaxHeight"],!1),a,"h").write('px"></div><div id="upcoming" class="upcoming container body section" data-spy="scroll" data-target="#scrollspy-nav"><h1>').reference(a.get(["title"],!1),a,"h").write('</h1><div class="row"><div class="col-md-6">').section(a.get(["events"],!1),a,{block:t},null).write('</div><div class="fb-container col-md-6 text-center"><div class="fb-page" data-href="https://www.facebook.com/dalgazul/" data-tabs="events" data-width="500"data-small-header="false" data-adapt-container-width="true" data-hide-cover="false"data-show-facepile="false"><blockquote cite="https://www.facebook.com/dalgazul/" class="fb-xfbml-parse-ignore"><ahref="https://www.facebook.com/dalgazul/">Dalgazul</a></blockquote></div></div></div></div>')}function t(e,t){return e.write('<div class="event"><h4 class="date">').reference(t.get(["date"],!1),t,"h").write('</h4><h3 class="title">').reference(t.get(["title"],!1),t,"h").write('</h3><div class="description">').reference(t.get(["description"],!1),t,"h",["s"]).write("</div></div>")}return dust.register("upcoming",e),e}();