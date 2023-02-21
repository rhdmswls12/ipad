import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


// 장바구니
const basketStarterEl=document.querySelector('header .basket-starter')
const basketEl=basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function(event) {
  event.stopPropagation() //window 객체까지 event가 전파되는 것을 방지
  if (basketEl.classList.contains('show')) { //show 클래스가 없으면 false, 있으면 true
    //show 클래스가 붙어 있는 경우에는 메뉴 클릭 시 안 보이도록 해야 함
    hideBasket()
  } else {
    //show 클래스가 없는 경우 메뉴 클릭 시 보이도록 해야 함
    showBasket()
  } 
})
basketEl.addEventListener('click', function(event){
  event.stopPropagation()
})

window.addEventListener('click', function (){
  hideBasket()
})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}


// 검색!
const headerEl=document.querySelector('header')
const headerMenuEls=[...document.querySelectorAll('ul.menu > li')]
const searchWrapEl=headerEl.querySelector('.search-wrap')
const searchStarterEl=headerEl.querySelector('.search-starter')
const searchCloserEl=searchWrapEl.querySelector('.search-closer')
const searchShadowEl=searchWrapEl.querySelector('.shadow')
const searchInputEl=searchWrapEl.querySelector('input')
const searchDelayEl=[...searchWrapEl.querySelectorAll('li')]

searchStarterEl.addEventListener('click', showSearch)
searchCloserEl.addEventListener('click', function(event){
  event.stopPropagation()
  hideSearch()
})
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching') 
  stopScroll()
  headerMenuEls.reverse().forEach(function(el, index) { //el은 li태그들
    el.style.transitionDelay=index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEl.forEach(function(el, index){
    el.style.transitionDelay=index * .4 / searchDelayEl.length + 's'
  })
  setTimeout(function(){
    searchInputEl.focus() //사용자가 클릭하지 않고도 바로 검색내용 작성할 수 있도록
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function(el, index) { 
    el.style.transitionDelay=index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEl.reverse().forEach(function(el, index){
    el.style.transitionDelay=index * .4 / searchDelayEl.length + 's'
  })
  searchDelayEl.reverse() //뒤집었던 걸 다시 원래대로
  searchInputEl.value='' //검색바가 사라지면 검색 내용 사라지도록
}
function playScroll() {
  document.documentElement.classList.remove('fixed')
}
function stopScroll() {
  document.documentElement.classList.add('fixed')
}


//헤더 메뉴 토글!
const menuStarterEl=document.querySelector('header .menu-starter')
menuStarterEl.addEventListener('click',function(){
  if(headerEl.classList.contains('menuing')){
    headerEl.classList.remove('menuing')
    searchInputEl.value=''//헤더 메뉴 종료 시 빈문자로 초기화
    playScroll()
  } else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})


//헤더 검색!
const searchTextFieldEl=document.querySelector('header .textfield')
const searchCancelEl=document.querySelector('header .search-canceler')
searchTextFieldEl.addEventListener('click',function(){
  headerEl.classList.add('searching--mobile')
  searchInputEl.focus() //모바일 모드일 때 검색바가 바로 포커스 되도록
})
searchCancelEl.addEventListener('click',function(){
  headerEl.classList.remove('searching--mobile')
})


//데스크탑 모드에서 검색을 활성화한 후 모바일 모드 크기로 줄일 때 예외 처리
window.addEventListener('resize', function(){ //화면 자체의 크기가 변할 때마다
  if(window.innerWidth <= 740){ //모바일 모드에서
    headerEl.classList.remove('searching') //searching 클래스 제거
  } else { //태블릿/데스크탑 모드에서
    headerEl.classList.remove('searching--mobile') //searching--mobile 클래스 제거
  } 
})

//
const navEl=document.querySelector('nav')
const navMenuToggleEl=navEl.querySelector('.menu-toggler')
const navMenuShadowEl=navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function(){
  if(navEl.classList.contains('menuing')){
    hideNavMenu()
  } else {
    showNavMenu()
  }
})
navEl.addEventListener('click',function(event){ //navigation 영역을 클릭하는 것은 화면(=window영역)을 클릭하는 것이 아니도록
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click',hideNavMenu) //shadow 영역과
window.addEventListener('click', hideNavMenu) //window 영역 클릭 시 메뉴 사라지도록
function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}

// 요소의 가시성 관찰(어렵다..)
const io=new IntersectionObserver(function (entries){ //entries는 io.observe(el)로 등록된 모든 관찰 대상 배경
  entries.forEach(function (entry){ //관찰할 개별적인 대상들
    if(!entry.isIntersecting){ //대상이 가지고 있는 isIntersecting 속성이 true면 작업, false면 함수 종료
      return
    }
    entry.target.classList.add('show') //보이는 요소에는 show 클래스를 붙여줌  
  })
})
const infoEls=document.querySelectorAll('.info') //info 클래스를 전부 찾음
infoEls.forEach(function (el) { //info 요소들을 forEach로 돌면서
  io.observe(el)  //요소들을 관찰함. 이 요소들이 위에 있는 entries로 들어가는 것임
})


// 비디오 재생!
const video = document.querySelector('.stage video')
const playBtn = document.querySelector('.stage .controller--play')
const pauseBtn = document.querySelector('.stage .controller--pause')

playBtn.addEventListener('click', function(){
  video.play() //바로 재생 가능한 함수
  playBtn.classList.add('hide') //재생 버튼 누르면 재생 버튼은 바로 사라지도록
  pauseBtn.classList.remove('hide') //재생 버튼이 보인다는 것은 정지 버튼이 안 보였을 때여야 하므로 정지 버튼에 있던 hide 클래스는 없앰
})
pauseBtn.addEventListener('click', function(){
  video.pause()
  playBtn.classList.remove('hide')
  pauseBtn.classList.add('hide')
})


// '당신에게 맞는 iPad는?' 랜더링!
//textContent는 글자 내용 그대로, innerHTML은 실제 속성으로 들어감

const itemsEl=document.querySelector('section.compare .items') //itemsEl은 html 상에서 실제로 존재하는 items 클래스의 div 요소
ipads.forEach(function(ipad){
  const itemEl=document.createElement('div') //요소를 자바스크립트를 통해 생성
  itemEl.classList.add('item') //div에 클래스 item 생성
  
  let colorList=''
  ipad.colors.forEach(function(color){
    colorList+=`<li style="background-color:${color}"></li>`
  })

  /*itemEl.textContent=ipad.name */ //ipad데이터의 객체에 있는 name을 itemEl이 가지고 있는 div 요소의 text로 넣어줌. 
                               //itemEl는 js로 생성된 요소이므로 메모리상에서만 존재.
                               //이 요소를 실제 요소에 넣어줘야 하므로 itemsEl에 하나씩 넣어줘야 함(append 이용).
  itemEl.innerHTML=/* html */ `
  <div class="thumbnail">
    <img src="${ipad.thumbnail}" alt="${ipad.name}" />
  </div>
  <ul class="colors">
    ${colorList}
  </ul>
  <h3 class="name">${ipad.name}</h3>
  <p class="tagline">${ipad.tagline}</p>
  <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p> <!--toLocaleString: 미국의 숫자 표현 방식으로 바꿔줌-->
  <button class="btn">구입하기</button>
  <a href="${ipad.url}" class="link">더 알아보기</a>
  `
  
  itemsEl.append(itemEl) //실제 존재하는 요소인 itemsEl에 js로 만든 itemEl을 넣어줌.
                         //4개의 item이라는 클래스를 가진 div 요소가 items라는 div 요소에 하나씩 들어감
})


const navigationsEl=document.querySelector('footer .navigations')
navigations.forEach(function(nav){
  const mapEl=document.createElement('div')
  mapEl.classList.add('map')

  let mapList=''
  nav.maps.forEach(function(map){
    mapList+=/* html */`<li>
    <a href="${map.url}">${map.name}</a>
    `
  })

  mapEl.innerHTML=/* html */ `
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  </ul>
  `

  navigationsEl.append(mapEl)
})


const thisYearEl=document.querySelector('span.this-year')
thisYearEl.textContent=new Date().getFullYear() //현재 년도


const mapEls=document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El=el.querySelector('h3')
  h3El.addEventListener('click', function(){
    el.classList.toggle('active')
  })
})