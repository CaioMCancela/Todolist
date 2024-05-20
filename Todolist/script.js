document.addEventListener('DOMContentLoaded', () => {
    let input = document.getElementById('escrita');
    let tarefasContainer = document.getElementById('tarefas');
    let addButton = document.getElementById('addButton');

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    addButton.addEventListener('click', () => {
            addTask();
        });

    function addTask() {
        console.log("adicionado")
        let taskText = input.value.trim();
        if (taskText === '') return;

        let tarefa = createTaskElement(taskText);
        tarefasContainer.appendChild(tarefa);

        input.value = "";
        input.focus();
    }

    function createTaskElement(taskText) {
        let tarefa = document.createElement("div");
        tarefa.className = "tarefa";

        let checkbox = createCheckboxElement(tarefa);
        let texto = createTextoElement(taskText);
        let editButton = createEditButtonElement(texto);
        let deleteButton = createDeleteButtonElement(tarefa);
        let linha = createLinhaElement(); 

        tarefa.appendChild(checkbox);
        tarefa.appendChild(texto);
        tarefa.appendChild(editButton);
        tarefa.appendChild(deleteButton);
        tarefa.appendChild(linha); 

        return tarefa;
    }

    function createCheckboxElement(tarefa) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => {
            tarefa.classList.toggle("done");
        });
        return checkbox;
    }

    function createTextoElement(taskText) {
        let texto = document.createElement("span");
        texto.className = "texto";
        texto.textContent = taskText;
        return texto;
    }

    function createEditButtonElement(texto) {
        const editButton = document.createElement("button");
        editButton.className = "edit";
        editButton.textContent = "✏️";
        editButton.addEventListener("click", () => {
            const editText = document.createElement("input");
            editText.type = "text";
            editText.className = "edit-text";
            editText.value = texto.textContent;
            editText.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    texto.textContent = editText.value.trim();
                    editText.parentNode.replaceChild(texto, editText);
                }
            });
            texto.parentNode.replaceChild(editText, texto);
            editText.focus();
        });
        return editButton;
    }

    function createDeleteButtonElement(tarefa) {
        let deleteButton = document.createElement("button");
        deleteButton.className = "delete";
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", () => {
            tarefasContainer.removeChild(tarefa);
            let sibling = tarefa.nextElementSibling;
            if (sibling && sibling.className === "linha") {
                tarefasContainer.removeChild(sibling);
            }
        });
        return deleteButton;
    }

    function createLinhaElement() {
        let linha = document.createElement("div");
        linha.className = "linha";
        return linha;
    }
});
