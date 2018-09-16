// const app = angular.module('searchView', ['ngCookies','follow', 'ui.select', 'ngSanitize', 'infinite-scroll']).value('THROTTLE_MILLISECONDS', 300)
const app = angular.module('monitor', [])
app.controller('monitorCtrl', ['$scope', '$http', function($scope, $http){

  $scope.buildings;

  const poll = () => {
    $http
      .get('/buildings')
      .then(res => {

        $scope.buildings = res.data.forEach(building => {
          console.log(building)
          building.img_url = `https://${building.img_url}`
          building.time = moment(building.created_at).format("MM/DD:hA")
        })
        $scope.buildings = res.data;

        $scope.buildings.forEach(b => {
          let pos = {lat: b.latitude, lng: b.longitude}
          let options = {
            position: pos,
            map: map
          }

          if (b.classification == 'Broken Buildings') {
            var marker = new google.maps.Marker();
          }

        })


      })
  }
  //
  // poll(buildings => {
  //
  //   avgLat = buildings
  //     .map(b => b.latitude)
  //     .reduce((a, b) => a + b, 0) / buildings.length
  //   avgLong = buildings
  //     .map(b => b.longitude)
  //     .reduce((a, b) => a + b, 0) / buildings.length
  //
  //   console.log(avgLat, avgLong)
  //
  //   // initMap(avgLat, avgLong)
  // })
  poll()
  setInterval(poll, 1000 * 2)

  // $scope.magicArray = [123,1,5,1,42,1,23,2]
  // //
  // $scope.buildings = [{
  //   imgLink: 'https://c.pxhere.com/photos/c1/9a/demolition_building_rubble_crash_site_home_demolished_broken_new_beginning-1120613.jpg!d',
  //   latitude: 123.123,
  //   longitude: 123.123,
  //   uploaded: '2018-09-15T19:13:10.585Z'
  // }, {
  //   imgLink: 'https://c.pxhere.com/photos/c1/9a/demolition_building_rubble_crash_site_home_demolished_broken_new_beginning-1120613.jpg!d',
  //   latitude: 123.123,
  //   longitude: 123.123,
  //   uploaded: '2018-09-15T19:13:10.585Z'
  // }]

}])
