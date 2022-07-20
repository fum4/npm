import { AppRouterState } from './types';

let pageHideListener;

const saveToSessionStorage = (state: AppRouterState): void => sessionStorage.setItem('routerState', JSON.stringify(state));

const persistOnPageHide = (state: AppRouterState): void => {
  if (pageHideListener) {
    window.removeEventListener('pagehide', pageHideListener);
  }

  pageHideListener = () => saveToSessionStorage(state);
  window.addEventListener('pagehide', pageHideListener, { once: true });
};

export default persistOnPageHide;
