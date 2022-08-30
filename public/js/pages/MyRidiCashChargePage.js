import { createElement } from '../app.js';
import { Header, Footer, MyLeftMenu, MyRidiCash } from '../components/index.js';

const MyRidiCashChargePage = () =>
  createElement(`
${Header()}
<div class="my__container">
  <div class="my__container__contents">
    <div class="my__left__menu__container">
      ${MyLeftMenu('/myridicharge')}
    </div>
    ${MyRidiCash('/myridicharge')}
  </div>
</div>
${Footer()}
`);

export default MyRidiCashChargePage;
