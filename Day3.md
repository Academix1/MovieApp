# Conditions Loops and Arrays

### Conditional Statements

#### If

```javascript
  let age = 18;
  if (age >= 18) {
      console.log("You are an adult.");
  }
```

#### If-else 

```javascript
if (condition) {
    // Code to execute if condition is true
} else {
    // Code to execute if condition is false
}
```

#### If,elseif,else Blocks

```javascript
let score = 85;
if (score >= 90) {
    console.log("Grade: A");
} else if (score >= 75) {
    console.log("Grade: B");
} else {
    console.log("Grade: C");
}
```

#### Switch 

```javascript
let day = 3;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Invalid day");
}
```

### Loops

#### For Loop

```javascript
  for (let i = 0; i < 5; i++) {
      console.log(i);
  }
```

#### While loop

```javascript
let i = 0;
while (i < 5) {
    console.log(i);
    i++;
}
```
#### do-while loop

```javascript
let i = 0;
do {
    console.log(i);
    i++;
} while (i < 5);
```

#### for-in Loop

```javascript
 let colors = ["red", "green", "blue"];

for (let index in colors) {
    console.log(colors[index]);
}
```

#### for-of Loop

```javascript
  let colors = ["red", "green", "blue"];
  for (let color of colors) {
      console.log(color);
  }
```

#### Arrays

```javascript// 1. Initial Array
let colors = ["red", "green", "blue"];

// 2. Printing an element from the array
console.log("First color:", colors[0]);
console.log("Second color:", colors[1]);

// 3. Adding an element to the end (using push)
colors.push("yellow");
console.log("After push:", colors);

// 4. Removing the last element (using pop)
let removedColor = colors.pop();
console.log("After pop:", colors);
console.log("Removed color:", removedColor);

// 5. Adding an element to the beginning (using unshift)
colors.unshift("orange");
console.log("After unshift:", colors);

// 6. Removing the first element (using shift)
let shiftedColor = colors.shift();
console.log("After shift:", colors);
console.log("Shifted color:", shiftedColor);

// 7. Accessing an element by index
let secondColor = colors[1];
console.log("Second color:", secondColor);

// 8. Modifying an element by index
colors[1] = "purple";
console.log("After modification:", colors);

// 9. Iterating over an array (using for loop)
console.log("Array elements using for loop:");
for (let i = 0; i < colors.length; i++) {
    console.log(colors[i]);
}

// 10. Iterating over an array (using forEach method)
console.log("Array elements using forEach:");
colors.forEach((color) => {
    console.log(color);
});


```

