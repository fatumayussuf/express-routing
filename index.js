const express = require('express');
const path = require('path');

const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Middleware to check if request is within working hours
function workingHoursMiddleware(req, res, next) {
    const currentDate = new Date();
    const day = currentDate.getDay();
    const hour = currentDate.getHours();

    // Allow access Monday to Friday, 9 to 17
    if (day >= 1 && day <= 5 && hour >= 9 && hour <= 17) {
        next();
    } else {
        res.send('The web application is only accessible Monday to Friday, 9 AM to 5 PM.');
    }
}

app.use(workingHoursMiddleware);

// Routes
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
