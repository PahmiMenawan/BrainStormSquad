const members = [];

document.getElementById("addMemberBtn").addEventListener("click", () => {
  const name = document.getElementById("memberName").value.trim();

  const minLength = 2;

    if (!name) {
    document.getElementById("warn").textContent = "Enter a valid member name!";
    setTimeout(() => (document.getElementById("warn").textContent = ""), 3000);
    return;
  }

  if (!/^[a-zA-Z\s']+$/.test(name)) {
    document.getElementById("warn").textContent =
      "Name must contain only letters and spaces!";
    setTimeout(() => (document.getElementById("warn").textContent = ""), 3000);
    return;
  }

  if (name.length < minLength) {
    document.getElementById("warn").textContent =
      "Minimum characters for a name : 2";
    setTimeout(() => (document.getElementById("warn").textContent = ""), 3000);
    return;
  }



  members.push({ name, tasks: [] });
  document.getElementById("memberName").value = "";
  render();
});

function render() {
  // console.log(members)
  const container = document.getElementById("members");
  container.innerHTML = "";
  members.forEach((member, mIndex) => {
    const memberDiv = document.createElement("div");
    memberDiv.classList.add("member");
    const title = document.createElement("h3");
    title.textContent = member.name;

    const memberInputs = document.createElement("div");
    memberInputs.classList.add("inputs");

    const taskInput = document.createElement("input");
    taskInput.placeholder = "New Task";

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add task";

    const deleteMemberBtn = document.createElement("button");
    deleteMemberBtn.textContent = "Delete this member";

    deleteMemberBtn.addEventListener("click", () => {
      let confirmation = confirm(`This action will delete ${member.name} from the list, proceed?`);
      if (confirmation) {
        members.splice(mIndex, 1);
        render();
      }
    });

    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (!text) {
        document.getElementById("warn").textContent =
          "Enter a valid task name!";
        setTimeout(
          () => (document.getElementById("warn").textContent = ""),
          3000
        );
        return;
      }
      member.tasks.push({ text, done: false });
      taskInput.value = "";
      render();
    });

    memberDiv.appendChild(title);
    memberDiv.appendChild(memberInputs);
    memberInputs.appendChild(taskInput);
    memberInputs.appendChild(addTaskBtn);
    memberInputs.appendChild(deleteMemberBtn);

    const list = document.createElement("ul");
    member.tasks.forEach((task, tIndex) => {
      const li = document.createElement("li");

      const label = document.createElement("span");
      label.textContent = task.text;

      const doneBtn = document.createElement("button");
      doneBtn.textContent = task.done ? "Uncheck" : "Check";

      if (task.done) {
        label.classList.add("done");
        li.classList.add("list-done");
      }

      doneBtn.addEventListener("click", () => {
        task.done = !task.done;
        render();
      });

      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.textContent = "Delete";
      deleteTaskBtn.addEventListener("click", () => {
      let confirmation = confirm(`This action will delete the task from ${member.name}'s task list, proceed?`);
        if (confirmation) {
          member.tasks.splice(tIndex, 1);
          render();
        }
      });

      li.appendChild(label);
      li.appendChild(doneBtn);
      li.appendChild(deleteTaskBtn);
      list.appendChild(li);
    });

    memberDiv.appendChild(list);
    container.appendChild(memberDiv);
  });
}

document.getElementById("clearAllBtn").addEventListener("click", () => {
  let confirmation = confirm("This action will delete all members, proceed?");
  if (confirmation) {
    members.length = 0;
    render();
  }
});
