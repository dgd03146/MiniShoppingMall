function loadItems() {
  return fetch('data/data.json') // fetch로 파일의 경로나 url작성해서 데이터를 네트워크를 통해서 받아올 수 있다
    .then((response) => response.json()) // 데이터를 성공적으로 받아오면 response라는 object 전달. response body를 json object로 변환
    .then((json) => json.items) // json 안에 있는 items를 리턴
}

function displayItems(items) {
  const container = document.querySelector('.displaybox');
  container.innerHTML = items.map((item) => createHTMLString(item)).join('');
}

function createHTMLString(item) {
  return `
    <li>
        <img src="${item.image}" alt="${item.type}" />
        <span>${item.gender}, ${item.size}size</span>
    </li>
    `;
}

function setEventlisteners(items){
  const logo = document.querySelector('.logo_Btn');
  const button = document.querySelector('.buttons');
  logo.addEventListener('click', () => displayItems(items));
  button.addEventListener('click', (event)=> onButtonClick(event, items));
}

function onButtonClick(event, items){
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;

  if(key === null || value == null){
    return;
  }

  const filtered = items.filter(item => item[key] === value);
  displayItems(filtered);
}


loadItems()
  .then((items) => {
    displayItems(items)
    setEventlisteners(items)
  }).catch(console.log())

