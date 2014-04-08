// Application //

var App = {
  Models: {},
  Views: {},
  Collections: {}
  // One-off objects ==> App.tweetRouter = Backbone.Router.extend({});
};

// Models //

App.Models.Tweet = Backbone.Model.extend({
  urlRoot: '/tweets'
});

// Views //

App.Views.Tweet = Backbone.View.extend({
  className: 'list-group-item',
  
  template: _.template('<div class="list-group-item-heading">' +
                         '<h4><a href="#" id="<%= user %>"><span class="glyphicon glyphicon-user"></span> <%= user %></a>' +
                         ' <small><span class="glyphicon glyphicon-time"></span> <%= timestamp %></small></h1>' +       
                       '</div>' +
                       '<p class="list-group-item-text"><%= message %></p>'),
                       
  events: {
    "click a" : "changeUser"
  },
  
  changeUser: function() {
    username = this.model.get("user");
  },
  
  render: function() {
    var attributes = this.model.toJSON();
    attributes.timestamp = moment(moment(attributes.timestamp)).twitter();
    this.$el.html(this.template(attributes));
  }
});

App.Views.Tweets = Backbone.View.extend({
  initialize: function() {
    this.collection.on('reset', this.addTweets, this);
  },

  addTweet: function(tweet) {
    var tweetView = new App.Views.Tweet({ model: tweet });
    tweetView.render();
    this.$el.prepend(tweetView.el);
  },
  
  addTweets: function() {
    this.$el.empty();
    this.collection.forEach(this.addTweet, this);
  },
  
  render: function() {
    this.addTweets();
  }
});

// Collections //

App.Collections.Tweets = Backbone.Collection.extend({
  model: App.Models.Tweet,
  url: '/tweets'
});