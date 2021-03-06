var config = require('./config'),
    request = require('request'),
    xml2js = require('xml2js'),
    parser = new xml2js.Parser(),
    urlHelper = require('./util/url_helper_nfl');

function init(access_level, version, apikey, year, season) {
  config.nfl.access_level = access_level;
  config.nfl.version = version;
  config.nfl.apikey = apikey;
  config.nfl.year = year;
  config.nfl.season = season;
  config.nhl.format = 'xml';
}

function getWeeklySchedule(week, callback) {
  var url = urlHelper.getWeeklyScheduleUrl(week);
  createRequest(url, callback);
}

function getSeasonSchedule(callback) {
  var url = urlHelper.getSeasonScheduleUrl();
  createRequest(url, callback);
}

function getGameStats(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameStatsUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getGameSummary(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameSummaryUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getPlayByPlay(week, awayteam, hometeam, callback) {
  var url = urlHelper.getPlayByPlayUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getPlaySummary(week, awayteam, hometeam, playid, callback) {
  var url = urlHelper.getPlaySummaryUrl(week, awayteam, hometeam, playid);
  createRequest(url, callback);
}

function getGameBoxscore(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameBoxscoreUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getExtendedBoxscore(week, awayteam, hometeam, callback) {
  var url = urlHelper.getExtendedBoxscoreUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getWeeklyBoxscore(week, callback) {
  var url = urlHelper.getWeeklyBoxscoreUrl(week);
  createRequest(url, callback);
}

function getGameRoster(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameRosterUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getTeamHierarchy(callback) {
  var url = urlHelper.getTeamHierarchyUrl();
  createRequest(url, callback);
}

function getTeamRoster(team, callback) {
  var url = urlHelper.getTeamRosterUrl(team);
  createRequest(url, callback);
}

function getInjuries(week, awayteam, hometeam, callback) {
  var url = urlHelper.getInjuriesUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getGameDepthChart(week, awayteam, hometeam, callback) {
  var url = urlHelper.getGameDepthChartUrl(week, awayteam, hometeam);
  createRequest(url, callback);
}

function getTeamDepthChart(team, callback) {
  var url = urlHelper.getTeamDepthChartUrl(team);
  createRequest(url, callback);
}

function getWeeklyLeagueLeaders(week, callback) {
  var url = urlHelper.getWeeklyLeagueLeadersUrl(week);
  createRequest(url, callback);
}

function getStandings(callback) {
  var url = urlHelper.getStandingsUrl();
  createRequest(url, callback);
}

function getSeasonalStats(team, callback) {
  var url = urlHelper.getSeasonalStatsUrl(team);
  createRequest(url, callback);
}

function createRequest(url, callback) {
  var begin_url = 'http://api.sportsdatallc.org/nfl-' + config.nfl.access_level + config.nfl.version + '/';
  var end_url = '.' + config.nfl.format + '?api_key=' + config.nfl.apikey;
  url = begin_url + url + end_url
  
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Parse the XML to JSON
      parser.parseString(body, function (err, result) {
        callback(err, result);
      });
    } else {
      callback(error, body);
    }
  });
}

module.exports = {
  init: function(access_level, version, apikey, year, season) {
    return init(access_level, version, apikey, year, season);
  },
  setRequest: function(reqObj) {
    request = reqObj;
  },
  getWeeklySchedule: function(week, callback) {
    return getWeeklySchedule(week, callback);
  },
  getSeasonSchedule: function(callback) {
    return getSeasonSchedule(callback);
  },
  getGameStats: function(week, awayteam, hometeam, callback) {
    return getGameStats(week, awayteam, hometeam, callback);
  },
  getGameSummary: function(week, awayteam, hometeam, callback) {
    return getGameSummary(week, awayteam, hometeam, callback);
  },
  getPlayByPlay: function(week, awayteam, hometeam, callback) {
    return getPlayByPlay(week, awayteam, hometeam, callback);
  },
  getPlaySummary: function(week, awayteam, hometeam, playid, callback) {
    return getPlaySummary(week, awayteam, hometeam, playid, callback);
  },
  getGameBoxscore: function(week, awayteam, hometeam, callback) {
    return getGameBoxscore(week, awayteam, hometeam, callback);
  },
  getExtendedBoxscore: function(week, awayteam, hometeam, callback) {
    return getExtendedBoxscore(week, awayteam, hometeam, callback);
  },
  getWeeklyBoxscore: function(week, callback) {
    return getWeeklyBoxscore(week, callback);
  },
  getGameRoster: function(week, awayteam, hometeam, callback) {
    return getGameRoster(week, awayteam, hometeam, callback);
  },
  getTeamHierarchy: function(callback) {
    return getTeamHierarchy(callback);
  },
  getTeamRoster: function(team, callback) {
    return getTeamRoster(team, callback);
  },
  getInjuries: function(week, awayteam, hometeam, callback) {
    return getInjuries(week, awayteam, hometeam, callback);
  },
  getGameDepthChart: function(week, awayteam, hometeam, callback) {
    return getGameDepthChart(week, awayteam, hometeam, callback);
  },
  getTeamDepthChart: function(team, callback) {
    return getTeamDepthChart(team, callback);
  },
  getWeeklyLeagueLeaders: function(week, callback) {
    return getWeeklyLeagueLeaders(week, callback);
  },
  getStandings: function(callback) {
    return getStandings(callback);
  },
  getSeasonalStats: function(team, callback) {
    return getSeasonalStats(team, callback);
  }
}