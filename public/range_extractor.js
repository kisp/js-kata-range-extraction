/* global _ */

function takeWhile(source, predicate) {
  var result = [];
  var length = source.length;
  var i = 0;

  while (i < length && predicate(source[i], i)) {
    result.push(source[i]);
    i++;
  }

  return result;
}

function dropWhile(source, predicate) {
  var length = source.length;
  var i = 0;

  while (i < length && predicate(source[i], i)) {
     i++;
  }

  return source.slice(i);
}


function stepUpChecker() {
  var last = null;
  return function(x) {
    var result = last === null || x == last + 1;
    last = x;
    return result;
  };
}

function toIntegersOrRangeSingleton(seq){
  if (seq.length > 2){
    return [[seq[0], seq[seq.length-1]]];
  } else {
    return seq;
  }
}

function toCompact(list){
  if (list.length == 0) {
    return [];
  } else {
    var seq = takeWhile(list, stepUpChecker());
    var rest = dropWhile(list, stepUpChecker());
    return toIntegersOrRangeSingleton(seq).concat(toCompact(rest));
  }
}

function formatCompact(x){
  if (Array.isArray(x)) {
    return [x[0],x[x.length-1]].join("-");
  } else {
    return x;
  }
}

function compute(string){
  var integers = string.split(/\s+/)
                 .map(x => parseInt(x, 10))
                 .filter(_.negate(isNaN))
                 .sort((a,b) => a-b);
  integers = _.uniq(integers);
  return toCompact(integers).map(formatCompact).join();
}
