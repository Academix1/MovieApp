# 2-Week Schedule: React and Redux (3 Days per Week)

---

## **Week 1: React Basics and Advanced Features**

### **Day 1 (Monday): React Setup and Fundamentals**
- **Topics to Cover**:
  - Install Node.js and set up a React app using `create-react-app`.
  - Introduction to **JSX** (JavaScript XML).
  - Learn about **Components** (functional and class-based).
  - **Props**: Passing data between components.
- **Practice**:
  - Create a simple "Hello, World!" app with a **functional component**.
- **Assignment**:
  1. Set up a React app and structure the project.
  2. Create a `Greeting` component that takes a `name` prop and displays "Hello, [name]!".

---

### **Day 2 (Wednesday): State and Events**
- **Topics to Cover**:
  - **`useState`** hook: Managing state in React components.
  - Handling **events** (e.g., button clicks, form inputs).
- **Practice**:
  - Build a **counter app** to practice state management and event handling.
- **Assignment**:
  1. Build a simple counter app with buttons for **increment**, **decrement**, and **reset**.
  2. Display the current count value.

---

### **Day 3 (Friday): Component Lifecycle and Effects**
- **Topics to Cover**:
  - Understand React's **component lifecycle** (for knowledge only; hooks simplify this).
  - **`useEffect`** hook for side effects (e.g., API calls, subscriptions).
- **Practice**:
  - Build a **to-do list app** to practice state, effects, and events.
- **Assignment**:
  1. Build a to-do list app with the following features:
     - Add, delete, and mark tasks as completed.
     - Persist tasks in **local storage**.

---

## **Week 2: Advanced React and Introduction to Redux**

---

### **Day 4 (Monday): React Router**
- **Topics to Cover**:
  - Install and use **react-router-dom**.
  - Learn to:
    - Set up routes for multiple pages (e.g., **Home**, **About**, **Contact**).
    - Use `<Link>` for navigation.
    - Use **route parameters** (`useParams`) for dynamic routes.
- **Practice**:
  - Build a multi-page app with basic **navigation** and **routing**.
- **Assignment**:
  1. Create a simple multi-page app with `Home`, `About`, and `Contact` pages.
  2. Use `Link` components for navigation.

---

### **Day 5 (Wednesday): Forms and Controlled Components**
- **Topics to Cover**:
  - Learn how to create **forms** in React.
  - **Controlled components**: Form inputs controlled by React state.
  - Form validation and managing form state.
- **Practice**:
  - Build a simple **signup form** with validation.
- **Assignment**:
  1. Create a signup page with the following fields:
     - Name
     - Email
     - Password
     - Confirm Password
  2. Add basic validation for empty fields and **password match**.

---

### **Day 6 (Friday): Introduction to Redux**
- **Core Concepts Learned**:
  - **Store**: Centralized state container.
  - **Actions**: Functions that describe "what happened".
  - **Reducers**: Functions that modify the state based on actions.
  - **Dispatch**: Sending actions to the store.
- **Integration with the App**:
  - Set up **Redux** to manage global state in the app.
  - Create actions to handle state changes (e.g., fetch data, update state).
  - Create reducers to update the state based on the dispatched actions.
- **Assignment**:
  1. Set up Redux in your app.
  2. Create actions to manage app data (e.g., `loading`, `data`, `error` states).
  3. Create reducers to handle state changes.

---

## **End of Week 2: Wrap-Up**
By the end of Week 2, you will:
- Have learned key React concepts including **state management**, **component structure**, **forms**, and **react-router**.
- Master **Redux** concepts such as **store**, **actions**, **reducers**, and **dispatch**.
- Integrated **Redux** into your app for global state management and asynchronous data fetching.
