/* main.js — Wires all data through render templates into DOM containers */

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("concept-cards-container").innerHTML = renderConceptCards(CONCEPT_CARDS);
  document.getElementById("comparisons-container").innerHTML = renderComparisons(COMPARISONS);
  document.getElementById("workflows-container").innerHTML = renderWorkflows(WORKFLOWS);
  document.getElementById("applications-container").innerHTML = renderApplications(APPLICATIONS);
  document.getElementById("research-container").innerHTML = renderResearchItems(RESEARCH_ITEMS);
  document.getElementById("sustainability-container").innerHTML = renderSustainability(SUSTAINABILITY_TEXT, SDG_CARDS);
  document.getElementById("contribution-matrix-container").innerHTML = renderContributionMatrix(CONTRIBUTION_MATRIX);
  document.getElementById("reflections-container").innerHTML = renderReflections(REFLECTIONS);
  document.getElementById("references-container").innerHTML = renderReferences(REFERENCES_APA);
  document.getElementById("authors-container").innerHTML = renderStudentInfo(STUDENT_INFO);
  document.getElementById("current-year").textContent = new Date().getFullYear();

  // Reference style tabs
  document.querySelectorAll(".ref-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".ref-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const style = tab.dataset.style;
      const refs = style === "ieee" ? REFERENCES_IEEE : REFERENCES_APA;
      document.getElementById("references-container").innerHTML = renderReferences(refs);
    });
  });
});
