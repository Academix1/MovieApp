### Redirecting NavBar to Home Screen OnClick
- NavBar.js
```javascript
 const handleHomeClick = () => {
    navigate('/');  // This will navigate to the homepage
  };

 <AppBar position="fixed" onClick={handleHomeClick} style={{cursor:"pointer"}} >

```
