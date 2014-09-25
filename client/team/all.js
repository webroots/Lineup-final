Template.tAll.cAll = function() {
    return Players.find({
    });
};


Template.tAll.sPlayerId = function() {
    Session.get("sPlayerId");
};

Template.tAll.events({
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
