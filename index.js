// CSS styling for different console.logs scenarios
const tagColor = 'background-color: #b501bf; color: #f7e4ff; font-weight: 500;'
const notagColor = 'background-color: #4c4c4c; color: #f2f2f2; font-weight: 500;'
const okColor = 'background-color: #05900b; color: #edf7ed; font-weight: 500;'
const infoColor = 'background-color: #0465b3; color: #e8f4fd; font-weight: 500;'
const warnColor = 'background-color: #ffcc10; color: #462900; font-weight: 500;'
const errorColor = 'background-color: #d21003; color: #fdecea; font-weight: 500;'

// Library default and initial configuration. Use the 'changeConfig' method
const config = {
  sendLogs: true, // boolean variable that specify if the library should send console.logs or not
  tagsToShow: [], // leave empty to allow all tags to be shown, array of tags that have to be printed
  collapseGroupLogs: 2 // specify after how many log a group should be collapsed
}

/**
 * FUNCTION THAT LET YOU CHANGE THE LIBRARY CONFIG
 * @param {object} params
 * it accepts the config variables
 */
export const changeLogConfig = ({ sendLogs = null, tagsToShow = null }) => {
  config.sendLogs = sendLogs && sendLogs !== config.sendLogs ? sendLogs : config.sendLogs
  config.tagsToShow = tagsToShow && Array.isArray(tagsToShow) ? tagsToShow : config.tagsToShow
  if (!sendLogs) {
    console.log('No logs will be sent. Best of luck :)')
  }
}

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
const log = async (params, overrideOnce) => {
  // check if i should send console.logs
  if (config.sendLogs || (overrideOnce && overrideOnce.sendLogs)) {
    if (!params) {
      // empty params, send empty log
      console.log()
    } else if (typeof params === 'string') {
      // params is just a string, send a classic console log
      console.log(params)
    } else if (Array.isArray(params)) {
      // array of console logs to be sent
      params.forEach(param => log(param))
    } else {
      // ONE CONSOLE LOG
      const { text, variable, variables, tag, type, group, groupName } = params
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
        // no given tag, if the are tags restrictions this log is not allow
        if (config.tagsToShow.length > 0) {
          thisTagIsAllowed = false
        }
      }
      // if tag is allowed i'll send the console log
      if (thisTagIsAllowed) {
        if (group && Array.isArray(group)) {
          const thisName = groupName || (tag || 'GRUPPO')
          const refNum = overrideOnce && overrideOnce.collapseGroupLogs ? overrideOnce.collapseGroupLogs : config.collapseGroupLogs
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
          const thisColors = !type ? null : type === 'ok' ? okColor : type === 'info' ? infoColor : type === 'warn' ? warnColor : type === 'error' ? errorColor : null
          const thisVariable = Object.keys(params).indexOf('variable') > -1 ? variable : ''
          const variablesArray = Object.keys(params).indexOf('variables') > -1 ? [...variables] : [thisVariable]
          // check whatever is a coloured console or not
          if (thisColors) {
            variablesArray.forEach(variable => {
              console.log(
                `%c ${tag ? tag.toUpperCase() : '-'} %c ${type ? type.toUpperCase() : '-'} %c ${finalText}`,
                tag ? tagColor : notagColor,
                thisColors,
                '',
                variable
              )
            })
          } else {
            variablesArray.forEach(variable => {
              console.log(
                `%c ${tag ? tag.toUpperCase() : '-'} %c ${finalText}`,
                tag ? tagColor : notagColor,
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
