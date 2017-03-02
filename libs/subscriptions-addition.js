import { Listenings } from '../imports/api/listenings.js';

bigSlider = function() {
  return Listenings.find({"listeningTech.public": true});
}
photoGrid = function(limit) {
  return Listenings.find({"listeningTech.public" : true}, {limit: limit});
}