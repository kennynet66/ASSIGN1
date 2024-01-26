// Load the elements
let projectForm = document.querySelector('#project-form') as HTMLFormElement;
let projectName = document.querySelector('#project-name') as HTMLInputElement;
let projectDescription = document.querySelector('#project-description') as HTMLInputElement;
let startDate = document.querySelector('#start-date') as HTMLInputElement
let deadline = document.querySelector('#deadline') as HTMLInputElement;
let assignedTo = document.querySelector('#assignedto') as HTMLInputElement
let displayTasks = document.querySelector('.displayTasks') as HTMLDivElement

// Import the error div
let projectNameError = document.querySelector('.projectNameError') as HTMLDivElement;
let projectDescriptionError = document.querySelector('.projectDescriptionError') as HTMLDivElement;
let deadlineError = document.querySelector('.deadlineError') as HTMLDivElement
let assignedToError = document.querySelector('.assignedToError') as HTMLDivElement
let startDateError = document.querySelector('.startDateError') as HTMLDivElement;

interface project {
    projectName: string,
    projectDescription: string,
    startDate:string,
    deadline: string,
    assignedTo: string,
}

let projectArr: project[] = []

window.onload = () => {
    let data:any = localStorage.getItem("product");
    data = JSON.parse(data)
    console.log(data);
    
    data.forEach((item:any) => {
        projectArr.push(item);
        Project.createcard(projectArr)  
    })
    
}

projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Reset the error div
    projectNameError.textContent = "";
    projectDescriptionError.textContent = "";
    deadlineError.textContent = "";
    assignedToError.textContent = "";
    
    let project = Project.validateInput(projectName.value, projectDescription.value, deadline.value, assignedTo.value, startDate.value)

    if (project) {
        projectArr.push(project)
        dataProcess.localSave(projectArr);
    }

});

class newProject {
    validateInput(projectName: string, projectDescription: string, deadline: string, assignedTo: string, startDate:string) {
        let projectObject = {
            projectName,
            projectDescription,
            startDate,
            deadline,
            assignedTo
        }

        if (projectName.trim() != "") {
            projectObject.projectName = projectName
        } else {
            projectNameError.textContent = "Project name required"
            return false
        }
        if (projectDescription.trim() != "") {
            projectObject.projectDescription = projectDescription
        } else {
            projectDescriptionError.textContent = "Project description required"
            return false
        }
        if(startDate.trim() != "") {
            projectObject.startDate = startDate
        } else {
            startDateError.textContent = "Start date required"
            return false
        }
        if (deadline.trim() != "") {
            projectObject.deadline = deadline
        } else {
            deadlineError.textContent = "Deadline required"
            return false
        }
        if (assignedTo.trim() != "") {
            projectObject.assignedTo = assignedTo
        } else {
            assignedToError.textContent = "Assigned to required"
            return false
        }

        return projectObject
    }

    createcard(projectArr: project[]) {
        displayTasks.textContent = ""
        if (projectArr.length >= 1) {
            projectArr.forEach((item, index) => {
                let card = document.createElement('div')
                card.className = "card";

                let title = document.createElement('h3');
                title.className = "title"
                title.textContent = `${item.projectName}`

                let desc = document.createElement('p');
                desc.className = "desc";
                desc.textContent = item.projectDescription;

                let startDate = document.createElement('h3');
                startDate.className = "start";
                startDate.textContent = `Start date: ${item.startDate}`;

                let deadline = document.createElement('h3');
                deadline.className = "deadline"
                deadline.textContent = `Deadline: ${item.deadline}`

                let assign = document.createElement('h3');
                assign.className = "assign"
                assign.textContent = `Assigned to: ${item.assignedTo}`

                let del = document.createElement('button');
                del.className = "delete"
                del.textContent = "DELETE";
                del.addEventListener('click', () => {
                    this.deleteProject(index)
                })

                card.appendChild(title);
                card.appendChild(desc);
                card.appendChild(startDate);
                card.appendChild(deadline);
                card.appendChild(assign);
                card.appendChild(del);

                displayTasks.appendChild(card)
            })
        } else {
            displayTasks.textContent = "No Projects Available"
        }
    }

    deleteProject(index: number) {
        projectArr.splice(index, 1);
        this.createcard(projectArr);
        dataProcess.localSave(projectArr);
    }
}

let Project = new newProject;

Project.createcard(projectArr)

class processData extends newProject {
    localSave(data: project[]) {
        localStorage.setItem("product", JSON.stringify(data));
        this.createcard(projectArr);
    }
}

let dataProcess = new processData;

