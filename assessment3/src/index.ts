// Load the elements
let projectForm = document.querySelector('#project-form') as HTMLFormElement;
let projectName = document.querySelector('#project-name') as HTMLInputElement;
let projectDescription = document.querySelector('#project-description') as HTMLInputElement;
let deadline = document.querySelector('#deadline') as HTMLInputElement;
let assignedTo = document.querySelector('#assignedto') as HTMLInputElement
let displayTasks = document.querySelector('.displayTasks') as HTMLDivElement

// Import the error div
let projectNameError = document.querySelector('.projectNameError') as HTMLDivElement;
let projectDescriptionError = document.querySelector('.projectDescriptionError') as HTMLDivElement;
let deadlineError = document.querySelector('.deadlineError') as HTMLDivElement
let assignedToError = document.querySelector('.deadlineError') as HTMLDivElement

interface project {
    projectName:string
    projectDescription: string
    deadline: string
    assignedTo: string
}

let projectArr:project[] = []


projectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Reset the error div
    projectNameError.textContent = "";
    projectDescriptionError.textContent = "";
    deadlineError.textContent = "";
    assignedToError.textContent = "";
  
    let project = Project.validateInput(projectName.value, projectDescription.value, deadline.value, assignedTo.value)
    
    if(project) {
        projectArr.push(project)
        Project.createcard(projectArr);
    }
    
});

class newProject {
    validateInput(projectName:string, projectDescription:string, deadline:string, assignedTo:string) {
        let projectObject = {
            projectName,
            projectDescription,
            deadline,
            assignedTo
        }

        if(projectName.trim() != "") {
            projectObject.projectName = projectName
        } else {
            projectNameError.textContent = "Project name required"
            return false
        }
        if(projectDescription.trim() != "") {
            projectObject.projectDescription = projectDescription
        } else {
            projectDescriptionError.textContent = "Project description required"
            return false
        }
        if(deadline.trim() != "") {
            projectObject.deadline = deadline
        } else {
            deadlineError.textContent = "Deadline required"
            return false
        }
        if(assignedTo.trim() != "") {
            projectObject.assignedTo = assignedTo
        } else {
            assignedToError.textContent = "Assigned to required"
            return false
        }

        return projectObject
    }

    createcard(project:project[]) {
        displayTasks.textContent = ""
        project.forEach((item, index) => {
            let card = document.createElement('div')  
            card.className = "card";

            let title = document.createElement('h3');
            title.className = "title"
            title.textContent = `Title: ${item.projectName}`

            let desc = document.createElement('p');
            desc.className = "desc";
            desc.textContent = item.projectDescription;

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
            card.appendChild(deadline);
            card.appendChild(assign);
            card.appendChild(del);

            displayTasks.appendChild(card)
        })
    }

    deleteProject(index:number) {
        projectArr.splice(index, 1);
        this.createcard(projectArr)
    }
}

let Project = new newProject;


