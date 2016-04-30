PIGEUBANK.data = {
  init: function() {
    var self = this;
    $.getJSON("../../data/result.json", function(data) {
      self.data = data;
      // init map
      PIGEUBANK.map.init();
    });
  }
};