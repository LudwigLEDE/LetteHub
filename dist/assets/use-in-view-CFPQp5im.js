import{r as g}from"./index-_oXKQ1ms.js";import{r as p}from"./resolve-element-Ex3QWR4Z.js";const E={some:0,all:1};function I(s,r,{root:i,margin:c,amount:t="some"}={}){const f=p(s),n=new WeakMap,u=a=>{a.forEach(e=>{const l=n.get(e.target);if(e.isIntersecting!==!!l)if(e.isIntersecting){const d=r(e);typeof d=="function"?n.set(e.target,d):o.unobserve(e.target)}else l&&(l(e),n.delete(e.target))})},o=new IntersectionObserver(u,{root:i,rootMargin:c,threshold:typeof t=="number"?t:E[t]});return f.forEach(a=>o.observe(a)),()=>o.disconnect()}function m(s,{root:r,margin:i,amount:c,once:t=!1}={}){const[f,n]=g.useState(!1);return g.useEffect(()=>{if(!s.current||t&&f)return;const u=()=>(n(!0),t?void 0:()=>n(!1)),o={root:r&&r.current||void 0,margin:i,amount:c};return I(s.current,u,o)},[r,s,i,t,c]),f}export{m as u};