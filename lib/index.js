'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// CSS styling for different console.logs scenarios
var tagColor = 'background-color: #b501bf; color: #f7e4ff; font-weight: 500;';
var notagColor = 'background-color: #4c4c4c; color: #f2f2f2; font-weight: 500;';
var okColor = 'background-color: #05900b; color: #edf7ed; font-weight: 500;';
var infoColor = 'background-color: #0465b3; color: #e8f4fd; font-weight: 500;';
var warnColor = 'background-color: #ffcc10; color: #462900; font-weight: 500;';
var errorColor = 'background-color: #d21003; color: #fdecea; font-weight: 500;';

// Library default and initial configuration. Use the 'changeConfig' method
var config = exports.config = {
  sendLogs: true, // boolean variable that specify if the library should send console.logs or not
  tagsToShow: [], // leave empty to allow all tags to be shown, array of tags that have to be printed
  collapseGroupLogs: 2 // specify after how many log a group should be collapsed


  /**
   * FUNCTION THAT LET YOU CHANGE THE LIBRARY CONFIG
   * @param {object} params
   * it accepts the config variables
   */
};var changeLogConfig = exports.changeLogConfig = function changeLogConfig(_ref) {
  var _ref$sendLogs = _ref.sendLogs,
      sendLogs = _ref$sendLogs === undefined ? null : _ref$sendLogs,
      _ref$tagsToShow = _ref.tagsToShow,
      tagsToShow = _ref$tagsToShow === undefined ? null : _ref$tagsToShow;

  if (sendLogs != null) config.sendLogs = sendLogs;
  if (tagsToShow) config.tagsToShow = tagsToShow && Array.isArray(tagsToShow) ? tagsToShow : config.tagsToShow;
  // if sendLogs is false, send a log
  if (sendLogs === false) {
    console.log('No logs will be sent. Best of luck :)');
  }
};

/**
 * MAIN LOGGING FUNCTION
 * @param {*} params string, object or array of objects
 * - when params is a string a classic console.log will be printed
 * - when params is an array of objects multiple console.logs made with frontlog will be printed
 * - when params is an object (default usage) it will accept the following variables
 *   - text: is the message that will be displayed
 *   - variable: the variable to be printed
 *   - variables: array of variables to be printed
 *   - tag: the tag of the console.log (prefix)
 *   - type: the type of console log; it's support info, warn, error, ok
 *   - group: array of console.logs that will be printed in a group
 *   - groupName: optional name for the group of console.log
 * @param {*} overrideOnce config object
 * optional object that enables you to override the saved config (it has the same structure)
 * i.e. if you want a console log that should always be sent, even if config.sendLogs is false, you can use this optional param as follow:
 * overrideOnce = { sendLogs: true, collapseGroupLogs: 4 }
 * N.B. tagsToShow can't be edited once
 */
var log = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(params, overrideOnce) {
    var text, variable, variables, tag, type, group, groupName, thisTagIsAllowed, thisIndex, thisName, refNum, finalText, thisColors, thisVariable, variablesArray;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // check if i should send console.logs
            if (config.sendLogs || overrideOnce && overrideOnce.sendLogs) {
              if (!params) {
                // empty params, send empty log
                console.log();
              } else if (typeof params === 'string') {
                // params is just a string, send a classic console log
                console.log(params);
              } else if (Array.isArray(params)) {
                // array of console logs to be sent
                params.forEach(function (param) {
                  return log(param);
                });
              } else {
                // ONE CONSOLE LOG
                text = params.text, variable = params.variable, variables = params.variables, tag = params.tag, type = params.type, group = params.group, groupName = params.groupName;
                // checking if there is a tag and if this tag is allowed in the config

                thisTagIsAllowed = true;

                if (tag) {
                  // there is a tag, let's check if is allowed
                  if (config.tagsToShow.length === 0) {
                    thisTagIsAllowed = true;
                  } else {
                    thisIndex = config.tagsToShow.indexOf(tag);

                    thisTagIsAllowed = thisIndex && thisIndex > -1;
                  }
                } else {
                  // no given tag, if the are tags restrictions this log is not allow
                  if (config.tagsToShow.length > 0) {
                    thisTagIsAllowed = false;
                  }
                }
                // if tag is allowed i'll send the console log
                if (thisTagIsAllowed) {
                  if (group && Array.isArray(group)) {
                    thisName = groupName || tag || 'GRUPPO';
                    refNum = overrideOnce && overrideOnce.collapseGroupLogs ? overrideOnce.collapseGroupLogs : config.collapseGroupLogs;

                    if (group.length > refNum) {
                      console.groupCollapsed(thisName);
                    } else {
                      console.group(thisName);
                    }
                    group.forEach(function (g) {
                      return log(g);
                    });
                    console.groupEnd();
                  } else {
                    finalText = '';

                    if (text) {
                      finalText = String(text);
                    }
                    // now get the console log details that i need to sent
                    thisColors = !type ? null : type === 'ok' ? okColor : type === 'info' ? infoColor : type === 'warn' ? warnColor : type === 'error' ? errorColor : null;
                    thisVariable = Object.keys(params).indexOf('variable') > -1 ? variable : '';
                    variablesArray = Object.keys(params).indexOf('variables') > -1 ? [].concat(_toConsumableArray(variables)) : [thisVariable];
                    // check whatever is a coloured console or not

                    if (thisColors) {
                      variablesArray.forEach(function (variable) {
                        console.log('%c ' + (tag ? tag.toUpperCase() : '-') + ' %c ' + (type ? type.toUpperCase() : '-') + ' %c ' + finalText, tag ? tagColor : notagColor, thisColors, '', variable);
                      });
                    } else {
                      variablesArray.forEach(function (variable) {
                        console.log('%c ' + (tag ? tag.toUpperCase() : '-') + ' %c ' + finalText, tag ? tagColor : notagColor, '', variable);
                      });
                    }
                  }
                }
              }
            }

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function log(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
exports.default = log;