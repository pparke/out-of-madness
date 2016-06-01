/**
 * Parse Dimension
 */

export default function parseDimension (dim, context) {
  if (typeof dim === 'string') {
    if (dim.length === 0) {
      return dim;
    }
    else if (dim.indexOf('%') > -1) {
      dim.slice(0, dim.indexOf('%'));
      dim = parseFloat(dim) / 100;
      return (dim * context);
    }
    else if (dim.indexOf('px') > -1) {
      dim.slice(0, dim.indexOf('px'));
      return parseFloat(dim);
    }
    else {
      return parseInt(dim);
    }
  }
  else if (typeof dim === 'number') {
    return dim;
  }
  else if (typeof dim === 'object') {
    let ret = {};
    Object.keys(dim).forEach((key) => {
      ret[key] = parseDimension(dim[key], contextProp(context, key));
    });
    console.log(ret)
    return ret;
  }
  else if (dim === undefined || dim === null) {
    console.log('dim is undefined')
    return dim;
  }
  else {
    throw new Error('Could not parse dim', dim);
  }
}

function contextProp (context, propname) {
  if (typeof context !== 'object') {
    return context;
  }
  propname = propname.toLowerCase();
  if (propname === 'x' || !!propname.match(/width|left|right/)) {
    return context.width;
  }
  else if (propname === 'y' || !!propname.match(/height|top|bottom/)) {
    return context.height;
  }
}
