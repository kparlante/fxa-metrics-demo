#!/usr/bin/env node

"use strict";

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client();

var flows = {
  "CreateAccount":["account_create", "account_login", "account_status_verified", "certificate_sign"],
  "AttachDevice":["account_login", "account_status_verified", "certificate_sign" ]
};

var services = ["Sync", "Marketplace"];
var devices = ["Android", "Desktop"];
var locales = ["en", "es", "pt-BR"];

function pickRandom(items) {
  return items[Math.floor(Math.random()*items.length)]; // evenly distributed for now
}

function generateFlow(flowName, flowEvents, service, device, locale, timestamp) {
  var eventTime = timestamp;
  
  flowEvents.every(function(eventName) {
    client.index({
      index: 'metrics',
      type: 'event',
      body: {
        "eventName": eventName,
        "timestamp": eventTime,
        "service": service,
        "flow": flowName,
        "device": device,
        "locale": locale
      }
    }, function (err, resp) {
      if (err) {
        console.log("Error: " + err);
      } else {
        console.log("Inserted event");
      }
    });
    eventTime = eventTime + Math.floor(Math.random()*110000) + 10000; // add 10 seconds to 2 minutes 
    return (Math.random() > .1); // 10% of the time, stop at this event
  });
}

function generateData() {
  for (var i=0; i<100; i++) {
    var flowName = "AttachDevice";
    if (i % 5 == 0) flowName = "CreateAccount";
    generateFlow(flowName, flows[flowName], 
    pickRandom(services),
    pickRandom(devices),
    pickRandom(locales),
    Date.now() + Math.floor(Math.random()*604800000)); // pick a time in the next week
  }
}

console.log("Generating data, populating elasticsearch db...");
generateData();
console.log("Finished inserting data");

  
