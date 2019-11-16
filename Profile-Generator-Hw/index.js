var inquirer = require("inquirer");
var fs = require('fs');

inquirer.prompt([
  {
    type: "input",
    name: "name",
    message: "What is your GitHub Profile?"
  },
  {
    type: "input",
    name: "name2",
    message: "What is your name?"
  },
  {
    type: "input",
    name: "name3",
    message: "What is your pet?"
  },


]).then(function(data) {

  var filename = data.name.toLowerCase().split(' ').join('') + ".html";

  fs.writeFile(filename, JSON.stringify(data, null, '\t'), function(err) {

    if (err) {
      return console.log(err);
    }

    console.log("Success!");

  });
});
