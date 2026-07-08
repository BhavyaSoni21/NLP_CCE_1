/* ============================================================
   render.js — Render templates for all sections
   ============================================================ */

function renderList(items) {
  return `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

function badge(label, cls) {
  return `<span class="badge${cls ? ' ' + cls : ''}">${label}</span>`;
}

// Concept Card
function renderConceptCard(c, idx, all) {
  const hasPrev = idx > 0, hasNext = idx < all.length - 1;
  const contentId = `body-${c.id}`;
  return `
    <article class="card concept-card" id="${c.id}">
      <button class="card-toggle" aria-expanded="false" aria-controls="${contentId}">
        <div class="card-toggle-left">
          <div class="card-meta">
            ${badge(c.category, 'badge-category')}
            ${badge(c.difficulty, 'badge-difficulty')}
            ${badge(c.learningTime, 'badge-time')}
            ${badge(c.contributor, 'badge-contributor')}
          </div>
          <h3>${c.title}</h3>
        </div>
        <span class="toggle-icon">▾</span>
      </button>

      <div class="card-body" id="${contentId}">
        <h4>Definition</h4>
        <p>${c.definition}</p>

        <h4>Purpose</h4>
        <p>${c.purpose}</p>

        <h4>Working Principle</h4>
        <p>${c.workingPrinciple}</p>

        <h4>Example</h4>
        <div class="example-box">
          <strong>Input:</strong> ${c.example.input}<br>
          <strong>Output:</strong> ${Array.isArray(c.example.output) ? c.example.output.join(' → ') : c.example.output}
        </div>

        <h4>Flow Diagram</h4>
        <div class="flow-diagram">${c.flowDiagram.map((s, i) => `
          <span class="flow-step">${s}${i < c.flowDiagram.length - 1 ? ' →' : ''}</span>
        `).join(' ')}</div>

        <h4>Advantages</h4>
        ${renderList(c.advantages)}

        <h4>Limitations</h4>
        ${renderList(c.limitations)}

        <h4>Applications</h4>
        ${renderList(c.applications)}

        <h4>Practical Use Case</h4>
        <p>${c.practicalUseCase}</p>

        <h4>References</h4>
        <ul>${c.references.map(r => `<li>${r}</li>`).join('')}</ul>

        <h4>Related Concepts</h4>
        <p>${c.relatedConcepts.join(', ')}</p>

        <div class="card-nav">
          ${hasPrev ? `<a href="#${all[idx-1].id}" class="nav-link">← ${all[idx-1].title}</a>` : '<span></span>'}
          ${hasNext ? `<a href="#${all[idx+1].id}" class="nav-link">${all[idx+1].title} →</a>` : '<span></span>'}
        </div>
      </div>
    </article>`;
}

function renderConceptCards(cards) {
  return cards.map((c, i) => renderConceptCard(c, i, cards)).join('');
}

// Comparison Table
function renderComparisonTable(c) {
  const [l, r] = c.title.split(' vs ');
  const rows = c.rows.map(r => `
    <tr><td class="criterion">${r.criterion}</td><td>${r.left}</td><td>${r.right}</td></tr>
  `).join('');
  return `
    <div class="comparison-block" id="${c.id}">
      <h3>${c.title}</h3>
      <div class="comparison-summary">${c.summary}</div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Criterion</th><th>${l}</th><th>${r}</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      <p class="conclusion"><strong>Conclusion:</strong> ${c.conclusion}</p>
    </div>`;
}

function renderComparisons(cs) {
  return cs.map(renderComparisonTable).join('');
}

// Workflow
function renderWorkflow(w) {
  return `
    <div class="workflow-block" id="${w.id}">
      <h3>${w.title}</h3>
      ${badge(w.contributor, 'badge-contributor')}
      <figure><img class="workflow-img" src="${w.image}" alt="${w.imageAlt}" loading="lazy"></figure>
    </div>`;
}

function renderWorkflows(ws) {
  return ws.map(renderWorkflow).join('');
}

// Application
function renderApplication(a) {
  return `
    <article class="card app-card" id="${a.id}">
      <h3>${a.title}</h3>
      ${badge(a.contributor, 'badge-contributor')}
      <h4>Overview</h4>
      <p>${a.overview}</p>
      <h4>NLP Concepts Used</h4>
      ${renderList(a.conceptsUsed)}
      <h4>Why These Concepts Are Used</h4>
      <p>${a.whyUsed}</p>
      <h4>Expected Benefits</h4>
      ${renderList(a.expectedBenefits)}
      <h4>Architecture</h4>
      <div class="arch-diagram">${a.architectureDiagram}</div>
      <h4>Real Industry Example</h4>
      <p>${a.realIndustryExample}</p>
      <h4>Practical Example</h4>
      <p>${a.example}</p>
    </article>`;
}

function renderApplications(as) {
  return as.map(renderApplication).join('');
}

// Research
function renderResearchItem(r) {
  return `
    <article class="card research-card">
      <div class="card-meta">
        ${badge(r.category, 'badge-category')}
        ${badge(r.publicationDate, 'badge-time')}
      </div>
      <h3>${r.title}</h3>
      <h4>Summary</h4>
      <p>${r.summary}</p>
      <h4>Importance</h4>
      <p>${r.importance}</p>
      <h4>Advantages</h4>
      ${renderList(r.advantages)}
      <h4>Future Scope</h4>
      <p>${r.futureScope}</p>
      <h4>References</h4>
      <p>${r.references}</p>
    </article>`;
}

function renderResearchItems(rs) {
  return rs.map(renderResearchItem).join('');
}

// Sustainability
function renderSustainability(text, sdgs) {
  const paras = text.split('\n\n').map(p => `<p>${p}</p>`).join('');
  const cards = sdgs.map(s => `
    <div class="sdg-card">
      <div class="sdg-code">${s.code}</div>
      <h4>${s.title}</h4>
      <p>${s.note}</p>
    </div>
  `).join('');
  return `<div class="sustainability-text">${paras}</div><div class="sdg-grid">${cards}</div>`;
}

// Reflections
function renderReflection(r) {
  return `<article class="card"><h3>Reflection — ${r.student}</h3><p>${r.text}</p></article>`;
}
function renderReflections(rs) { return rs.map(renderReflection).join(''); }

// Contribution Matrix
function renderContributionMatrix(m) {
  const rows = m.map(r => `<tr><td class="criterion">${r.student}</td><td>${r.contribution}</td></tr>`).join('');
  return `<div class="table-wrap"><table><thead><tr><th>Student</th><th>Contribution</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

// References
function renderReferences(refs) {
  return `<ol>${refs.map(r => `<li>${r}</li>`).join('')}</ol>`;
}

// Student Info
function renderStudentInfo(students) {
  return students.map(s => `
    <div class="student-card">
      <h4>${s.name}</h4>
      <p>${s.role}</p>
      <p><a href="${s.github}">GitHub</a> · ${s.email}</p>
    </div>
  `).join('');
}
