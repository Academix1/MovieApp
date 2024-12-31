
### DataTypes

Primmitive
```javascript
let num = 42;           // Number
let name = "Alice";     // String
let isActive = true;    // Boolean
let value;              // Undefined
let nothing = null;     // Null
let unique = Symbol();  // Symbol
let bigNumber = 123n;   // BigInt
```

- Non-Primitive
```javascript
let person = { name: "Alice", age: 25 };  // Object
let colors = ["red", "blue", "green"];    // Array
```

### Operators

#### Arithmetic Operators

```javascript
let x = 5, y = 2;
console.log(x / y);  
console.log(x % y);
console.log(x*y);
console.log(x**y);
```
#### Assignment Operators

```javascript
let a = 10;
a %= 5;  
console.log(a);


let b = 15;
a /= 5;  
console.log(a);
```
#### Comparision Operators

```javascript
console.log(5 == "5");  
console.log(5 === "5");

a=34
b=45
# Assign the added value of a and b to c
 ```
#### Logical Operators

```javascript
let x = true, y = false;
console.log(x && y);  // false
console.log(x || y);  // true
console.log(!x);      // false
```
#### Ternary Operators

```javascript
let age = 18;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status); 
```

#### Type Operators

```javascript
console.log(typeof 42);         // "number"
console.log([] instanceof Array); // true
```
