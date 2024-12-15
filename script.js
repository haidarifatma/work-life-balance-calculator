document.getElementById("calculate-btn").addEventListener("click", () => {
    const work = parseInt(document.getElementById("work-hours").value) || 0;
    const sleep = parseInt(document.getElementById("sleep-hours").value) || 0;
    const exercise = parseInt(document.getElementById("exercise-hours").value) || 0;
    const family = parseInt(document.getElementById("family-hours").value) || 0;
    const personal = parseInt(document.getElementById("personal-hours").value) || 0;
    const commuting = parseInt(document.getElementById("commuting-hours").value) || 0;
    const vacation = parseInt(document.getElementById("vacation-hours").value) || 0;
  
    // Validation
    const totalHours = work + sleep + exercise + family + personal + commuting + vacation;
    if (totalHours > 168) {
      alert("Total hours exceed 168 in a week! Please adjust your inputs.");
      return;
    }
  
    // Ideal hours
    const ideal = {
      work: 45,
      sleep: 56,
      exercise: 2.5,
      family: 12,
      personal: 17.5,
      commuting: 10,
      vacation: 48,
    };
  
    // Ratios
    const ratios = {
      work: work / ideal.work,
      sleep: sleep / ideal.sleep,
      exercise: exercise / ideal.exercise,
      family: family / ideal.family,
      personal: personal / ideal.personal,
      commuting: (ideal.commuting - commuting) / ideal.commuting,
      vacation: vacation / ideal.vacation,
    };
  
    // Normalize the ratios for overcommitment (work/commuting)
    ratios.work = normalizeRatio(ratios.work, 'work');
    ratios.commuting = normalizeRatio(ratios.commuting, 'commuting');
  
    // Calculate WLB score
    const WLB = 
      (ratios.work + ratios.sleep + ratios.exercise + ratios.family + ratios.personal + ratios.commuting + ratios.vacation) / 7;
  
    // Display animation
    const percentage = Math.round(WLB * 100);
    const circle = document.getElementById("progress-circle");
    const text = document.getElementById("circle-text");
    circle.style.background = `conic-gradient(#007bff ${percentage}%, #ddd ${percentage}%)`;
    text.textContent = `${percentage}%`;
  
    // Display detailed results
    const details = `
      <p>Work: ${checkBalance(ratios.work)}</p>
      <p>Sleep: ${checkBalance(ratios.sleep)}</p>
      <p>Exercise: ${checkBalance(ratios.exercise)}</p>
      <p>Family/Social: ${checkBalance(ratios.family)}</p>
      <p>Personal: ${checkBalance(ratios.personal)}</p>
      <p>Commuting: ${checkBalance(ratios.commuting)}</p>
      <p>Vacation: ${checkBalance(ratios.vacation)}</p>
    `;
    document.getElementById("result-details").innerHTML = details;
  });
  
  function normalizeRatio(ratio, category) {
    if (category === 'work' || category === 'commuting') {
      // If overcommitment happens in work or commuting, cap it to a max of 1.5
      if (ratio > 1.5) {
        ratio = 1.5;
      }
    }
    
    // For other categories, do not cap them but apply some logic if needed
    return ratio;
  }
  
  function checkBalance(ratio) {
    if (ratio >= 1) return "✅ Balanced";
    if (ratio >= 0.8) return "⚠️ Needs Improvement";
    return "❌ Off Balance";
  }
  