Template.tFormerPlayers.cFormerPlayers = function() {
  return Players.find({
     gameStatus: "former"
  }, {
    sort: {
      firstName: 1
    }
  });
};


Template.tFormerPlayers.sPlayerId = function() {
    Session.get("sPlayerId");
};

Template.tFormerPlayers.events({
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
