(function(){

var toSchema = function(event) {
  console.log('to schema', event);
  if (event) {
    event.name = event.title;
    delete event.title;

    event.startDate = event.start;
    delete event.date;

    event.endDate = event.end;
    delete event.end;

    event._id = event.id;
  }
  return event;
};

var toCalendar = function(event) {
  event.id = event._id;
  event.title = event.name;
  event.start = event.startDate;
  event.end = event.endDate;
  console.log('toCalendar', event);
  return event;
};

angular.module('Dashboard.services')
  .factory('EventRestangular', [
    'Restangular',
    function(Restangular) {
      return Restangular.withConfig(function(RestangularConfigurer) {
        RestangularConfigurer.setRequestInterceptor(function(element) {
          return toSchema(element);
        });

        RestangularConfigurer.setResponseExtractor(function(response) {
          console.log('resp');
          var newResponse = response;
          if (angular.isArray(response)) {
            angular.forEach(newResponse, function(value, key) {
              newResponse[key] = value = toCalendar(value);
              newResponse[key].originalElement = angular.copy(value);
            });
          } else {
            newResponse = toCalendar(response);
            newResponse.originalElement = angular.copy(response);
          }

          console.log('interceptor response:', newResponse);
          return newResponse;
        });

      });
    }])
  .factory('eventService', [
    'EventRestangular',
    function(EventRestangular) {
      var _eventService = EventRestangular.all('Event');
      return {

        toCalendar: toCalendar,

        toSchema: toSchema,

        getEvents: function() {
          return _eventService.getList();
        },

        getEvent: function(id) {
          return _eventService.get(id);
        },

        postEvent: function(event) {
          return _eventService.post(event);
        }

      };
    }
  ]);

})();
