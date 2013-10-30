angular.module('Dashboard.controllers')
  .controller(
    'MainCtrl',
    ['$scope', '$log', '$modal', 'eventService', 'notificationService', 'events',
     function($scope, $log, $modal, eventService, notificationService, events) {

       $scope.events = events;

       $scope.open = function (type, date) {

         var eventModal = $modal.open({
           templateUrl: 'eventModal.html',
           controller: 'EventModalCtrl',
           resolve: {
             items: function () {
               return $scope.items;
             }
           }
         });

         eventModal.result.then(function (selectedItem) {
           $scope.selected = selectedItem;
         }, function () {
           $log.info('Modal dismissed at: ' + new Date());
         });

       };

       /* alert on eventClick */
       $scope.alertEventOnClick = function( date, allDay, jsEvent, view ){
         $log.log(date, allDay, jsEvent, view);
         $scope.$apply(function(){
           $scope.alertMessage = ('Day Clicked ' + date);
           notificationService.notice($scope.alertMessage);
         });
       };
       /* alert on Drop */
       $scope.alertOnDrop = function(event, dayDelta, minuteDelta, allDay, revertFunc, jsEvent, ui, view){
         $scope.$apply(function(){
           $scope.alertMessage = ('Event Droped to make dayDelta ' + dayDelta);
           notificationService.notice($scope.alertMessage);
           $log.log(event, dayDelta, minuteDelta, allDay, jsEvent, view);
         });
       };
       /* alert on Resize */
       $scope.alertOnResize = function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view ){
         $scope.$apply(function(){
           $scope.alertMessage = ('Event Resized to make dayDelta ' + minuteDelta);
           notificationService.notice($scope.alertMessage);
           $log.log(event, dayDelta, jsEvent, view);
         });
       };

       $scope.addEvent = function(type) {

         eventService.postEvent({
           title: type + ': new name',
           start: new Date(),
           additionalType: type
         });
       };

       // config
       $scope.uiConfig = {
         calendar:{
           height: 450,
           editable: true,
           header:{
             left: 'month basicWeek basicDay agendaWeek agendaDay',
             center: 'title',
             right: 'today prev,next'
           },
           dayClick: $scope.alertEventOnClick,
           eventDrop: $scope.alertOnDrop,
           eventResize: $scope.alertOnResize
         }
       };

       $scope.items = ['item1', 'item2', 'item3'];

       $scope.$on('update', function(event, data) {
         data.Event = eventService.toCalendar(data.Event);
         var idx = _.findIndex($scope.eventSources, { id: data.Event.id });

         if (idx >= 0) {
           $scope.eventSources.splice(idx, 1, data.Event);
         }
       });

       $scope.$on('create', function(event, data) {
         $scope.events.push(eventService.toCalendar(data.Event));
       });

       $scope.$on('delete', function(event, data) {
         var idx = _.findIndex($scope.events, { id: data.id });
         if (idx >= 0) {
           $scope.events.splice(idx, 1);
         }
       });

       $scope.$emit('backend', { action: 'subscribe', channel: 'Event' });

       $scope.eventSources = [ $scope.events ];

     }])

  .controller('EventModalCtrl', [
    '$scope', '$modalInstance', 'items',
    function ($scope, $modalInstance, items) {

      console.log('$modalInstance', $modalInstance);
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
      };

    }]);
