# Objects and Object Destructure

```javascript
// Creating an object using object literal syntax
let person = {
  name: "John",
  age: 30,
  occupation: "Developer",
  greet: function() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

console.log(person.name);  // Output: John
console.log(person.age);   // Output: 30
console.log(person.occupation); // Output: Developer

person.greet(); // Output: Hello, my name is John

```

```javascript
  // Creating an object using the `new Object()` syntax
let car = new Object();
car.brand = "Toyota";
car.model = "Camry";
car.year = 2022;

console.log(car.brand); // Output: Toyota
console.log(car.model); // Output: Camry
console.log(car.year);  // Output: 2022
```

```javascript
let person = {
  name: "Alice",
  age: 25,
  job: "Engineer"
};

// Destructuring the object into variables
let { name, age, job } = person;

console.log(name); // Output: Alice
console.log(age);  // Output: 25
console.log(job);  // Output: Engineer
```

```javascript
let person = {
  name: "Bob",
  age: 40,
  job: "Teacher"
};

// Renaming during destructuring
let { name: fullName, age: yearsOld, job: occupation } = person;

console.log(fullName);   // Output: Bob
console.log(yearsOld);   // Output: 40
console.log(occupation); // Output: Teacher

```

```javascript
let person = {
  name: "Charlie",
  job: "Designer"
};

// Destructuring with a default value
let { name, age = 30, job } = person;

console.log(name);  // Output: Charlie
console.log(age);   // Output: 30 (default value, because `age` is not in the object)
console.log(job);   // Output: Designer
```

```javascript
let user = {
  id: 101,
  personalInfo: {
    name: "David",
    age: 28
  },
  address: {
    street: "123 Main St",
    city: "New York"
  }
};

// Destructuring nested objects
let { id, personalInfo: { name, age }, address: { street, city } } = user;

console.log(id);         // Output: 101
console.log(name);       // Output: David
console.log(age);        // Output: 28
console.log(street);     // Output: 123 Main St
console.log(city);       // Output: New York
```

```javascript
let person = {
  name: "Eve",
  age: 35,
  job: "Architect",
  city: "Los Angeles"
};

// Destructuring with rest to collect remaining properties
let { name, age, ...otherDetails } = person;

console.log(name);          // Output: Eve
console.log(age);           // Output: 35
console.log(otherDetails);  // Output: { job: "Architect", city: "Los Angeles" }
```
