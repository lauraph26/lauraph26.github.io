const supabaseClient = supabase.createClient(
  "https://qoulpzslmvxkqremhxcf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdWxwenNsbXZ4a3FyZW1oeGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDIxNzAsImV4cCI6MjA4NzA3ODE3MH0.S7teKkmzroV2YjBx57oqNRA1IXVtNAbC23YBGy-Bfi0"
);

document.addEventListener("DOMContentLoaded", initTodo);

async function initTodo() {
  const { data: { user } } = await supabaseClient.auth.getUser();

  const app = document.getElementById("todo-app");

  if (!user) {
    app.innerHTML = `
      <p>faut être connecté.e !</p>
    `;
    return;
  }

  app.innerHTML = `
    <div style="margin-bottom:20px;">
      <input id="new-task" placeholder="qu'est-ce qu'on fait !!!">
      <button onclick="addTask()">ajouter</button>
    </div>

    <div style="display: flex; gap: 40px; align-items: flex-start;">
    
     <div style="flex:1; background:#f9f9f9; padding:15px; border-radius:10px;">
      <h3>à faire</h3>
      <ul id="active-list"></ul>
    </div>

    <div style="flex:1; background:#f0f0f0; padding:15px; border-radius:10px;">
      <h3>finies</h3>
      <ul id="completed-list"></ul>
    </div>

    </div>

  `;

  loadTasks();
}

async function loadTasks() {
  const { data: tasks, error } = await supabaseClient
    .from("tasks")
    .select(`
      *,
      creator:profiles!tasks_user_id_fkey(email)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const activeList = document.getElementById("active-list");
  const completedList = document.getElementById("completed-list");

  activeList.innerHTML = "";
  completedList.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.style.marginBottom = "10px";

    li.innerHTML = `
      <input type="checkbox"
        ${task.is_completed ? "checked" : ""}
        onchange="toggleTask('${task.id}', this.checked)">

      <span style="
        margin-left:8px;
        ${task.is_completed ? 'text-decoration: line-through;' : ''}
      ">
        ${task.content}
      </span>

      <br>
      <small style="color: gray;">
        créé par : ${creatorName(task.creator?.email) || "?"}
      </small>

      <br>

      <button onclick="editTask('${task.id}', \`${task.content}\`)">✏️</button>
      <button onclick="deleteTask('${task.id}')">❌</button>
    `;

    if (task.is_completed) {
      completedList.appendChild(li);
    } else {
      activeList.appendChild(li);
    }
  });
}

const creatorName = (email) => {
    switch(email) {
        case "raphael.levecque@outlook.fr":
            return "raph";
        case "lauraph26@gmail.com":
            return "laura";
        default:
            return email;
    }
 }

async function addTask() {
  const input = document.getElementById("new-task");
  const content = input.value.trim();

  if (!content) return;

  const { data: { user }, error: userError } = await supabaseClient.auth.getUser();
  if (userError || !user) {
    alert("faut être connecté.e !");
    return;
  }

  const { error } = await supabaseClient
    .from("tasks")
    .insert({
      content: content,
      user_id: user.id   
    });

  if (error) {
    console.error(error);
    alert("Erreur lors de l'ajout de la tâche");
    return;
  }

  input.value = "";
  loadTasks();
}

async function toggleTask(id, isCompleted) {
  const { error } = await supabaseClient
    .from("tasks")
    .update({ is_completed: isCompleted })
    .eq("id", id);

  if (error) console.error(error);

  loadTasks();
}

async function editTask(id, oldContent) {
  const newContent = prompt("modifier la tâche :", oldContent);

  if (!newContent) return;

  const { error } = await supabaseClient
    .from("tasks")
    .update({ content: newContent })
    .eq("id", id);

  if (error) console.error(error);

  loadTasks();
}

async function deleteTask(id) {
  const { error } = await supabaseClient
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) console.error(error);

  loadTasks();
}