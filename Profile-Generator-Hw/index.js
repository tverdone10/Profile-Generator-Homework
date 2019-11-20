var inquirer = require("inquirer");
var fs = require("fs");
var generateHTML = require("./generateHTML");
var axios = require("axios");
var path = require("path")
var pdf = require("html-pdf")

const questions = [
  "What is your GitHub username",
  "What's your favorite color"
];

inquirer
  .prompt([
    {
      type: "input",
      name: "name",
      message: questions[0]
    },
    {
      type: "list",
      name: "color",
      choices: ["blue", "green", "red", "pink"],
      message: questions[1]
    }
  ])
  .then(function(data) {
    console.log(data.name);

    axios
      .get("https://api.github.com/users/" + data.name)
      .then(function(response) {
        console.log(response.data);
        // find the stars
        axios
          .get("https://api.github.com/users/" + data.name + "/repos")
          .then(function(repos) {
            console.log("--->", repos.data);
            var stars = 0;
            for (i = 0; i < repos.data.length; i++) {
              //console.log(repos.data[i].stargazers_count)
              stars = stars + repos.data[i].stargazers_count;
              // console.log(stars)
            }
            console.log(stars);
            // then you generate the html
            var color = data.color;
            var html =generateHTML({ color, stars, ...response.data })
            console.log(html)
            fs.writeFileSync(path.join(process.cwd(), "resume.html"), html);
            generatePDF(html)
          });
      });
  });


  function generatePDF(html){
  pdf.create(html).toFile("./resume.pdf", function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
}
  
// var filename =
//   data.name
//     .toLowerCase()
//     .split(" ")
//     .join("") + ".html";

// fs.writeFile(filename, JSON.stringify(data, null, "\t"), function(err) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log("Success!");
