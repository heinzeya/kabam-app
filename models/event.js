exports.name = 'Event';

exports.init = function(kernel) {
  var EventSchema = new kernel.mongoose.Schema({
    name: String,
    description: String,
    url: String,
    image: String,
    sameAs: String,
    additionalType: String
  });
  return EventSchema;
};
