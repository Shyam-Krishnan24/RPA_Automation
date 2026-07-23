import './style.css';

// --- DATA STRUCTURES & CONFIG ---

interface Benchmark {
  id: string;
  name: string;
  type: string;
  models: string[]; // e.g. ['chatgpt', 'gemini', 'perplexity']
  bestModel: string;
  accuracy: number; // percentage
  responseTime: number; // seconds
  date: string;
}

interface Activity {
  id: string;
  text: string;
  time: string;
  icon: string;
}

// Initial Mock Benchmarks matching the template image
let benchmarks: Benchmark[] = [
  {
    id: '1',
    name: 'Quantum Computing Explained',
    type: 'PDF Document',
    models: ['chatgpt', 'gemini', 'perplexity'],
    bestModel: 'ChatGPT 4o',
    accuracy: 94.2,
    responseTime: 2.18,
    date: 'Today, 10:24 AM'
  },
  {
    id: '2',
    name: 'Marketing Strategy Plan',
    type: 'Text',
    models: ['chatgpt', 'gemini', 'claude'],
    bestModel: 'Gemini 1.5 Pro',
    accuracy: 91.7,
    responseTime: 1.95,
    date: 'Today, 09:40 AM'
  },
  {
    id: '3',
    name: 'Climate Change Report',
    type: 'PDF Document',
    models: ['chatgpt', 'gemini', 'perplexity'],
    bestModel: 'Perplexity Pro',
    accuracy: 87.9,
    responseTime: 3.14,
    date: 'Yesterday, 04:15 PM'
  },
  {
    id: '4',
    name: 'Startup Pitch Deck Review',
    type: 'PPT Document',
    models: ['chatgpt', 'gemini', 'claude'],
    bestModel: 'Claude 3.5 Sonnet',
    accuracy: 86.3,
    responseTime: 2.71,
    date: 'Yesterday, 01:20 PM'
  },
  {
    id: '5',
    name: 'Sales Data Analysis',
    type: 'CSV File',
    models: ['chatgpt', 'gemini', 'perplexity'],
    bestModel: 'ChatGPT 4o',
    accuracy: 93.1,
    responseTime: 2.05,
    date: 'May 19, 2025'
  }
];

try {
  const savedBenchmarks = localStorage.getItem('ai-benchmarks');
  if (savedBenchmarks) benchmarks = JSON.parse(savedBenchmarks) as Benchmark[];
} catch (error) {
  console.warn('Unable to restore saved benchmarks.', error);
}

function saveBenchmarks() {
  localStorage.setItem('ai-benchmarks', JSON.stringify(benchmarks));
}

// Initial Mock Activities matching the template image
let activities: Activity[] = [
  {
    id: 'act-1',
    text: 'Quantum Computing Explained',
    time: '2 mins ago',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
  },
  {
    id: 'act-2',
    text: 'Marketing Strategy Plan',
    time: '18 mins ago',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>`
  },
  {
    id: 'act-3',
    text: 'Climate Change Report',
    time: '45 mins ago',
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>`
  }
];

// Model Logos Helpers
const MODEL_DETAILS: Record<string, { name: string, colorClass: string, iconHtml: string }> = {
  chatgpt: {
    name: 'ChatGPT 4o',
    colorClass: 'chatgpt-color',
    iconHtml: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2a10 10 0 0 0-10 10v1a5 5 0 0 0 5 5h1a4 4 0 0 1 4 4v0a2 2 0 0 0 4 0v-2a6 6 0 0 0-6-6H9a3 3 0 0 1-3-3v-1a6 6 0 0 1 12 0v1a3 3 0 0 1-3 3H14a6 6 0 0 0-6 6v2"/></svg>`
  },
  gemini: {
    name: 'Gemini 1.5 Pro',
    colorClass: 'gemini-color',
    iconHtml: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v18M3 12h18M12 3l4 4-4-4-4 4M12 21l4-4-4 4-4-4"/></svg>`
  },
  claude: {
    name: 'Claude 3.5 Sonnet',
    colorClass: 'claude-color',
    iconHtml: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg>`
  },
  perplexity: {
    name: 'Perplexity Pro',
    colorClass: 'perplexity-color',
    iconHtml: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8M12 8v8"/></svg>`
  },
  deepseek: {
    name: 'DeepSeek V3',
    colorClass: 'deepseek-color',
    iconHtml: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M2 12a10 10 0 0 1 18-6v12A10 10 0 0 1 2 12z"/></svg>`
  },
  llama: {
    name: 'Llama 3',
    colorClass: 'llama-color',
    iconHtml: '<span style="font-size: 10px;">L</span>'
  },
  qwen: {
    name: 'Qwen 2.5',
    colorClass: 'qwen-color',
    iconHtml: '<span style="font-size: 10px;">Q</span>'
  },
  groq: {
    name: 'Groq',
    colorClass: 'groq-color',
    iconHtml: '<span style="font-size: 10px;">Q</span>'
  }
};

// State for active metrics visible on chart
let visibleMetrics = {
  accuracy: true,
  speed: true,
  cost: true
};

// Selected file state
let selectedFile: File | null = null;
let currentTab: string = 'file';

// --- ELEMENT REFERENCES ---

const themeCheckbox = document.getElementById('theme-checkbox') as HTMLInputElement;
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const modelCheckcards = document.querySelectorAll('.model-check-card');
const modelCheckboxes = document.querySelectorAll('.model-checkbox') as NodeListOf<HTMLInputElement>;
const searchInput = document.getElementById('search-benchmarks') as HTMLInputElement;
const runBenchmarkBtn = document.getElementById('run-benchmark-btn') as HTMLButtonElement;
const advSettingsToggle = document.getElementById('adv-settings-toggle') as HTMLButtonElement;
const advSettingsPane = document.getElementById('adv-settings-pane') as HTMLDivElement;

const settingTemp = document.getElementById('setting-temp') as HTMLInputElement;
const settingTokens = document.getElementById('setting-tokens') as HTMLInputElement;
const valTemp = document.getElementById('val-temp') as HTMLSpanElement;
const valTokens = document.getElementById('val-tokens') as HTMLSpanElement;

// File Upload elements
const selectFileBtn = document.getElementById('select-file-btn') as HTMLButtonElement;
const fileInput = document.getElementById('file-input') as HTMLInputElement;
const dragDropZone = document.getElementById('drag-drop-zone') as HTMLDivElement;
const uploadProgressContainer = document.getElementById('upload-progress-container') as HTMLDivElement;
const uploadedFilename = document.getElementById('uploaded-filename') as HTMLSpanElement;
const uploadPct = document.getElementById('upload-pct') as HTMLSpanElement;
const uploadProgressFill = document.getElementById('upload-progress-fill') as HTMLDivElement;

// DOM rendering target elements
const benchmarksTableBody = document.getElementById('benchmarks-table-body') as HTMLTableSectionElement;
const activityListContainer = document.getElementById('activity-list-container') as HTMLDivElement;

// KPI val displays
const kpiTotalVal = document.getElementById('kpi-total-val') as HTMLSpanElement;
const kpiAccuracyVal = document.getElementById('kpi-accuracy-val') as HTMLSpanElement;
const kpiTimeVal = document.getElementById('kpi-time-val') as HTMLSpanElement;
const kpiCostVal = document.getElementById('kpi-cost-val') as HTMLSpanElement;

// Chart targets
const chartLegend = document.getElementById('chart-legend') as HTMLDivElement;
const chartContainer = document.getElementById('performance-chart-container') as HTMLDivElement;

// Textareas
const mainTextarea = document.getElementById('benchmark-textarea') as HTMLTextAreaElement;
const charCounterVal = document.getElementById('char-count') as HTMLSpanElement;
const pasteTextarea = document.getElementById('benchmark-text-paste') as HTMLTextAreaElement;
const pasteCharCounterVal = document.getElementById('paste-char-count') as HTMLSpanElement;

// --- INITIALIZATION ---

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderBenchmarksTable();
  renderActivities();
  updateKPIs();
  renderChart();
  setupEventListeners();
});

// --- STATE MANAGERS & RENDERERS ---

// Theme Manager
function initTheme() {
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    document.body.classList.add('dark-theme');
    document.body.classList.remove('light-theme');
    if (themeCheckbox) themeCheckbox.checked = true;
  } else {
    document.body.classList.add('light-theme');
    document.body.classList.remove('dark-theme');
    if (themeCheckbox) themeCheckbox.checked = false;
  }
}

// Render Table
function renderBenchmarksTable(filter: string = '') {
  if (!benchmarksTableBody) return;
  benchmarksTableBody.innerHTML = '';
  
  const query = filter.toLowerCase().trim();
  const filtered = benchmarks.filter(b => 
    b.name.toLowerCase().includes(query) || 
    b.bestModel.toLowerCase().includes(query) || 
    b.type.toLowerCase().includes(query)
  );

  if (filtered.length === 0) {
    benchmarksTableBody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 32px; color: var(--text-muted);">No benchmarks found matching "${filter}"</td></tr>`;
    return;
  }

  filtered.forEach(bench => {
    // Generate avatar overlaps
    let avatarsHtml = '';
    const maxVisible = 3;
    const modelKeys = bench.models;
    
    modelKeys.slice(0, maxVisible).forEach(mKey => {
      const details = MODEL_DETAILS[mKey];
      if (details) {
        avatarsHtml += `<div class="model-avatar-bubble ${details.colorClass}" title="${details.name}">${details.iconHtml}</div>`;
      }
    });

    if (modelKeys.length > maxVisible) {
      avatarsHtml += `<div class="model-avatar-bubble more-bubble">+${modelKeys.length - maxVisible}</div>`;
    }

    // Determine Best Model Badge class
    let badgeClass = 'chatgpt-pill';
    const bName = bench.bestModel.toLowerCase();
    if (bName.includes('gemini')) badgeClass = 'gemini-pill';
    else if (bName.includes('claude')) badgeClass = 'claude-pill';
    else if (bName.includes('perplexity')) badgeClass = 'perplexity-pill';
    else if (bName.includes('deepseek')) badgeClass = 'deepseek-pill';

    // Format Score color
    let scoreColorClass = 'high';
    if (bench.accuracy < 85) scoreColorClass = 'low';
    else if (bench.accuracy < 92) scoreColorClass = 'mid';

    // File/Text icon details
    let docIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;
    if (bench.type.toLowerCase().includes('text')) {
      docIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>`;
    } else if (bench.type.toLowerCase().includes('url') || bench.type.toLowerCase().includes('link')) {
      docIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
    } else if (bench.type.toLowerCase().includes('csv')) {
      docIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line><line x1="15" y1="3" x2="15" y2="21"></line><line x1="3" y1="9" x2="21" y2="9"></line><line x1="3" y1="15" x2="21" y2="15"></line></svg>`;
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>
        <div class="benchmark-name-cell">
          <div class="doc-icon-wrapper">${docIcon}</div>
          <div class="bench-title-info">
            <span class="bench-title-text" title="${bench.name}">${bench.name}</span>
            <span class="bench-type-text">${bench.type}</span>
          </div>
        </div>
      </td>
      <td>
        <div class="model-avatar-group">${avatarsHtml}</div>
      </td>
      <td>
        <span class="best-model-pill ${badgeClass}">${bench.bestModel}</span>
      </td>
      <td>
        <span class="table-score ${scoreColorClass}">${bench.accuracy.toFixed(1)}%</span>
      </td>
      <td>
        <span class="table-duration">${bench.responseTime.toFixed(2)}s</span>
      </td>
      <td>
        <span class="table-date">${bench.date}</span>
      </td>
      <td>
        <button class="table-action-btn delete-benchmark-btn" data-benchmark-id="${bench.id}" title="Delete benchmark" aria-label="Delete ${bench.name}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
        </button>
      </td>
    `;
    benchmarksTableBody.appendChild(row);
  });
}

// Render Activities
function renderActivities() {
  if (!activityListContainer) return;
  activityListContainer.innerHTML = '';
  
  activities.forEach(act => {
    const item = document.createElement('div');
    item.className = 'activity-item';
    item.innerHTML = `
      <div class="activity-icon-box">${act.icon}</div>
      <div class="activity-details">
        <span class="activity-text" title="${act.text}">${act.text}</span>
        <span class="activity-time">${act.time}</span>
      </div>
    `;
    activityListContainer.appendChild(item);
  });
}

// Update KPIs
function updateKPIs() {
  if (benchmarks.length === 0) return;

  const total = benchmarks.length;
  const avgAccuracy = benchmarks.reduce((sum, b) => sum + b.accuracy, 0) / total;
  const avgResponse = benchmarks.reduce((sum, b) => sum + b.responseTime, 0) / total;
  
  // Simulated overall costs incrementing with entries
  const simulatedCost = 23.47 + (total - 5) * 1.84;

  if (kpiTotalVal) kpiTotalVal.innerText = total.toString();
  if (kpiAccuracyVal) kpiAccuracyVal.innerText = avgAccuracy.toFixed(1) + '%';
  if (kpiTimeVal) kpiTimeVal.innerText = avgResponse.toFixed(2) + 's';
  if (kpiCostVal) kpiCostVal.innerText = '$' + simulatedCost.toFixed(2);
}

// --- DYNAMIC SVG CHART COMPONENT ---

function renderChart() {
  if (!chartContainer) return;
  chartContainer.innerHTML = '';

  const chartWidth = chartContainer.clientWidth || 480;
  const chartHeight = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const drawWidth = chartWidth - paddingLeft - paddingRight;
  const drawHeight = chartHeight - paddingTop - paddingBottom;

  // Chart models X scale (5 entries)
  const models = ['ChatGPT', 'Gemini', 'Claude', 'Perplexity', 'DeepSeek'];
  
  // Data sets matching model indices
  const dataAccuracy = [94.2, 91.7, 86.3, 87.9, 83.5]; // in %
  const dataSpeed = [2.18, 1.95, 2.71, 3.14, 2.05];     // in s
  const dataCost = [0.12, 0.08, 0.22, 0.15, 0.03];      // in $

  // Scalers
  const getX = (index: number) => paddingLeft + (index / (models.length - 1)) * drawWidth;
  
  // Normalization limits
  const minAcc = 75, maxAcc = 100;
  const minSpd = 1.0, maxSpd = 4.0;
  const minCst = 0.0, maxCst = 0.3;

  const getYAcc = (val: number) => paddingTop + drawHeight - ((val - minAcc) / (maxAcc - minAcc)) * drawHeight;
  const getYSpd = (val: number) => paddingTop + drawHeight - ((val - minSpd) / (maxSpd - minSpd)) * drawHeight;
  const getYCst = (val: number) => paddingTop + drawHeight - ((val - minCst) / (maxCst - minCst)) * drawHeight;

  // Create SVG element
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('width', '100%');
  svg.setAttribute('height', '100%');
  svg.setAttribute('viewBox', `0 0 ${chartWidth} ${chartHeight}`);
  svg.classList.add('chart-svg');

  // Draw Grid Lines (Horizontal & Vertical)
  // Horizontal grid lines (4 lines)
  for (let i = 0; i <= 4; i++) {
    const yVal = paddingTop + (i / 4) * drawHeight;
    const grid = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    grid.setAttribute('x1', paddingLeft.toString());
    grid.setAttribute('y1', yVal.toString());
    grid.setAttribute('x2', (chartWidth - paddingRight).toString());
    grid.setAttribute('y2', yVal.toString());
    grid.classList.add('grid-line');
    svg.appendChild(grid);
  }

  // Draw X Axis Model Labels
  models.forEach((model, i) => {
    const xVal = getX(i);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', xVal.toString());
    text.setAttribute('y', (chartHeight - 8).toString());
    text.setAttribute('text-anchor', 'middle');
    text.classList.add('chart-axis-text');
    text.textContent = model;
    svg.appendChild(text);
  });

  // Calculate Bezier Paths for curves
  const getBezierPath = (pts: {x: number, y: number}[]) => {
    if (pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i];
      const p1 = pts[i+1];
      // Smooth control points
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + 2 * (p1.x - p0.x) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  // Compile points
  const pointsAcc = dataAccuracy.map((v, i) => ({ x: getX(i), y: getYAcc(v) }));
  const pointsSpd = dataSpeed.map((v, i) => ({ x: getX(i), y: getYSpd(v) }));
  const pointsCst = dataCost.map((v, i) => ({ x: getX(i), y: getYCst(v) }));

  // Draw Accuracy Curve
  if (visibleMetrics.accuracy) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', getBezierPath(pointsAcc));
    path.classList.add('line-accuracy', 'glow-acc');
    svg.appendChild(path);
  }

  // Draw Speed Curve
  if (visibleMetrics.speed) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', getBezierPath(pointsSpd));
    path.classList.add('line-speed', 'glow-spd');
    svg.appendChild(path);
  }

  // Draw Cost Curve
  if (visibleMetrics.cost) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', getBezierPath(pointsCst));
    path.classList.add('line-cost', 'glow-cst');
    svg.appendChild(path);
  }

  // Interactive tooltip helper
  const createTooltip = (x: number, y: number, index: number) => {
    // Remove old tooltips
    const old = chartContainer.querySelector('.chart-tooltip');
    if (old) old.remove();

    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;

    tooltip.innerHTML = `
      <div class="tooltip-title">${models[index]} Metrics</div>
      <div class="tooltip-row acc"><span>Accuracy:</span> <span>${dataAccuracy[index]}%</span></div>
      <div class="tooltip-row spd"><span>Speed:</span> <span>${dataSpeed[index]}s</span></div>
      <div class="tooltip-row cst"><span>Cost:</span> <span>$${dataCost[index].toFixed(2)}</span></div>
    `;
    chartContainer.appendChild(tooltip);
  };

  // Draw Interactive dots on the curve nodes
  const dotsGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  
  models.forEach((_, i) => {
    const xVal = getX(i);
    
    // Draw vertical hover guide trigger zone
    const hoverLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    hoverLine.setAttribute('x1', xVal.toString());
    hoverLine.setAttribute('y1', paddingTop.toString());
    hoverLine.setAttribute('x2', xVal.toString());
    hoverLine.setAttribute('y2', (paddingTop + drawHeight).toString());
    hoverLine.setAttribute('stroke', 'transparent');
    hoverLine.setAttribute('stroke-width', '24');
    hoverLine.style.cursor = 'pointer';

    hoverLine.addEventListener('mouseenter', () => {
      // Find highest active node to display tooltip above
      let tooltipY = getYAcc(dataAccuracy[i]);
      if (!visibleMetrics.accuracy) {
        tooltipY = visibleMetrics.speed ? getYSpd(dataSpeed[i]) : getYCst(dataCost[i]);
      }
      createTooltip(xVal, tooltipY, i);
    });

    hoverLine.addEventListener('mouseleave', () => {
      const t = chartContainer.querySelector('.chart-tooltip');
      if (t) t.remove();
    });

    svg.appendChild(hoverLine);

    // Accuracy Dot
    if (visibleMetrics.accuracy) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', xVal.toString());
      dot.setAttribute('cy', getYAcc(dataAccuracy[i]).toString());
      dot.classList.add('chart-dot', 'dot-acc');
      dotsGroup.appendChild(dot);
    }

    // Speed Dot
    if (visibleMetrics.speed) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', xVal.toString());
      dot.setAttribute('cy', getYSpd(dataSpeed[i]).toString());
      dot.classList.add('chart-dot', 'dot-spd');
      dotsGroup.appendChild(dot);
    }

    // Cost Dot
    if (visibleMetrics.cost) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', xVal.toString());
      dot.setAttribute('cy', getYCst(dataCost[i]).toString());
      dot.classList.add('chart-dot', 'dot-cst');
      dotsGroup.appendChild(dot);
    }
  });

  svg.appendChild(dotsGroup);
  chartContainer.appendChild(svg);
}

// Re-draw chart on window resize to ensure full responsiveness
let resizeTimer: any;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    renderChart();
  }, 100);
});

function showView(view: string) {
  const welcomeSection = document.querySelector('.welcome-section');
  const kpiGrid = document.querySelector('.kpi-grid');
  const newBenchmarkSection = document.getElementById('new-benchmark-section');
  const historySection = document.getElementById('history-section');
  const rightColumn = document.querySelector('.column-right');

  const isNewBenchmark = view === 'new-benchmark';
  const isHistory = view === 'history';
  welcomeSection?.classList.toggle('view-hidden', isNewBenchmark || isHistory);
  kpiGrid?.classList.toggle('view-hidden', isNewBenchmark || isHistory);
  rightColumn?.classList.toggle('view-hidden', isNewBenchmark || isHistory);
  newBenchmarkSection?.classList.toggle('view-hidden', isHistory);
  historySection?.classList.toggle('view-hidden', isNewBenchmark);
}

function activateNavigation(view: string) {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-nav') === view);
  });
  showView(view);
}

// --- INTERACTIVE EVENT HANDLERS & LISTENERS ---

function setupEventListeners() {
  
  // Theme Switching
  if (themeCheckbox) {
    themeCheckbox.addEventListener('change', () => {
      if (themeCheckbox.checked) {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.add('light-theme');
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
      // Re-draw chart to align grid styles correctly in dark mode
      renderChart();
    });
  }

  // Sidebar navigation transitions
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      showView(item.getAttribute('data-nav') || 'dashboard');
    });
  });

  const viewAllLink = document.getElementById('view-all-benchmarks-link');
  if (viewAllLink) {
    viewAllLink.addEventListener('click', (event) => {
      event.preventDefault();
      activateNavigation('history');
    });
  }

  const viewHistoryBtn = document.getElementById('view-history-btn');
  if (viewHistoryBtn) {
    viewHistoryBtn.addEventListener('click', () => activateNavigation('history'));
  }

  // Tab Selection Event
  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.currentTarget as HTMLButtonElement;
      const tabName = target.getAttribute('data-tab');
      if (!tabName) return;

      currentTab = tabName;

      // Update Active Classes on Buttons
      tabBtns.forEach(b => b.classList.remove('active'));
      target.classList.add('active');

      // Show/Hide relevant panes
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `tab-${tabName}`) {
          pane.classList.add('active');
        }
      });
    });
  });

  // Character Counter details
  if (mainTextarea && charCounterVal) {
    mainTextarea.addEventListener('input', () => {
      charCounterVal.innerText = mainTextarea.value.length.toString();
    });
  }

  if (pasteTextarea && pasteCharCounterVal) {
    pasteTextarea.addEventListener('input', () => {
      pasteCharCounterVal.innerText = pasteTextarea.value.length.toString();
    });
  }

  // Selectable Model Card handlers
  modelCheckcards.forEach(card => {
    const checkbox = card.querySelector('.model-checkbox') as HTMLInputElement;
    if (checkbox) {
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          card.classList.add('checked');
        } else {
          card.classList.remove('checked');
        }
      });
    }
  });

  // Expand the additional model choices
  const modelDropdownBtn = document.getElementById('model-more-dropdown-btn') as HTMLButtonElement;
  if (modelDropdownBtn) {
    modelDropdownBtn.addEventListener('click', () => {
      const isExpanded = modelDropdownBtn.getAttribute('aria-expanded') === 'true';
      modelDropdownBtn.setAttribute('aria-expanded', (!isExpanded).toString());
      modelDropdownBtn.querySelector('span')!.textContent = isExpanded ? 'More' : 'Less';
      document.querySelectorAll('.extra-model').forEach(model => model.classList.toggle('hidden', isExpanded));
    });
  }

  if (benchmarksTableBody) {
    benchmarksTableBody.addEventListener('click', (event) => {
      const deleteButton = (event.target as HTMLElement).closest('.delete-benchmark-btn') as HTMLButtonElement | null;
      if (!deleteButton) return;
      const benchmarkId = deleteButton.dataset.benchmarkId;
      if (!benchmarkId) return;
      benchmarks = benchmarks.filter(benchmark => benchmark.id !== benchmarkId);
      saveBenchmarks();
      renderBenchmarksTable(searchInput?.value || '');
      updateKPIs();
      showToast('Benchmark deleted.');
    });
  }

  // Advanced settings expansion panel
  if (advSettingsToggle && advSettingsPane) {
    advSettingsToggle.addEventListener('click', () => {
      advSettingsPane.classList.toggle('hidden');
    });
  }

  // Sliders value feedback labels
  if (settingTemp && valTemp) {
    settingTemp.addEventListener('input', () => {
      valTemp.innerText = settingTemp.value;
    });
  }

  if (settingTokens && valTokens) {
    settingTokens.addEventListener('input', () => {
      valTokens.innerText = settingTokens.value;
    });
  }

  // File Upload Handlers
  if (selectFileBtn && fileInput) {
    selectFileBtn.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files[0]) {
        handleFileSelection(fileInput.files[0]);
      }
    });
  }

  // Drag and Drop Zone events
  if (dragDropZone) {
    dragDropZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dragDropZone.classList.add('drag-over');
    });

    dragDropZone.addEventListener('dragleave', () => {
      dragDropZone.classList.remove('drag-over');
    });

    dragDropZone.addEventListener('drop', (e) => {
      e.preventDefault();
      dragDropZone.classList.remove('drag-over');
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileSelection(e.dataTransfer.files[0]);
      }
    });
  }

  // Filter metrics legend on Performance Overview Chart
  if (chartLegend) {
    chartLegend.querySelectorAll('.legend-item').forEach(item => {
      item.addEventListener('click', () => {
        const metric = item.getAttribute('data-metric') as keyof typeof visibleMetrics;
        if (!metric) return;

        // Toggle state
        visibleMetrics[metric] = !visibleMetrics[metric];
        
        // Toggle visual indicators
        if (visibleMetrics[metric]) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }

        // Re-render chart paths
        renderChart();
      });
    });
  }

  // Table Filtering search box
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      renderBenchmarksTable(searchInput.value);
    });
  }

  // Upgrade Plan prompt
  const upgradeBtn = document.querySelector('[data-nav="upgrade"]');
  if (upgradeBtn) {
    upgradeBtn.addEventListener('click', () => {
      alert("AI Bench Pro: Thank you for being a premium subscriber!");
    });
  }

  // Run Benchmark logic
  if (runBenchmarkBtn) {
    runBenchmarkBtn.addEventListener('click', (e) => {
      e.preventDefault();
      handleRunBenchmark();
    });
  }

  showView('dashboard');
}

// Handle File upload sequence
function handleFileSelection(file: File) {
  selectedFile = file;
  
  if (uploadedFilename && uploadPct && uploadProgressFill && uploadProgressContainer) {
    uploadedFilename.innerText = file.name;
    uploadProgressContainer.classList.remove('hidden');
    
    // Simulate uploading sequence
    let pct = 0;
    uploadProgressFill.style.width = '0%';
    uploadPct.innerText = '0%';

    const interval = setInterval(() => {
      pct += 10;
      uploadProgressFill.style.width = `${pct}%`;
      uploadPct.innerText = `${pct}%`;

      if (pct >= 100) {
        clearInterval(interval);
        uploadPct.innerText = 'Upload Completed';
        uploadPct.style.color = 'var(--color-success)';
      }
    }, 80);
  }
}

// Handle Run Benchmark Action
async function handleRunBenchmark() {
  // 1. Validate models selected
  const activeModels: string[] = [];
  modelCheckboxes.forEach(chk => {
    if (chk.checked) activeModels.push(chk.value);
  });

  if (activeModels.length === 0) {
    alert("Please select at least one AI model to run the benchmark.");
    return;
  }

  // 2. Validate content inputs depending on the active tab
  let name = 'Benchmark Simulation';
  let type = 'Text Prompt';
  let message = '';
  
  if (currentTab === 'file') {
    const pasteVal = pasteTextarea.value.trim();
    if (selectedFile) {
      name = selectedFile.name;
      message = selectedFile.name;
      type = selectedFile.type || 'PDF Document';
      // Clean up types names
      if (type.includes('pdf')) type = 'PDF Document';
      else if (type.includes('word') || type.includes('officedocument')) type = 'Word Doc';
      else if (type.includes('spreadsheet') || name.endsWith('.csv')) type = 'CSV File';
      else if (type.includes('text')) type = 'Text Document';
      else if (type.startsWith('image/')) type = 'Image File';
      else type = 'File Document';
    } else if (pasteVal) {
      message = pasteVal;
      name = pasteVal.substring(0, 30) + (pasteVal.length > 30 ? '...' : '');
      type = 'Text Prompt';
    } else {
      alert("Please upload a file or paste text first.");
      return;
    }
  } else if (currentTab === 'text') {
    const textVal = mainTextarea.value.trim();
    if (!textVal) {
      alert("Please type a text prompt to evaluate.");
      return;
    }
    message = textVal;
    name = textVal.substring(0, 30) + (textVal.length > 30 ? '...' : '');
    type = 'Text Input';
  } else if (currentTab === 'url') {
    const urlVal = (document.getElementById('benchmark-url') as HTMLInputElement).value.trim();
    if (!urlVal) {
      alert("Please input a valid URL endpoint.");
      return;
    }
    message = urlVal;
    name = urlVal.replace(/^https?:\/\/(www\.)?/, '').substring(0, 30);
    type = 'URL Endpoint';
  }

  // 3. Trigger button loader animation
  const origBtnText = runBenchmarkBtn.innerHTML;
  runBenchmarkBtn.disabled = true;
  runBenchmarkBtn.style.opacity = '0.75';
  runBenchmarkBtn.innerHTML = `
    <svg class="spinner" width="16" height="16" viewBox="0 0 50 50" style="animation: rotate 1s linear infinite; margin-right: 8px;">
      <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" stroke-width="5" stroke-dasharray="80, 200" stroke-linecap="round"></circle>
    </svg>
    <span>Evaluating Models...</span>
  `;

  // Insert keyframes dynamically for loader spinner if not already present
  if (!document.getElementById('spinner-keyframes')) {
    const style = document.createElement('style');
    style.id = 'spinner-keyframes';
    style.innerHTML = `
      @keyframes rotate { 100% { transform: rotate(360deg); } }
    `;
    document.head.appendChild(style);
  }

  try {
    const response = await fetch("http://localhost:5678/webhook-test/ai-chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Unable to reach the chat webhook.', error);
    runBenchmarkBtn.disabled = false;
    runBenchmarkBtn.style.opacity = '1';
    runBenchmarkBtn.innerHTML = origBtnText;
    showToast('Could not connect to the chat webhook.');
    return;
  }

  // 4. Simulate evaluation processing phase (2.5 seconds)
  setTimeout(() => {
    // Calculate simulated results
    const accuracy = 82 + Math.random() * 15; // 82% to 97%
    const responseTime = 1.2 + Math.random() * 2.2; // 1.2s to 3.4s
    
    // Choose best model among the selected ones
    const bestModelKey = activeModels[Math.floor(Math.random() * activeModels.length)];
    const bestModelName = MODEL_DETAILS[bestModelKey]?.name || 'ChatGPT 4o';

    const newBenchmark: Benchmark = {
      id: `${Date.now()}`,
      name: name,
      type: type,
      models: activeModels,
      bestModel: bestModelName,
      accuracy: accuracy,
      responseTime: responseTime,
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Insert into state list at the top
    benchmarks.unshift(newBenchmark);
    saveBenchmarks();

    // Create Activity entry
    const newActivity: Activity = {
      id: 'act-' + (activities.length + 1),
      text: name,
      time: 'Just now',
      icon: currentTab === 'file' ? 
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>` : 
        `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg>`
    };
    activities.unshift(newActivity);
    if (activities.length > 3) activities.pop(); // keep length consistent

    // 5. Update UI
    renderBenchmarksTable();
    renderActivities();
    updateKPIs();
    renderChart();

    // Reset Form state
    if (mainTextarea) mainTextarea.value = '';
    if (pasteTextarea) pasteTextarea.value = '';
    if (charCounterVal) charCounterVal.innerText = '0';
    if (pasteCharCounterVal) pasteCharCounterVal.innerText = '0';
    if (fileInput) fileInput.value = '';
    selectedFile = null;
    if (uploadProgressContainer) uploadProgressContainer.classList.add('hidden');

    // Restore Button
    runBenchmarkBtn.disabled = false;
    runBenchmarkBtn.style.opacity = '1';
    runBenchmarkBtn.innerHTML = origBtnText;

    // Toast notification
    showToast(`Benchmark completed! Best Model: ${bestModelName} (${accuracy.toFixed(1)}% accuracy)`);

  }, 2200);
}

// Utility Toast Alert
function showToast(message: string) {
  let toast = document.getElementById('benchmark-toast');
  if (toast) toast.remove();

  toast = document.createElement('div');
  toast.id = 'benchmark-toast';
  toast.style.position = 'fixed';
  toast.style.bottom = '24px';
  toast.style.right = '24px';
  toast.style.backgroundColor = 'var(--text-main)';
  toast.style.color = 'var(--bg-sidebar)';
  toast.style.padding = '12px 20px';
  toast.style.borderRadius = '8px';
  toast.style.boxShadow = 'var(--shadow-lg)';
  toast.style.fontSize = '0.85rem';
  toast.style.fontWeight = '600';
  toast.style.zIndex = '999';
  toast.style.display = 'flex';
  toast.style.alignItems = 'center';
  toast.style.gap = '8px';
  toast.style.animation = 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="color: var(--color-success);"><polyline points="20 6 9 17 4 12"></polyline></svg>
    <span>${message}</span>
  `;

  document.body.appendChild(toast);

  // Animate slide up keyframe details
  if (!document.getElementById('toast-keyframes')) {
    const style = document.createElement('style');
    style.id = 'toast-keyframes';
    style.innerHTML = `
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `;
    document.head.appendChild(style);
  }

  setTimeout(() => {
    if (toast) {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.5s ease';
      setTimeout(() => toast.remove(), 500);
    }
  }, 4000);
}
