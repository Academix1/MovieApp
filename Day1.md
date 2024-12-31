### Declaration and Initailisation Test

```javascript
    var testVar = 1;
    var testVar = 2; // Re-declared successfully
    testVar = 3; // Updated successfully
    console.log(testVar); // Output: 3
    
    let testLet = 1;
    testLet = 2; // Updated successfully
    console.log(testLet); // Output: 2
    // let testLet = 3; // Error: Identifier 'testLet' has already been declared (Uncomment to test)
    
    const testConst = 1;
    // testConst = 2; // Error: Assignment to constant variable (Uncomment to test)
    console.log(testConst); // Output: 1
    
    // const testConst = 2; // Error: Identifier 'testConst' has already been declared (Uncomment to test)

```

### Scope of KeyWords

```javascript
      var city = "New York"; // Defined outside block
    {
      var city = "Los Angeles"; // Same variable is modified inside the block
      console.log(city); // Output: "Los Angeles" (var is function/global-scoped)
    }
    console.log(city); // Output: "Los Angeles" (var is function/global-scoped)


    let state = "California"; // Defined outside block
    {
      let state = "Texas"; // A new variable, scoped to this block
      console.log(state); // Output: "Texas"
    }
    console.log(state); // Output: "California" (let is block-scoped)


    const country = "USA"; // Defined outside block
    {
      const country = "Canada"; // A new variable, scoped to this block
      console.log(country); // Output: "Canada"
    }
    console.log(country); // Output: "USA" (const is block-scoped)

```
### Hoisting

```javascript
console.log(testVar); // Output: undefined
var testVar = "Hello, world!";
console.log(testVar); // Output: "Hello, world!"

console.log(testLet); // Error: Cannot access 'testLet' before initialization
let testLet = "Hello, world!";
console.log(testLet); // Output: "Hello, world!"

console.log(testConst); // Error: Cannot access 'testConst' before initialization
const testConst = "Hello, world!";
console.log(testConst); // Output: "Hello, world!"

```
