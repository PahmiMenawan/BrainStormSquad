const members = [];

const saved = localStorage.getItem("membersData");
// const saved = sessionStorage.getItem("membersData");
if (saved) {
  try {
    const parsed = JSON.parse(saved);
    if (Array.isArray(parsed)) {
      members.push(...parsed);
    }
  } catch (e) {
    console.error("Failed to parse saved data:", e);
  }
}
render();

document.getElementById("addMemberBtn").addEventListener("click", () => {
  const name = document.getElementById("memberName").value.trim();

  if (!name) return alert("Enter a valid name!");

  members.push({ name, tasks: [] });
  document.getElementById("memberName").value = "";
  render();
});

function render() {
  // console.log(members)
  // sessionStorage.setItem("membersData", JSON.stringify(members));
  localStorage.setItem("membersData", JSON.stringify(members));
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
      members.splice(mIndex, 1);
      render();
    });

    addTaskBtn.addEventListener("click", () => {
      const text = taskInput.value.trim();
      if (!text) return alert("Enter a valid name!");
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
      }

      doneBtn.addEventListener("click", () => {
        task.done = !task.done;
        render();
      });

      const deleteTaskBtn = document.createElement("button");
      deleteTaskBtn.textContent = "Delete";
      deleteTaskBtn.addEventListener("click", () => {
        member.tasks.splice(tIndex, 1);
        render();
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
  localStorage.removeItem("membersData")
  // sessionStorage.removeItem("membersData")
    members.length = 0;
  render();
});
