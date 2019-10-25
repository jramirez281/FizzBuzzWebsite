let i = 0;
function increment()
   {
   document.getElementById("IncrementValue").innerHTML = i++;
   if((i % 3 == 0) && (i % 5 == 0))
      {
      document.getElementById("IncrementValue").innerHTML = "FizzBuzz";
      }
   else if(i % 3 == 0)
      {
      document.getElementById("IncrementValue").innerHTML = "Fizz";
      }
   else if(i % 5 == 0)
      {
      document.getElementById("IncrementValue").innerHTML = "Buzz";
      } 
   else 
      {
      document.getElementById("IncrementValue").innerHTML = i;
      }
   }


