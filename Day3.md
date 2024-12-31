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
  let person = { name: "Alice", age: 25 };
  for (let key in person) {
      console.log(key + ": " + person[key]);
  }
```

#### for-of Loop

```javascript
  let colors = ["red", "green", "blue"];
  for (let color of colors) {
      console.log(color);
  }


