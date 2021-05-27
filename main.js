// data가 json file을 동적으로 읽어오는데 시간이 걸리기 때문에 promise를 리턴한다.

// Fetch the items from the JSON file
function loadItems() {
  return fetch('data/data.json') // fetch로 파일의 경로나 url작성해서 데이터를 네트워크를 통해서 받아올 수 있다
    .then((response) => response.json()) // 데이터를 성공적으로 받아오면 response라는 object 전달. response body를 json object로 변환
    .then((json) => json.items) // json 안에 있는 items를 리턴
}

// Update the list with the given items
function displayItems(items) {
  // 받아온 items를 html로 표현해서 나타내면 됨.
  const container = document.querySelector('.items')
  container.innerHTML = items.map((item) => createHTMLString(item)).join('') // 받아온 items를 li로 만들어서 container에 추가할 것이다.
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item_thumbnail" />
        <span class="item_description">${item.gender}, ${item.size}</span>
    </li>
    `
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset
  const key = dataset.key
  const value = dataset.value

  if (key == null || value == null) {
    // key와 value가 없다면 그냥 종료
    return
  }

  const filtered = items.filter((item) => item[key] === value)
  displayItems(filtered) // 아이템에 해당하는 값이 우리가 원하는 value와 똑같은 아이들만 골라서 전달
}

function setEventlisteners(items) {
  const logo = document.querySelector('.logo')
  const buttons = document.querySelector('.buttons') // 이벤트위임
  logo.addEventListener('click', () => displayItems(items)) //로고가 선택되면 모든 아이템들이 보여질 수 있도록
  buttons.addEventListener('click', (event) => onButtonClick(event, items)) // 버튼이 클릭되면 이벤트가 처리될수 있도록 이벤트 전달
}

// main
loadItems()
  .then((items) => {
    displayItems(items) // html 아이템 보여주는것
    setEventlisteners(items) // 아이템들 필터링
  })
  .catch(console.log)
