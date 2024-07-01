gsap.registerPlugin(ScrollTrigger);

gsap.from("header", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".section", {
    opacity: 0,
    y: 50,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: ".section",
        start: "top 80%"
    }
});

gsap.from(".card", {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    stagger: 0.1,
    ease: "back.out(1.7)",
    scrollTrigger: {
        trigger: ".card",
        start: "top 80%"
    }
});

// Fetch the course data
let courseData;
fetch('course.json')
    .then(response => response.json())
    .then(data => {
        courseData = data;
        populateDateSelect();
    });

// Get modal elements
const modal = document.getElementById("courseModal");
const buyButton = document.getElementById("buy");
const closeButton = document.getElementsByClassName("close")[0];
const dateSelect = document.getElementById("dateSelect");
const courseSelect = document.getElementById("courseSelect");
const courseInfo = document.getElementById("courseInfo");
const buyNowButton = document.getElementById("buyButton");
const whatsappButton = document.getElementById("whatsappButton");

// Open modal when "הרשמה לקורס" is clicked
buyButton.onclick = function() {
    modal.style.display = "block";
}

// Close modal when 'x' is clicked
closeButton.onclick = function() {
    modal.style.display = "none";
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Populate date select
function populateDateSelect() {
    const dates = [...new Set(courseData.map(course => course.Dates))];
    dates.forEach(date => {
        const option = document.createElement('option');
        option.value = date;
        option.textContent = date;
        dateSelect.appendChild(option);
    });
}

// Handle date selection
dateSelect.onchange = function() {
    courseSelect.innerHTML = '<option value="">בחר קורס</option>';
    courseSelect.disabled = false;
    const selectedDate = this.value;
    const availableCourses = courseData.filter(course => course.Dates === selectedDate);
    availableCourses.forEach(course => {
        const option = document.createElement('option');
        option.value = course["Course-Name"];
        option.textContent = course["Course-Name"];
        courseSelect.appendChild(option);
    });
}

// Handle course selection
courseSelect.onchange = function() {
    const selectedCourse = courseData.find(course =>
        course.Dates === dateSelect.value && course["Course-Name"] === this.value
    );
    if (selectedCourse) {
        courseInfo.innerHTML = `
            <p><strong>כיתות יעד:</strong> ${selectedCourse["Target-Grades"]}</p>
            <p><strong>תוכנת פיתוח:</strong> ${selectedCourse["Development-Software"]}</p>
            <p><strong>שיעורים:</strong> ${selectedCourse["Sessions (Lessons)"]}</p>
            <p><strong>שעות:</strong> ${selectedCourse.Hours}</p>
            <p><strong>עלות:</strong> ${selectedCourse["Course-Cost"]} ₪</p>
            <p><strong>מיקום:</strong> ${selectedCourse.Location}</p>
            <p><strong>תוספות:</strong> ${selectedCourse.Extras}</p>
            <p><strong>סטטוס:</strong> ${selectedCourse.status}</p>
        `;
    }
}

// Handle buy button click
buyNowButton.onclick = function() {
    window.location.href = 'https://wecome.co.il/pay/pay.php';
}

// Handle WhatsApp button click
whatsappButton.onclick = function() {
    const selectedCourse = courseData.find(course =>
        course.Dates === dateSelect.value && course["Course-Name"] === courseSelect.value
    );
    if (selectedCourse) {
        const message = encodeURIComponent(`היי אשמח לקבל פרטים על הקורס של ${selectedCourse["Course-Name"]} שמתקיים בתאריכים ${selectedCourse.Dates}`);
        window.open(`https://wa.me/972502555605?text=${message}`, '_blank');
    }
}

// Fetch and display course data
fetch('course.json')
    .then(response => response.json())
    .then(data => {
        const coursesContainer = document.getElementById('coursesContainer');
        data.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.className = 'course-item';
            courseElement.innerHTML = `
                <h3>${course["Course-Name"]}</h3>
                <p><strong>תאריכים:</strong> ${course.Dates}</p>
                <p><strong>כיתות יעד:</strong> ${course["Target-Grades"]}</p>
                <p><strong>שעות:</strong> ${course.Hours}</p>

                <p><strong>סטטוס:</strong> ${course.status}</p>
            `;
            coursesContainer.appendChild(courseElement);
        });
    });

    // <p><strong>עלות:</strong> <span class="highlight">${course["Course-Cost"]} ₪</span></p>