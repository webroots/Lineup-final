Template.tNotPlaying.cPlayer = function() {
  return Players.findOne({_id:Session.get("sPlayerId")});
};

Template.tNotPlaying.sPlayerId = function() {
  Session.get("sPlayerId");
};

Template.tNotPlaying.cPlayersOff = function() {
  return Players.find({
    gameStatus: "out"
  }, {
    sort: {
      firstName: 1
    }
  });
};

Template.tNotPlaying.helpers({
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

Template.tNotPlaying.events({
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