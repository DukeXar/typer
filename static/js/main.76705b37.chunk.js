(this.webpackJsonptyper=this.webpackJsonptyper||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var o=n(1),c=n.n(o),s=n(3),i=n.n(s),r=(n(12),n(4)),l=n(5),a=n(7),u=n(6),d=(n(13),n(0));function h(e){var t=e.selected,n=e.letter;return Object(d.jsx)("div",{className:t?"letters-cell letters-cell-selected":"letters-cell",children:n})}function p(e){var t=e.kind,n=e.onClick,o=e.letter;return Object(d.jsx)("div",{className:"control-button control-button-".concat(t),children:Object(d.jsx)("button",{className:"control-button-inner",onClick:n,children:o})})}function f(e){var t=e.onLeft,n=e.onRight,o=e.onUp,c=e.onDown,s=e.onCenter,i=e.onBackspace;return Object(d.jsxs)("div",{className:"controller",children:[Object(d.jsx)(p,{kind:"left",letter:"\u2b05\ufe0f",onClick:t}),Object(d.jsx)(p,{kind:"right",letter:"\u27a1\ufe0f",onClick:n}),Object(d.jsx)(p,{kind:"up",letter:"\u2b06\ufe0f",onClick:o}),Object(d.jsx)(p,{kind:"down",letter:"\u2b07\ufe0f",onClick:c}),Object(d.jsx)(p,{kind:"center",letter:"\ud83d\udfe2",onClick:s}),Object(d.jsx)(p,{kind:"backspace",letter:"\u23ee",onClick:i})]})}var j=["\u0410\u0411\u0412\u0413\u0414".split(""),"\u0415\u0401\u0416\u0417\u0418".split(""),"\u0419\u041a\u041b\u041c\u041d".split(""),"\u041e\u041f\u0420\u0421\u0422".split(""),"\u0423\u0424\u0425\u0426\u0427".split(""),"\u0428\u0429\u042a\u042b\u042c".split(""),"\u042d\u042e\u042f.,".split("")];function k(e){var t=e.text;return Object(d.jsx)("div",{className:"display-text",children:t})}var b="SELECTING_ROW",v="SELECTING_COL",m=function(e){Object(a.a)(n,e);var t=Object(u.a)(n);function n(e){var o;return Object(r.a)(this,n),(o=t.call(this,e)).onKeyDown=function(e){switch(e.code){case"ArrowLeft":o.onLeft();break;case"ArrowUp":o.onUp();break;case"ArrowDown":o.onDown();break;case"ArrowRight":o.onRight();break;case"Enter":o.action();break;case"Backspace":o.backspace();break;default:console.log('Handling key code="'.concat(e.code,'"'))}},o.onLeft=function(){o.moveDelta(-1,0)},o.onRight=function(){o.moveDelta(1,0)},o.onUp=function(){o.moveDelta(0,-1)},o.onDown=function(){o.moveDelta(0,1)},o.onCenter=function(){o.action()},o.onBackspace=function(){o.backspace()},o.state={letters:j,selectedRow:0,selectedCol:0,inputText:"",mode:b},o}return Object(l.a)(n,[{key:"renderLetters",value:function(){var e=this;return this.state.letters.map((function(t,n){return Object(d.jsx)("div",{className:"letters-row",children:t.map((function(t,o){var c=e.state.selectedCol===o,s=e.state.selectedRow===n,i=!1;return i=e.state.mode===b?s:s&&c,Object(d.jsx)(h,{selected:i,letter:t})}))})}))}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown)}},{key:"action",value:function(){this.setState((function(e){var t={mode:e.mode===b?v:b};if(e.mode===v){var n=e.letters[e.selectedRow][e.selectedCol];t.inputText=e.inputText+n,t.selectedCol=0,t.selectedRow=0}return t}))}},{key:"finishWord",value:function(){this.setState((function(e){return{inputText:e.inputText.length>0?e.inputText+" ":"",selectedCol:0,selectedRow:0}}))}},{key:"backspace",value:function(){this.setState((function(e){return{inputText:e.inputText.length>0?e.inputText.substring(0,e.inputText.length-1):""}}))}},{key:"moveDelta",value:function(e,t){this.setState((function(n,o){if(n.mode===v&&0!==t)return{mode:b,selectedCol:0};n.mode===v?t=0:e=0;var c=n.letters.length-1,s=n.letters[n.selectedRow].length-1;return{selectedCol:Math.min(Math.max(0,n.selectedCol+e),s),selectedRow:Math.min(Math.max(0,n.selectedRow+t),c)}}))}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{className:"letters-container",children:this.renderLetters()}),Object(d.jsx)(k,{text:this.state.inputText}),Object(d.jsx)(f,{onLeft:this.onLeft,onRight:this.onRight,onCenter:this.onCenter,onUp:this.onUp,onDown:this.onDown,onBackspace:this.onBackspace}),Object(d.jsxs)("div",{children:["Current row=",this.state.selectedRow,", col=",this.state.selectedCol]})]})}}]),n}(c.a.Component),x=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,o=t.getFID,c=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),o(e),c(e),s(e),i(e)}))};i.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(m,{})}),document.getElementById("root")),x()}},[[15,1,2]]]);
//# sourceMappingURL=main.76705b37.chunk.js.map