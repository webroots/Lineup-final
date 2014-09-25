Template.tSubs.cPlayer = function() {
  return Players.findOne({_id:Session.get("sPlayerId")});
};

Template.tSubs.sPlayerId = function() {
  Session.get("sPlayerId");
};

Template.tSubs.cPlayers = function() {
  return Players.find({
    gameStatus: "sub"
  }, {
    sort: {
      firstName: 1
    }
  });
};

Template.tSubs.helpers({
  haveSubs: function() {
    if (Players.find({
      gameStatus: "sub"
    }).count() > 0) {
      return true;
    }
  },
  missingPlayers: function() {
    if (Players.find({
      gameStatus: "out"
    }).count() > 0) {
      return true;
    }
  },
  moneyOwed: function(evt, tmpl) {
    var totalFeesStillOwed = this.seasonFeeOwed - this.seasonFeePaid;
    if (totalFeesStillOwed > 0) {
      return totalFeesStillOwed;
    }
  }

});

Template.tSubs.events({
  'click .remove-player': function(evt, tmpl) {
    Session.set('sPlayerId', this._id);
    removePlayer();
    Session.set('sPlayerId', null);
  },
  'click .edit-player': function(evt, tmpl) {
    // need access to session
    Session.set('sPlayerId', this._id);
    $("#modal-id").modal("show")
  }
});

var removePlayer = function() {
  Players.remove({
    _id: Session.get('sPlayerId')
  });
};
