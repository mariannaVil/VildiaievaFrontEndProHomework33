class User {
    constructor(user) {
        this.user = user;
    }

    render() {
        const userContainer = document.createElement("div");
        userContainer.className = "user-container";

        const imgElement = document.createElement("img");
        imgElement.src = this.user.img;
        imgElement.alt = "Зображення користувача";

        const nameElement = document.createElement("p");
        nameElement.textContent = `Ім'я: ${this.user.name}`;

        const ageElement = document.createElement("p");
        ageElement.textContent = `Вік: ${this.user.age}`;

        const roleElement = document.createElement("p");
        roleElement.textContent = `Роль: ${this.user.role}`;

        userContainer.appendChild(imgElement);
        userContainer.appendChild(nameElement);
        userContainer.appendChild(ageElement);
        userContainer.appendChild(roleElement);

        if (this.user.hasOwnProperty("courses")) {
            const coursesElement = this.renderCourses();
            userContainer.appendChild(coursesElement);
        }

        document.body.appendChild(userContainer);
    }

    renderCourses() {
        const coursesContainer = document.createElement("div");
        coursesContainer.className = "courses-container";

        const coursesHeader = document.createElement("p");
        coursesHeader.textContent = "Курси:";
        coursesContainer.appendChild(coursesHeader);

        const coursesList = document.createElement("ul");

        this.user.courses.forEach(course => {
            const courseItem = document.createElement("li");
            courseItem.textContent = `${course.title} - ${course.mark || course.score}`;
            coursesList.appendChild(courseItem);
        });

        coursesContainer.appendChild(coursesList);
        return coursesContainer;
    }
}

class Student extends User {
    render() {
        super.render(); 
    }
}

class Lector extends User {
    renderCourses() {
        const coursesContainer = super.renderCourses();
        const lectorHeader = document.createElement("p");
        lectorHeader.textContent = "Інформація для лектора:";
        coursesContainer.insertBefore(lectorHeader, coursesContainer.firstChild);
        return coursesContainer;
    }
}

class Admin extends User {
    renderCourses() {
        const coursesContainer = super.renderCourses();
        const adminHeader = document.createElement("p");
        adminHeader.textContent = "Інформація для адміністратора:";
        coursesContainer.insertBefore(adminHeader, coursesContainer.firstChild);
        return coursesContainer;
    }
}

users.forEach(user => {
    let userObj = user.role === "student" ? new Student(user) :
                  user.role === "lector" ? new Lector(user) :
                  user.role === "admin" ? new Admin(user) : null;

    if (userObj) {
        userObj.render();
    }
});