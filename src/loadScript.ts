export function loadScript(url: string) {
  const script: any = document.createElement('script');
  script.type = 'text/javascript';
  return new Promise((resolve, reject) => {
    script.onload = () => resolve();
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}