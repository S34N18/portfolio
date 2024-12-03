const updateClock = () => {
    const now = new Date();
    const timeElement = document.getElementById('time');
    const dateElement = document.getElementById('date');
    const greetingElement = document.getElementById('greeting');

    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = now.toLocaleDateString(undefined, options);

    // Update greeting
    const hour = now.getHours();
    let greeting;
    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    } else {
        greeting = "Good evening";
    }
    greetingElement.textContent = greeting;

    // Change background color
    const hue = (hour * 15 + minutes / 4) % 360; // Full color cycle every 24 hours
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 15%)`;
};

updateClock();
setInterval(updateClock, 1000);