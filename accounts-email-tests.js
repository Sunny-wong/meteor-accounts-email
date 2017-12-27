// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by accounts-email.js.
import { name as packageName } from "meteor/xiangyang:accounts-email";

// Write your tests here!
// Here is an example.
Tinytest.add('accounts-email - example', function (test) {
  test.equal(packageName, "accounts-email");
});
