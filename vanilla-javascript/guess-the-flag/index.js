const flagsElement = document.getElementById('flags');

fetch('flags.json')
  .then((response) => response.json())
  .then((flags) => {
    flags.forEach((flag) => {
      const flagContainer = document.createElement('div');
      flagContainer.innerHTML = `
        <img src='${flag.flagUrl}' loading='lazy' />
        <div>
          <h3>continent: ${flag.continent}</h3>
          <h3>country: ${flag.flagName}</h3>
        </div>
      `;

      flagsElement.appendChild(flagContainer);
    });
  });
