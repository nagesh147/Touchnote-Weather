// utility Function to handle mapping the property names dynamically , if changed at the back end in the API response

// *************WORK IN PROGRESS************* 

export function propertyMap(sourceProperty: string) {
  return function (target: any, propertyKey: string) {
    if (!target.constructor._propertyMap) {
      target.constructor._propertyMap = {};
    }
    target.constructor._propertyMap[propertyKey] = sourceProperty;
  }
}