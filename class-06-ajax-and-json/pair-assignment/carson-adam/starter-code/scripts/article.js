function Article (opts) {
  this.author = opts.author;
  this.authorUrl = opts.authorUrl;
  this.title = opts.title;
  this.category = opts.category;
  this.body = opts.body;
  this.publishedOn = opts.publishedOn;
}

// DONE: Instead of a global `articles = []` array, let's track this list of all articles directly on the
// constructor function. Note: it is NOT on the prototype. In JavaScript, functions are themselves
// objects, which means we can add properties/values to them at any time. In this case, we have
// a key/value pair to track, that relates to ALL of the Article objects, so it does not belong on
// the prototype, as that would only be relevant to a single instantiated Article.
Article.all = [];

Article.prototype.toHtml = function() {
  var template = Handlebars.compile($('#article-template').text());

  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';
  this.body = marked(this.body);

  return template(this);
};

// DONE: There are some other functions that also relate to articles across the board, rather than
// just single instances. Object-oriented programming would call these "class-level" functions,
// that are relevant to the entire "class" of objects that are Articles.

// DONE: This function will take the rawData, how ever it is provided,
// and use it to instantiate all the articles. This code is moved from elsewhere, and
// encapsulated in a simply-named function for clarity.
Article.loadAll = function(rawData) {
  rawData.sort(function(a,b) {
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  rawData.forEach(function(ele) {
    Article.all.push(new Article(ele));
  })
}
Article.fetchAll = function() {
  if (localStorage.rawData) {
    Article.loadAll(JSON.parse(localStorage.rawData));
    articleView.initIndexPage();

  } else {
    $.getJSON('/data/hackerIpsum.json', function(rawData) {
      Article.loadAll(rawData);
      localStorage.rawData = JSON.stringify(rawData);
      articleView.initIndexPage();
    });
  }
}

  //  We tried for the stretch goal here.  Couldn't finish it.
var etagCheck = $.ajax() {
  type: 'HEAD',
  url: '/data/hackerIpsum.json',
  dataType: 'json',
  ifModified: true,
  complete: function (XMLHttpRequest, textStatus) {
    var eTag = XMLHttpRequest.getResponseHeader('ETag');
    console.log(eTag);
  }
};

//  W/"b28-15232b07b2d"

Aritcle.fetchAll = function() {
  localStorage.rawData()
  $Article.head(function() {
    var link = this;
    $.ajax({
      type: 'HEAD',
      url: 'http://127.0.0.1:8080/',
      complete: function(xhr) {
      }
    })
  });
}
    /*  // check the e-tag value in local storage
    //make ajax call with head method
    //compare teh two e-tag values
    // if same e-tag value then don't update local storage
    //else update local storage call fetchAll function
*/
