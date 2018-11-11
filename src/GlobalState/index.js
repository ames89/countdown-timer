// Dependencies
import { addReducer, setGlobal } from 'reactn';

// Initial state
setGlobal({
  width: '100%',
  color: 'red',
  background: 'white'
});

// Reducers
addReducer('fetchData', () =>
  fetch('index.html')
    .then(response => response.text())
    .then(html => ({
      data: html
    }))
);

addReducer('incrementX', state => ({
  x: state.x + 1
}));

addReducer('decrementX', state => ({
  x: state.x - 1
}));
