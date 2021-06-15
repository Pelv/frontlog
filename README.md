# **frontlog**
Simple yet complex styled console.logs library. Just vanilla JS, no dependencies.

## Introduction
This library has been created for front-end devs and works smoothly with the inspector.
The other libraries i found online have too many features and most of them are made to be used with node.js. Instead, i wanted a library easy-to-use and easy-to-write that helps out front-end team catch only the needed console.log at the right time.
When a lot of people works on an application (i.e. a React App) there can be a lot of console.logs that comes from other components that doesn't help you debug.


#### **Features**:
- Tags for console.log (aka prefix) to easily catch where the log is coming from or to search / filter them;
- Multiple logs in one call;
- Easy to write console groups;
- Console types (ok, error, warn, info);
- General config, such as: tags filtering (allow only some tags), disable console logs (for production servers), console.group collapse when tot logs has to be sent.


## How to use
This library works without dependencies and can be used without init or stuff... It just works right out of the box


#### **Install**
```shell
npm install frontlog
```
or add the `index.js` file in your project and import it where you need it


#### **Usage**
First, you'll need to import it in your file/components etc:
```javascript
import log from 'frontlog'
```
then just use `log({...params}, {...overrideOnce})`.
Examples:
```javascript
// just the most basic usage, for fast logs
log('just a basic, boring, normal log')

// most common use
log({
  text: 'this is the message',
  variable: myExampleVar,
  tag: 'example'
})

// multiple log for multiple variables? No problem!
log({
  text: 'this is the message, it will be the same for every variable',
  variables: [myExampleVar1, myExampleVar2],
  tag: 'example'
})

// that's where the fun is
log([
  {
    text: 'first log',
    variable: myExampleVar1,
    tag: 'logArray'
  },
  {
    text: 'second log',
    variable: myExampleVar2,
    tag: 'logArray'
  }
])

// when that's not enough... groups! (with config override)
log({
  groupName: 'Group Example',
  group: [
    {
      text: 'first log of the group',
      variable: myExampleVar1,
      tag: 'logArray'
    },
    {
      text: 'second log of the group',
      variable: myExampleVar2,
      tag: 'logArray'
    }
  ]
},{
  collapseGroupLogs: 1
})
```
Those example produce the following output:
![Examples output!](/images/examples.png)


"Ok now... that looks a bit messy" :) don't worry, find below a more informations.


## Global config and log parameters
Let's start with the library global config:
```javascript
// default config
const config = {
  sendLogs: true,
  tagsToShow: [],
  collapseGroupLogs: 2 // specify after how many log a group should be collapsed
}
```
- **sendLogs**: boolean variable that specify if the library should send console.logs or not. Set false for production builds and no console logs will be delivered!
- **tagsToShow**: array of strings containing the Tags that are allowed to be printed. Leave empty to allow all tags.
- **collapseGroupLogs**: number that specify after how many logs the group should be collapsed by default

Any of this variable can be globally changed using the `changeLogConfig({...params})` function.
Here is an example:
```javascript
// this example comes from the index.js file of a React App i'm working on
if (configuration.environment === 'production') {
  changeLogConfig({
    sendLogs: false
  })
}
```
If you want to change it just for one log you can use ***optional*** parameter `overrideOnce`: it accept the same config variables and can be used to change the global settings just for that log.
I.E. let's say you want a log that will be always sent even in production, you can write the log as follow:
```javascript
log(
  {
    text: 'A truly important log',
    tag: 'always-visible'
  },
  {
    sendLogs: true
  }
)
```

Let's talk about the basic parameters of the log function. As mentioned in the example, the main parameters of the `log` function can be a String, an Array or an Object.

If is a string it will just send a normal console.log, If is an array will consider it as multiple logs if contains objects and the object is the default usage and can accept the following property (those are the same if you send an array of objects):
- **text**: String -> the message of the console.log
- **type**: String -> it accept `ok`, `warn`, `error`, `info` and will add a prefix after the tag with the color of the type; N.B. the library doesn't use console.warn and console.error.
- **variable**: Any -> the variable you want to attach to the console.log
- **variables**: Array -> an array of variables you want to log
- **tag**: String -> identifier of different console.logs; usually used to tag/categorise console.logs
- **group**: Array of objects -> similar to send an array of logs object but will be displayed in a console.group
- **groupName**: String -> the message/name used for the group. If no name is specified, the `tag` string will be used as a name (this tag property should be at the same level of group)


## Outro
That's all folks! :)
Please feel free to fork, request improvements, stars or whatever.

If you have any questions, find me on any social and messaging App (search for Pelv or Pelviero).