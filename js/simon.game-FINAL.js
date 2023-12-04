/* Simon is a game of short-term memory skill. 
The interface creates a series of tones and lights 
// and requires a user to repeat the sequence. 
*/

// 1. Get the buttons as a Node Array (querySelectorAll)
const buttons = document.querySelectorAll('button');

// 2. Get the h1, as that is for providing feedback (Game Over, etc.)
const h1 = document.querySelector('h1');

// 3. Declare a clicks variable w initial value of -1 
//   this is to keep track of total user clicks, which needs to
//   be incremented by 1 each time user clicks to match sequence
let clicks = -1;

// 4. Declare an array to hold the colors in the order they come up 
//    ['green', 'red', etc.]; this array needs to be reset to empty 
//    for each new game, so best use let, not const
let colorSequenceArr = []; 

// 6. Have the document listen for a keydown event and call a function when that occurs
// addEventListener has an inline anonymous callback that takes the event as its argument
// pressing a key is like pressing a New Game Button
document.addEventListener('keydown', evt => {

    // 7. Empty out the colorSequenceArr array for a new game
    colorSequenceArr = [];

    // 8. If this is not first game, clicks is not -1, so prompt user to play again
    if(clicks != -1) h1.textContent = "Press Any Key to Play Again..!";

    // 9. New game, so reset clicks to -1
    clicks = -1;

    // 10. Call the generateRandom() function, which generates a random color choice
    generateRandom();

});

// 11. Using forEach, iterate the Node List / array of button objects
buttons.forEach(e => {

    // 12. Have each button, as e, listen for a click and call an 
    // inline anonymous callback function when the click occurs
    e.addEventListener('click', () => {

        // 13. Increment clicks by 1
        clicks++;

        // 14. Each button has an id, which is assigned in the HTML
        //     id's are colors: id="green", id="red", etc.
        //     Check if the id of the clicked button matches the color
        //     stored in the colorSequenceArr at the corresponding index
        if(e.id == colorSequenceArr[clicks]) {

            // 15. If they match, the user clicked the correct button, so
            //     play the sound for that button... instantiate a new Audio 
            //     object and set it's source to be the corresponding color
            //     mp3. So if the button id="green", and "green" is in the
            //     colorSequenceArr at this click count index, then play "green.mp3"
            new Audio(`audio/${e.id}.mp3`).play();

            // 16. If this is the last click, we are at the end of the sequence:
            if(clicks == colorSequenceArr.length-1) {

                // 17. Encourage the player to keep going
                h1.textContent = `Keep Going! Correct Count: ${clicks+1}`;

                // 18. Call generateRandom() function once user is done clicking 
                //     through entire sequence
                generateRandom(); // add a new color to the sequence

            }

        // 19. Else user clicked the wrong button:
        } else {

            // 20. Play the WRONG ANSWER sound: "sat-on-the-cat.mp3"
            new Audio(`audio/sat-on-the-cat.mp3`).play();

            // 21. Say Game Over and tell use how many they got right before failing:
            h1.textContent = `Game Over! You got ${clicks} right.`;

        }
    });
});

// 22. Declare the generateRandom() function
function generateRandom() {

    // 23. do a setTimeout that takes 1 second to go; this is so there is a delay
    //     between the user finishing clicking the sequence and the new button flashing
    //     and playing the sound
    setTimeout(() => {

        // 24. Generate a random integer in the 0-3 range
        let r = Math.floor(Math.random() * 4);

        // 25. Set the opacity of the button at that random index in buttons array to 0
        buttons[r].style.opacity = "0";

        // 26. Do another setTimeOut inside that runs after 1/2 sec
        //     Restore the opacity to 1, so the button flashes (disappears) for 1/2 sec
        setTimeout(() => buttons[r].style.opacity = "1", 500);

        // 27. Play the audio for the random button by looking it up by r in colorSounds
        //     colorSounds[r] is "green.mp3", "red.mp3", etc.
        new Audio(`audio/${buttons[r].id}.mp3`).play();

        // 28. Push the id ("green", "red", etc.) of the new random button into 
        //     colorSequenceArr array
        colorSequenceArr.push(buttons[r].id);

        // 29. Reset clicks to -1 since the user will start clicking again
        clicks = -1;

        // 30. Output the colorSequenceArr for testing so you can see the answers 
        //     and click the correct color as many times as you want without failing
        console.log(colorSequenceArr); // sequence as array of colors

    }, 1000);
    
};

