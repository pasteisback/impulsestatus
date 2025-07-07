async function fetchData() {
  const response = await fetch('data.json');
  const data = await response.json();

  const banner = document.getElementById('status-banner');
  banner.textContent = data.banner === 'green' ? 'All Systems Operational' :
                      data.banner === 'yellow' ? 'Some Systems Degraded' : 'Major Outage';
  banner.style.backgroundColor = data.banner;

  const sectionDiv = document.getElementById('status-sections');
  sectionDiv.innerHTML = '';
  for (const [group, items] of Object.entries(data.services)) {
    const section = document.createElement('div');
    section.className = 'feature';
    const title = document.createElement('h3');
    title.textContent = group;
    section.appendChild(title);
    for (const [service, status] of Object.entries(items)) {
      const item = document.createElement('p');
      item.textContent = `${service}: ${status}`;
      item.style.color = status === 'Operational' ? 'limegreen' : 'orange';
      section.appendChild(item);
    }
    sectionDiv.appendChild(section);
  }

  const historyDiv = document.getElementById('history-section');
  historyDiv.innerHTML = '';
  data.history.forEach(incident => {
    const item = document.createElement('div');
    item.className = 'feature';
    item.innerHTML = `
      <h3>${incident.status} Incident</h3>
      <p><strong>Time:</strong> ${new Date(incident.time).toLocaleString()}</p>
      <p><strong>Affected:</strong> ${incident.components.join(', ')}</p>
      <p><strong>Resolved:</strong> ${incident.resolved}</p>
      <p>${incident.message}</p>
    `;
    historyDiv.appendChild(item);
  });
}

fetchData();
