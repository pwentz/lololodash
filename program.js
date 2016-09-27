var _ = require('lodash')

var worker = function(users) {
  return _.filter(users, { 'active': true })
}

var sortWhere = function(array) {
  return _.sortBy(array, function(article) {
    return -article.quantity
  })
}

var addSize = function(collection) {
  return _.forEach(collection, function(city) {
    if (1.0 < city.population) {
      city.size = 'big'
    }
    else if (0.5 < city.population) {
      city.size = 'med'
    }
    else if (city.population < 0.5) {
      city.size = 'small'
    }
  })
}

var townTemp = function(collection) {
  var warmTowns = [];
  var hotTowns = [];
  _.forEach(collection, function(temps, town) {

    if (_.every(temps, function(temp) { return temp > 19 })) {
      hotTowns.push(town)
    }
    else if (_.some(temps, function(temp) { return temp > 19 })) {
      warmTowns.push(town)
    }
  })

  return { 'hot': hotTowns, 'warm': warmTowns }
}

var chainMail = function(collection) {
  return _.chain(collection)
          .sortBy()
          .map(function(word) {
            return word.toUpperCase() + 'CHAINED'
          })
          .value()
}

var commentCount = function(array) {
  return _.chain(array)
          .groupBy('username')
          .map(function(comments, userName) {
            return { 'username': userName, 'comment_count': _.size(comments) }
          })
          .reverse()
          .value()
}

var orderSum = function(array) {
   return _.chain(array)
           .groupBy('article')
           .map(function(aggData, article) {
             return {
               'article': Number(article),
               'total_orders': _.reduce(aggData, function(sum, obj){
                 return sum + obj.quantity
               }, 0)
             }
           })
           .reverse()
           .value()
}

var filterPerformance = function(collection) {
  var total = _.reduce(collection, function(sum, obj){
    return sum + obj.income
  }, 0)

  var avg = total / _.size(collection)

  var underperform = _.chain(collection)
                      .filter(function(performer) {
                        return performer.income <= avg
                      })
                      .sortBy('income')

  var overperform = _.chain(collection)
                     .filter(function(performer) {
                       return performer.income > avg
                     })
                     .sortBy('income')

  return {
    average: avg,
    underperform: underperform,
    overperform: overperform
  }

}

var templating = function(obj) {
  return _.template('Hello <%= name %> (logins: <%= _.size(login) %>)')(obj)
}

module.exports = worker;
module.exports = sortWhere;
module.exports = addSize;
module.exports = townTemp;
module.exports = chainMail;
module.exports = commentCount;
module.exports = orderSum;
module.exports = filterPerformance
module.exports = templating
