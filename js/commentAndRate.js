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