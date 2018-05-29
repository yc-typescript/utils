import { loadScript } from '../src/loadScript';

declare const window: any;

test('Should load jssdk', async () => {
  document.head.innerHTML = ``;
  try {
    await loadScript('http://res.wx.qq.com/open/js/jweixin-1.2.0.js');
    expect(window.wx).toBeTruthy();
  } catch (e) {
    console.error(e);
  }
});
