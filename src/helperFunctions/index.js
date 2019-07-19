export const getUrlParams = () => {
  return new URLSearchParams(window.location.search)
}

//generating a unique id for new items
export const generateUUID = () => { // Public Domain/MIT
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now(); //use high-precision timer if available
  }
  return 'UUDI-xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
}

//trims stings to a give length
export const trimedString = (str, limiter) => {
  if (str.length <= limiter) return str.replace(/\n/g, ' ');//replace all line breaks
  const trimedStr = str.split(' ').reduce((limitedArray, word) => {
    if (limitedArray.join(' ').length + word.length < limiter) {
      limitedArray.push(word);
    }
    return limitedArray
  }, []).join(' ').replace(/\n/g, ' ') + ('...');
  return trimedStr
}

//turns numeric val into colors (from green to red)
export const getColor = (value) => {
  //value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",100%,50%)"].join("");
}

export const scrollToTarget = (targetId, scrollSpeed = 90, easing = 0.01, y, oldPageOff) => {
  let targetEl = document.getElementById(targetId);
  let targetOff = targetEl.offsetTop;
  let pageOff = window.pageYOffset;

  easing < 2 ? easing += 0.1 : easing -= 0.1;

  Math.abs(targetOff - pageOff) < Math.abs(y) ? y = Math.abs(targetOff - pageOff) : y = scrollSpeed * easing;
  if (targetOff < pageOff) {
    y *= -1;
  }
  window.scrollBy(0, y);

  oldPageOff = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

  if (Math.abs(targetOff - pageOff) > y && oldPageOff !== pageOff) {
    window.requestAnimationFrame(() => {
      scrollToTarget(targetId, scrollSpeed, easing, y, oldPageOff);
    });
  } else {
    scrollSpeed = 80;
    easing = 0.01
  };
}