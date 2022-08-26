import { Home, NotFound, Webtoon, MyPage, Login, Signup, MyRidiCashPage, Viewer } from './pages/index.js';

import state from './state.js';

const $root = document.getElementById('root');

const routes = [
  { path: '/', component: Home },
  { path: '/webtoon', component: Webtoon },
  { path: '/webtoon/:id', component: Viewer },
  { path: '/mypage', component: MyPage },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
  { path: '/myridicash', component: MyRidiCashPage },
];

const render = async path => {
  try {
    let paramsId = 0;

    const component =
      routes.find(route => {
        let check = true;
        const targetPath = path.split('/').slice(1);
        const routePath = route.path.split('/').slice(1);

        if (targetPath.length !== routePath.length) {
          check = false;
          return check;
        }

        if (targetPath.every((string, index) => string === routePath[index])) return check;

        targetPath.forEach((str, i) => {
          if (str !== routePath[i]) {
            if (routePath[i][0] === ':') {
              paramsId = str;
            } else {
              check = false;
            }
          }
        });
        return check;
      })?.component || NotFound;

    $root.replaceChildren(await component(paramsId));
  } catch (err) {
    console.error(err);
  }
};

$root.addEventListener('click', async e => {
  if (!e.target.closest('a')) return;
  e.preventDefault();

  const { data: auth } = await axios.get('/auth');
  if (!auth) localStorage.removeItem('token');

  const path = e.target.closest('a').getAttribute('href');
  const { title } = e.target.closest('a').dataset;

  // pushState는 주소창의 url을 변경하지만 HTTP 요청을 서버로 전송하지는 않는다.
  window.history.pushState({}, null, path);

  localStorage.setItem('webtoonTitle', title);

  state.webtoonTitle = title;

  render(path);
});

window.addEventListener('popstate', async () => {
  const { data: auth } = await axios.get('/auth');
  if (!auth) localStorage.removeItem('token');

  render(window.location.pathname);
});

window.addEventListener('DOMContentLoaded', async () => {
  const { data: auth } = await axios.get('/auth');
  if (!auth) localStorage.removeItem('token');

  render(window.location.pathname);
});

// 토큰만료시(어떻게아냐) 로컬스토리지 삭제
