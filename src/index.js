// @ts-nocheck
// CSS styling for different console.logs scenarios
// tag style
const tagStyles = {
  red: 'background-color: #d21003; color: #fdecea; font-weight: 500;',
  yellow: 'background-color: #ffcc10; color: #462900; font-weight: 500;',
  blue: 'background-color: #0465b3; color: #e8f4fd; font-weight: 500;',
  green: 'background-color: #05900b; color: #edf7ed; font-weight: 500;',
  notag: 'background-color: #4c4c4c; color: #f2f2f2; font-weight: 500;',
  default: 'background-color: #b501bf; color: #f7e4ff; font-weight: 500;'
}
// special console.log styles
const typeStyles = {
  success: 'background-color: #05900b; color: #edf7ed; font-weight: 500;',
  info: 'background-color: #0465b3; color: #e8f4fd; font-weight: 500;',
  warn: 'background-color: #ffcc10; color: #462900; font-weight: 500;',
  error: 'background-color: #d21003; color: #fdecea; font-weight: 500;'
}
/**
 * Library default and initial configuration. Use the 'changeLogConfig' method to change this settings
 * keys are:
 * - tagColor {String} -> variable that specify which color scheme to use for tags, it accepts: 'red', 'yellow', 'blue', 'green'
 * - sendLogs {Boolean} -> variable that specify if the library should send logs to the console or hide them,  default: true
 * - tagsToShow {Array} -> variable that specify which tags should be shown in the console, leave empty and all tags will be shown
 * - collapseGroupLogs {Number} -> variable that specify after how many log a group should be collapsed, default: 2
 */
export const config = {
  tagColor: 'default',
  sendLogs: true,
  tagsToShow: [],
  collapseGroupLogs: 2
}

/**
 * FUNCTION THAT LET YOU CHANGE THE LIBRARY CONFIG
 * @param {Object} newConfig object with the new config
 * Accepted keys are:
 * - tagColor {String} -> variable that specify which color scheme to use for tags, it accepts: 'red', 'yellow', 'blue', 'green'
 * - sendLogs {Boolean} -> variable that specify if the library should send logs to the console or hide them,  default: true
 * - tagsToShow {Array} -> variable that specify which tags should be shown in the console, leave empty and all tags will be shown
 * - collapseGroupLogs {Number} -> variable that specify after how many log a group should be collapsed, default: 2
 */
export const changeLogConfig = (newConfig) => {
  // sendLogs
  if (newConfig?.sendLogs != null) {
    if (typeof newConfig?.sendLogs === 'boolean') {
      // sendLogs exists and is a boolean
      config.sendLogs = Boolean(newConfig?.sendLogs)
    } else {
      // if sendLogs is not a boolean value, send a warning to the console
      console.warn('new sendLogs value is not a boolean, it will be ignored')
    }
    // if sendLogs is false, send a log to confim it
    if (newConfig?.sendLogs === false) console.log('No logs will be sent. Best of luck :)')
  }

  // tagsToShow
  if (newConfig?.tagsToShow) {
    if (Array.isArray(newConfig?.tagsToShow)) {
      // sendLogs exists and is an array
      config.tagsToShow = newConfig?.tagsToShow
    } else {
      // if tagsToShow is not an array value, send a warning to the console
      console.warn('new tagsToShow value is not an array, it will be ignored')
    }
  }

  // tagColor
  if (newConfig?.tagColor) {
    if (typeof newConfig?.tagColor === 'string') {
      if (Object.keys(tagStyles).includes(newConfig?.tagColor)) {
        // tagColor exists and is a string
        config.tagColor = newConfig?.tagColor
      } else {
        // the specified tagColor is not a valid one, send a warning to the console
        console.warn('new tagColor value is not a valid one (red, yellow, blue, green), it will be ignored')
      }
    } else {
      // if tagColor is not a string value, send a warning to the console
      console.warn('new tagColor value is not a string, it will be ignored')
    }
  }

  // collapseGroupLogs
  if (newConfig?.collapseGroupLogs) {
    if (typeof newConfig?.collapseGroupLogs === 'number') {
      // collapseGroupLogs exists and is a number
      config.collapseGroupLogs = newConfig?.collapseGroupLogs
    } else {
      // if collapseGroupLogs is not a number value, send a warning to the console
      console.warn('new collapseGroupLogs value is not a number, it will be ignored')
    }
  }
}

/**
 * MAIN LOGGING FUNCTION
 * @param {*} params string, object or array of objects
 * - when params is a string a classic console.log will be printed
 * - when params is an array of objects multiple console.logs made with frontlog will be printed (see next description for obj keys)
 * - when params is an object (default usage) it will accept the following keys
 *   - text: is the message that will be displayed
 *   - variable: the variable to be printed
 *   - variables: array of variables to be printed in sequence
 *   - tag: the tag of the console.log (prefix)
 *   - type: the type of console log; it's support info, warn, error, ok
 *   - group: array of console.logs that will be printed in a group
 *   - groupName: optional name for the group of console.log
 * @param {*} overrideConfigOnce one time use of the config object
 * optional object that enables you to override the saved config (it has the same structure)
 * i.e. if you want a console log that should always be sent, even if config.sendLogs is false, you can use this optional param as follow:
 * overrideConfigOnce = { sendLogs: true, collapseGroupLogs: 4 }
 * Accepted keys are:
 * - tagColor {String} -> variable that specify which color scheme to use for tags, it accepts: 'red', 'yellow', 'blue', 'green'
 * - sendLogs {Boolean} -> variable that specify if the library should send logs to the console or hide them,  default: true
 * - collapseGroupLogs {Number} -> variable that specify after how many log a group should be collapsed, default: 2
 */
const log = (params = null, overrideConfigOnce = null) => {
  // check if i should send console.logs
  let shouldISendLogs = config.sendLogs
  if (overrideConfigOnce?.sendLogs != null) shouldISendLogs = overrideConfigOnce?.sendLogs
  if (shouldISendLogs) {
    if (params == null) {
      // empty params, send empty log
      console.log('Empty params passed to frontlog. Are you sure you want this?')
    } else if (typeof params === 'string') {
      // params is just a string, send a classic console log
      console.log(params)
    } else if (Array.isArray(params)) {
      // array of console logs to be sent
      params.forEach(param => log(param))
    } else {
      // ONE CONSOLE LOG WITH OBJECT PARAMS
      const { text, variable, variables, tag, type, group, groupName } = params

      let thisTagStyles = tagStyles[config.tagColor]
      // check if tag is specified
      if (!tag) {
        thisTagStyles = tagStyles.notag
      } else if (overrideConfigOnce?.tagColor && Object.keys(tagStyles).includes(overrideConfigOnce?.tagColor)) {
        // check if overrideConfigOnce has a tagColor specified
        thisTagStyles = tagStyles[overrideConfigOnce.tagColor]
      }

      // checking if there is a tag and if this tag is allowed in the config
      let thisTagIsAllowed = true
      if (tag) {
        // there is a tag, let's check if is allowed
        if (config.tagsToShow.length === 0) {
          thisTagIsAllowed = true
        } else {
          const thisIndex = config.tagsToShow.indexOf(tag)
          thisTagIsAllowed = thisIndex && thisIndex > -1
        }
      } else {
        // no given tag, if the are tags restrictions this log is not allowed
        if (config.tagsToShow.length > 0) {
          thisTagIsAllowed = false
        }
      }

      // if tag is allowed i'll send the console log
      if (thisTagIsAllowed) {
        if (group && Array.isArray(group)) {
          const thisName = groupName || tag || 'GRUPPO'
          const refNum = overrideConfigOnce?.collapseGroupLogs ? overrideConfigOnce.collapseGroupLogs : config.collapseGroupLogs
          if (group.length > refNum) {
            console.groupCollapsed(thisName)
          } else {
            console.group(thisName)
          }
          group.forEach(g => log(g))
          console.groupEnd()
        } else {
          let finalText = ''
          if (text) {
            finalText = String(text)
          }
          // now get the console log details that i need to sent
          let thisTypedColors = null
          if (type) {
            thisTypedColors = typeStyles?.[type]
          }
          const thisVariable = Object.keys(params).includes('variable') ? variable : ''
          const variablesArray = Object.keys(params).includes('variables') ? [...variables] : [thisVariable]
          // check whatever is a coloured console or not
          if (thisTypedColors) {
            variablesArray.forEach(variable => {
              console.log(
                // `%c ${tag ? tag.toUpperCase() : '-'} %c ${type ? type.toUpperCase() : '-'} %c ${finalText}`,
                `%c ${type ? type.toUpperCase() : '-'} - ${tag ? tag.toUpperCase() : '-'} %c ${finalText}`,
                thisTypedColors,
                // thisTypedColors,
                '',
                variable
              )
            })
          } else {
            variablesArray.forEach(variable => {
              console.log(
                `%c ${tag ? tag.toUpperCase() : '-'} %c ${finalText}`,
                thisTagStyles,
                '',
                variable
              )
            })
          }
        }
      }
    }
  }
}

export default log
