const supabaseClient = supabase.createClient(
  "https://qoulpzslmvxkqremhxcf.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFvdWxwenNsbXZ4a3FyZW1oeGNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE1MDIxNzAsImV4cCI6MjA4NzA3ODE3MH0.S7teKkmzroV2YjBx57oqNRA1IXVtNAbC23YBGy-Bfi0"
);

async function renderAuth() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  const zone = document.getElementById("auth-zone");

  if (!zone) return;

  if (!user) {
    zone.innerHTML = `
      <div style="margin-top: 40px; text-align: center;">
        <input id="email" type="email" placeholder="Email"><br><br>
        <input id="password" type="password" placeholder="Mot de passe"><br><br>
        <button onclick="login(
          document.getElementById('email').value,
          document.getElementById('password').value
        )">
          login
        </button>
      </div>
    `;
  } else {
    zone.innerHTML = `
      <div style="margin-top: 40px; text-align: center;">
        haha t'es déjà connecté.e en fait !!!
        <br><br>
        <button onclick="logout()">logout</button>
      </div>
    `;
  }
}

async function login(email, password) {
  const { error } = await supabaseClient.auth.signInWithPassword({
    email,
    password
  });

  if (error) alert(error.message);
  else renderAuth();
}

async function logout() {
  await supabaseClient.auth.signOut();
  renderAuth();
}

// Supabase client déjà créé
// const supabaseClient = supabase.createClient(SUPABASE_URL, PUBLIC_ANON_KEY);

async function loadUserRating(activityId) {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data, error } = await supabaseClient
    .from('ratings')
    .select('rating')
    .eq('activity_id', activityId)
    .eq('user_id', user.id)
    .single();

  if (data) {
    const slider = document.getElementById(`slider-${activityId}`);
    const label = document.getElementById(`rating-value-${activityId}`);
    if (slider && label) {
      slider.value = data.rating;
      label.textContent = data.rating;
    }
  }
}

// Fonction pour créer le slider d’une activité
function renderActivity(activity) {
  const container = document.getElementById('activities-container');

  const div = document.createElement('div');
  div.style.marginBottom = "30px";
  div.innerHTML = `
    <h3>${activity.name}</h3>
    ${activity.description ? `<p>${activity.description}</p>` : ""}
    <img src="${activity.image_url}" alt="${activity.name}" width="200"><br><br>
    <input
      id="slider-${activity.id}"
      type="range"
      min="0"
      max="5"
      step="0.5"
      value="0"
      oninput="document.getElementById('rating-value-${activity.id}').textContent=this.value"
      onchange="setRating('${activity.id}', this.value)"
    />
    <span id="rating-value-${activity.id}">0</span> / 5
  `;
  container.appendChild(div);

  // charger la note existante
  loadUserRating(activity.id);
}

// Fonction principale : récupérer toutes les activités et les afficher
async function loadAllActivities() {
  const { data: activities, error } = await supabaseClient
    .from('activities')
    .select('*');

  if (error) {
    console.error(error);
    return;
  }

  activities.forEach(activity => renderActivity(activity));
}

async function setRating(activityId, value) {
  // sécurité côté frontend
  if (value < 0 || value > 5) return;

  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) {
    alert("Tu dois être connecté.e pour noter");
    return;
  }

  const { error } = await supabaseClient
    .from('ratings')
    .upsert({
      activity_id: activityId,
      user_id: user.id,
      rating: value
    }, {
      onConflict: 'activity_id,user_id'
    });

  if (error) {
    console.error(error);
    alert("Erreur lors de l'enregistrement de la note");
  } else {
    console.log("Note enregistrée :", value);
  }
}

async function loadUserRating(activityId) {
  const { data: { user } } = await supabaseClient.auth.getUser();
  if (!user) return;

  const { data, error } = await supabaseClient
    .from('ratings')
    .select('rating')
    .eq('activity_id', activityId)
    .eq('user_id', user.id)
    .single();

  if (data) {
    const slider = document.querySelector('input[type="range"]');
    slider.value = data.rating;
    updateLabel(data.rating);
  }
}

function updateLabel(value) {
  document.getElementById("rating-value").textContent = value;
}

// Appel au chargement du DOM
document.addEventListener('DOMContentLoaded', loadAllActivities);

document.addEventListener("DOMContentLoaded", renderAuth);

