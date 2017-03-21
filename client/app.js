$(document).ready(function(){
  const apiURL = `https://api.github.com/users/`;
  var name;

  //Click Handler for submit button. Stores value in input field and calls getGit function
  $('#submit').click(function(event) {
    event.preventDefault();
    name = $('#username').val();
    //Resets Table Body
    $('.repos tbody').remove();
    getGit();
  });

  //Sends get to /repos route
  $('.top-repos').click(function(event) {
    event.preventDefault();
    //Resets Table Body
    $('.repos tbody').remove();
    $.get('/repos')
    .done(function(data, status) {
      data.forEach(function(items) {
        appendToTable(items['userName'], items['repoName'], items['stargazers']);
      });
    })
  });

  //Appends to Table
  var appendToTable = function(name, repo, stargazers) {
    $('.repos').append(
       `
       <tbody>
        <tr>
          <td><a href=https://github.com/${name}/${repo}>${repo}</a></td>
          <td><a href=https://github.com/${name}>${name}</a></td>
          <td>${stargazers}</td>
        </tr>
      </tbody>`
      )
  }

  //Sends GET request to API for userName. If succcessful, will send GET to userName/repo for
  //repos and stargazers_count
  var getGit = function() {
    $.get(apiURL + name)
      .done(function(data, status) {
        $.get(apiURL + name + '/repos')
        .done(function(data, status) {
          data.forEach(function(items) {
            postGit(name, items['name'], items['stargazers_count']);
            appendToTable(name, items['name'], items['stargazers_count']);
          });
        });
    }).fail(function() {
      alert('User Not Found!');
    });
  };

  //Send POST request to backend /repos/import route.
  var postGit = function(name, repo, stargazers) {
    $.post('/repos/import', {userName: name,
      repoName: repo,
      stargazers: stargazers});
  }
});