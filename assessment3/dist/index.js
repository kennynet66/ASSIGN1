"use strict";
// Load the elements
let projectForm = document.querySelector('#project-form');
let projectName = document.querySelector('#project-name');
let projectDescription = document.querySelector('#project-description');
let startDate = document.querySelector('#start-date');
let deadline = document.querySelector('#deadline');
let assignedTo = document.querySelector('#assignedto');
let displayTasks = document.querySelector('.displayTasks');
// Import the error div
let projectNameError = document.querySelector('.projectNameError');
let projectDescriptionError = document.querySelector('.projectDescriptionError');
let deadlineError = document.querySelector('.deadlineError');
let assignedToError = document.querySelector('.assignedToError');
let startDateError = document.querySelector('.startDateError');
let projectArr = [];
window.onload = () => {
    let data = localStorage.getItem("product");
    data = JSON.parse(data);
    console.log(data);
    data.forEach((item) => {
        projectArr.push(item);
        Project.createcard(projectArr);
    });
};
projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Reset the error div
    projectNameError.textContent = "";
    projectDescriptionError.textContent = "";
    deadlineError.textContent = "";
    assignedToError.textContent = "";
    let project = Project.validateInput(projectName.value, projectDescription.value, deadline.value, assignedTo.value, startDate.value);
    if (project) {
        projectArr.push(project);
        dataProcess.localSave(projectArr);
    }
});
class newProject {
    validateInput(projectName, projectDescription, deadline, assignedTo, startDate) {
        let projectObject = {
            projectName,
            projectDescription,
            startDate,
            deadline,
            assignedTo
        };
        if (projectName.trim() != "") {
            projectObject.projectName = projectName;
        }
        else {
            projectNameError.textContent = "Project name required";
            return false;
        }
        if (projectDescription.trim() != "") {
            projectObject.projectDescription = projectDescription;
        }
        else {
            projectDescriptionError.textContent = "Project description required";
            return false;
        }
        if (startDate.trim() != "") {
            projectObject.startDate = startDate;
        }
        else {
            startDateError.textContent = "Start date required";
            return false;
        }
        if (deadline.trim() != "") {
            projectObject.deadline = deadline;
        }
        else {
            deadlineError.textContent = "Deadline required";
            return false;
        }
        if (assignedTo.trim() != "") {
            projectObject.assignedTo = assignedTo;
        }
        else {
            assignedToError.textContent = "Assigned to required";
            return false;
        }
        return projectObject;
    }
    createcard(projectArr) {
        displayTasks.textContent = "";
        if (projectArr.length >= 1) {
            projectArr.forEach((item, index) => {
                let card = document.createElement('div');
                card.className = "card";
                let title = document.createElement('h3');
                title.className = "title";
                title.textContent = `${item.projectName}`;
                let desc = document.createElement('p');
                desc.className = "desc";
                desc.textContent = item.projectDescription;
                let startDate = document.createElement('h3');
                startDate.className = "start";
                startDate.textContent = `Start date: ${item.startDate}`;
                let deadline = document.createElement('h3');
                deadline.className = "deadline";
                deadline.textContent = `Deadline: ${item.deadline}`;
                let assign = document.createElement('h3');
                assign.className = "assign";
                assign.textContent = `Assigned to: ${item.assignedTo}`;
                let del = document.createElement('button');
                del.className = "delete";
                del.textContent = "DELETE";
                del.addEventListener('click', () => {
                    this.deleteProject(index);
                });
                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(startDate);
                card.appendChild(deadline);
                card.appendChild(assign);
                card.appendChild(del);
                displayTasks.appendChild(card);
            });
        }
        else {
            displayTasks.textContent = "No Projects Available";
        }
    }
    deleteProject(index) {
        projectArr.splice(index, 1);
        this.createcard(projectArr);
        dataProcess.localSave(projectArr);
    }
}
let Project = new newProject;
Project.createcard(projectArr);
class processData extends newProject {
    localSave(data) {
        localStorage.setItem("product", JSON.stringify(data));
        this.createcard(projectArr);
    }
}
let dataProcess = new processData;
