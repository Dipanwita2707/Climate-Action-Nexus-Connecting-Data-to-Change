document.getElementById('game-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const policy = document.getElementById('policy').value;
  
    let result = '';
    switch (policy) {
      case 'reduce-emissions':
        result = 'You reduced emissions, but the impact will take years.';
        break;
      case 'increase-forestation':
        result = 'Forestation helps, but more drastic actions are needed!';
        break;
      case 'invest-renewable':
        result = 'Investing in renewable energy reduces long-term carbon footprint!';
        break;
      default:
        result = 'Unknown policy.';
    }
  
    document.getElementById('game-result').textContent = result;
  });
  