# **Assignment: Understanding `useState` and `useEffect` in React**

### **Objective:**
The objective of this assignment is to understand the concepts of React Hooks `useState` and `useEffect`. You will build a **Counter App** that demonstrates how to manage state in React and how to execute side effects (like logging to the console) when certain state changes.

### **Instructions:**

1. **Understanding `useState`:**
   - `useState` is a hook used to manage state in a functional component.
   - It returns an array with two values: the current state value and a function to update that state.

2. **Understanding `useEffect`:**
   - `useEffect` is a hook used to perform side effects in function components.
   - It can run after every render, or only when certain values change, depending on how you configure it.

### **Task: Build a Counter App with `useState` and `useEffect`:**

#### Steps to complete:

1. **Create a new component called `Counter.js`**:
   - In this component, you will use `useState` to manage the state of the counter (initially set to 0).
   - You will also use `useEffect` to log a message every time the counter value changes.

#### **Code Explanation:**

1. **`useState` for Counter:**
   - You will use `useState` to store and update the counter value.

2. **`useEffect` for Side Effects:**
   - You will use `useEffect` to log the counter value to the console every time the counter changes.

---

### **Code for `Counter.js`:**

```javascript
import React, { useState, useEffect } from 'react';

function Counter() {
  // Using useState to store the counter value
  const [count, setCount] = useState(0);

  // Using useEffect to log the counter value whenever it changes
  useEffect(() => {
    console.log(`The counter value is: ${count}`);
  }, [count]); // Dependency array ensures it runs only when 'count' changes

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Counter App</h1>
      <p>Current count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
