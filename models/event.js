exports.name = 'Event';

exports.init = function(kernel) {
  var Schema = kernel.mongoose.Schema;
  var eventSchema = new Schema({
    // Thing (schema.org)
    name: String,
    description: String,
    url: String,
    image: String,
    sameAs: String,
    additionalType: String,

    // Event (schema.org)
    attendee: Schema.Types.Mixed,
    attendees: [Schema.Types.Mixed],
    duration: Number,
    endDate: Date,
    location: String,
    offers: String,
    performer: Schema.Types.Mixed,
    performers: [Schema.Types.Mixed],
    startDate: Date,
    subEvent: { type: Schema.Types.ObjectId, ref: 'Event' },
    subEvents: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
    superEvent: { type: Schema.Types.ObjectId, ref: 'Event' },

    // fullcalendar
    allDay: Boolean,
    className: String,
    editable: Boolean,
    startEditable: Boolean,
    durationEditable: Boolean,
    color: String,
    backgroundColor: String,
    borderColor: String,
    textColor: String
    // id = _id
    // title = name
    // start = startDate
    // end = endDate
    // source: not persisted
  });

  eventSchema.statics.getForUser = function (user, parameters, callback) {
    if (user) {
      if (typeof parameters === 'object') {
        this.find(parameters)
          .limit(parameters.limit || 10)
          .skip(parameters.offset || 0)
          .exec(callback);
      } else {
        callback(new Error('Wrong parameters'));
      }
    } else {
      callback(new Error('Access denied!'));
    }
  };

  eventSchema.statics.canCreate = function(user, cb) {
    cb(null, true);
  };

  eventSchema.methods.canRead = function(user, cb) {
    cb(null, true);
  };

  eventSchema.methods.canWrite = function(user, cb) {
    cb(null, true);
  };

  return eventSchema;
};
