const login = document.querySelector('button');

//making functions to shorten the code later on
function createWelcome(nameValue) {
  let welcome = document.createElement('h1');
  welcome.textContent = 'Welcome' + ' ' + nameValue;
  document.getElementById('root').appendChild(welcome);
}

function createPValue() {
  let pValue = document.createElement('p');
  pValue.textContent = 'Current FizzBuzz Value:';
  document.getElementById('root').appendChild(pValue);
}

function createIncrementValue(iValue) {
  let incrementValue = document.createElement('p');

  //perform the fizzbuzz test on the user's score from the last session
  if (iValue == 0)
    iValue = 0;
  else if (iValue % 3 == 0 && iValue % 5 == 0)
    iValue = 'FizzBuzz';
  else if (iValue % 3 == 0)
    iValue = 'Fizz';
  else if (iValue % 5 == 0)
    iValue = 'Buzz';
  else 
    iValue = iValue;
  incrementValue.textContent = iValue;
  incrementValue.id = 'incrementValue';
  document.getElementById('root').appendChild(incrementValue);
}

function createFizzBuzz() {
  let fizzBuzz = document.createElement('button')
  fizzBuzz.textContent = 'Click to Increment';
  fizzBuzz.id = 'fizzBuzz';
  document.getElementById('root').appendChild(fizzBuzz);
}

function get(url) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
      resolve({ status: http.status, data: JSON.parse(http.response) });
    };
    http.open("GET", url);
    http.send();
  });
}

function post(url, data) {
  data = JSON.stringify(data);
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    http.onload = function() {
      resolve({ status: http.status, data: JSON.parse(http.response) });
    };
    http.open("POST", url);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(data);
  });
}

//This is what the login button will do after being clicked
login.addEventListener('click', () => {
  //grabbing the inputted username for reference
  let user = document.getElementById('Username').value;

  // Test whether or not the user has inputted a username
  //The user should not be able to press the button unless a username is entered
  if (user.replace(/^\s*/, "").replace(/\s*$/, "").length == 0) {
    document.getElementById('nullUsername').innerHTML = 'Please enter a username.';
  }
  
  else {
    login.disabled = true;

    createWelcome(user);

    createPValue();

    //invokes the get() function, using the inputted username
    //the 
    get('http://basic-web.dev.avc.web.usf.edu/' + user).then(function(http) {
      if (http.status == 200) {
        const username = http.data.id;
        const score = http.data.score;
        console.log(score);

        //displays the user's score from last session
        createIncrementValue(score);

        createFizzBuzz();

        let i = score;

        //what the 'Click to Increment' button will do when clicked
        document.getElementById('fizzBuzz').addEventListener('click', () => {
          document.getElementById('incrementValue').innerHTML = i++;
          const dataToSend = { score: i };
          console.log(dataToSend);

          //user's score is sent to the server after each click
          post('http://basic-web.dev.avc.web.usf.edu/' + user, dataToSend);

          if((i % 3 == 0) && (i % 5 == 0))
            {
              document.getElementById('incrementValue').innerHTML = 'FizzBuzz';
            }
          else if(i % 3 == 0)
            {
              document.getElementById('incrementValue').innerHTML = 'Fizz';
            }
          else if(i % 5 == 0)
            {
              document.getElementById('incrementValue').innerHTML = 'Buzz';
            } 
          else 
            {
              document.getElementById('incrementValue').innerHTML = i;
            }
        });
      }
      else {
        //add a new user
        post('http://basic-web.dev.avc.web.usf.edu/' + user, { score: 0 });

        createIncrementValue(0);

        createFizzBuzz();
        let i = 0;
        document.getElementById('fizzBuzz').addEventListener('click', () => {
          document.getElementById('incrementValue').innerHTML = i++;
          const dataToSend = { score: i };
          console.log(dataToSend);

          post('http://basic-web.dev.avc.web.usf.edu/' + user, dataToSend);

          if((i % 3 == 0) && (i % 5 == 0))
            {
              document.getElementById('incrementValue').innerHTML = 'FizzBuzz';
            }
          else if(i % 3 == 0)
            {
              document.getElementById('incrementValue').innerHTML = 'Fizz';
            }
          else if(i % 5 == 0)
            {
              document.getElementById('incrementValue').innerHTML = 'Buzz';
            } 
          else 
            {
              document.getElementById('incrementValue').innerHTML = i;
            }
        });
      }
    });
  }
});
