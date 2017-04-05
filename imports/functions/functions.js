export function Translate(array, key, lang) {
  /*
    It takes three parameters @array and @key
    @array - an array of objects
    @key - string
    @lang - string
  */
  if(array && key) {
    var returnText = "";
    for(var i = 0; i < array.length; i++) {
      var arrayValue = array[i].value;
      var arrayText = array[i].text;
      if(key === arrayValue) {
        returnText = arrayText;
      }
    }
    if(returnText) {
      return returnText;
    } else {
      return key;
    }
  } else {
    return key;
  }
};

