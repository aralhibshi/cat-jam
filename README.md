# Random Name Generator

## About
*A basic random name generator made with HTML, CSS, JavaScript, and jQuery.*
- This project was made using the basic fundementals of coding (HTML, CSS, and JavaScript) so beginner students can understand the code. The application will simply decide which student will present their end of unit project (Unit 1 - Project 1) by selecting a random name from the `LocalStorage` once the game is "won".
- The project also covers everything which was taught thoughout Unit 1 of the Software Engineering Immersive Course at General Assembly. I plan to follow this approach with every unit which will be covered in General Assembly, eventually creating a MERN Stack application as the final project (Unit 4 - Project 4).

---

## Controls

- Move Left - `Left Arrow` or `A`
- Move Up - `Up Arrow` or `W`
- Move Right - `Right Arrow` or `D`
- Move Down - `Down Arrow` or `S`

---

## Objective

- The Goal of the game is to move to highlighted box. Enemies are randomly generated to act a barricades.

---

## Features

- `New Game` - Resets the `LocalStorage` item back to the full array which contains all students.
- `Continue Game` - Continues playing the game with the current `LocalStorage` item
- `Menu` - Simply refreshes the page to take you back to the "menu"
- `Skip` - Goes back to the menu, does not remove student name from `LocalStorage`
- `Continue` - Removes student name from `LocalStorage` and goes back to the menu

---

## Bugs and Improvements
- Some expected bugs which need to be fixed, I'll continue working on this project until Thursday (End of Unit 1 at General Assembly).
- Overall, the code is a bit messy and not very optimized because this project started out as an experiment with jQuery but then turned into something a bit more useful.
- A heatlh system could be added in the future, each enemy will reduce the player's health based on the enemy type.