function arrand(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const allowEdit = process.env.REACT_APP_ALLOW_EDIT === 'true';

export{ allowEdit, arrand };
