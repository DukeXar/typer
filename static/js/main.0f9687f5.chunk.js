(this.webpackJsonptyper=this.webpackJsonptyper||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var s=n(1),c=n.n(s),r=n(7),a=n.n(r),i=(n(12),n(2)),o=n(3),l=n(5),u=n(4),d=(n(13),n(0)),h=(c.a.Component,["\u0410\u0411\u0412\u0413\u0414".split(""),"\u0415\u0401\u0416\u0417\u0418".split(""),"\u0419\u041a\u041b\u041c\u041d".split(""),"\u041e\u041f\u0420\u0421\u0422".split(""),"\u0423\u0424\u0425\u0426\u0427".split(""),"\u0428\u0429\u042a\u042b\u042c".split(""),"\u042d\u042e\u042f.,".split("")]),p=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(o.a)(n,[{key:"render",value:function(){return Object(d.jsx)("div",{className:"display-text",children:this.props.text})}}]),n}(c.a.Component),v=function(e){Object(l.a)(n,e);var t=Object(u.a)(n);function n(e){var s;return Object(i.a)(this,n),(s=t.call(this,e)).onKeyDown=function(e){switch(e.code){case"ArrowLeft":s.moveDelta(-1,0);break;case"ArrowUp":s.moveDelta(0,-1);break;case"ArrowDown":s.moveDelta(0,1);break;case"ArrowRight":s.moveDelta(1,0);break;case"Space":s.enterLetter();break;case"Enter":s.finishWord();break;case"Backspace":s.backspace();break;default:console.log('Handling key code="'.concat(e.code,'"'))}},s.state={letters:h,selectedRow:0,selectedCol:0,inputText:""},s}return Object(o.a)(n,[{key:"renderSingleLetter",value:function(e,t,n){var s=this.state.selectedCol===n,c=this.state.selectedRow===t;return Object(d.jsx)("div",{className:s&&c?"letters-cell letters-cell-selected":"letters-cell",children:e})}},{key:"renderLetters",value:function(){var e=this;return this.state.letters.map((function(t,n){return Object(d.jsx)("div",{className:"letters-row",children:t.map((function(t,s){return e.renderSingleLetter(t,n,s)}))})}))}},{key:"componentDidMount",value:function(){document.addEventListener("keydown",this.onKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.onKeyDown)}},{key:"finishWord",value:function(){this.setState((function(e){return{inputText:e.inputText.length>0?e.inputText+" ":"",selectedCol:0,selectedRow:0}}))}},{key:"backspace",value:function(){this.setState((function(e){return{inputText:e.inputText.length>0?e.inputText.substring(0,e.inputText.length-1):""}}))}},{key:"enterLetter",value:function(){var e=this;this.setState((function(t){var n=e.state.letters[e.state.selectedRow][e.state.selectedCol];return{inputText:t.inputText+n,selectedCol:0,selectedRow:0}}))}},{key:"moveDelta",value:function(e,t){this.setState((function(n,s){var c=n.letters.length-1,r=n.letters[n.selectedRow].length-1;return{selectedCol:Math.min(Math.max(0,n.selectedCol+e),r),selectedRow:Math.min(Math.max(0,n.selectedRow+t),c)}}))}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("div",{className:"letters-container",children:this.renderLetters()}),Object(d.jsx)(p,{text:this.state.inputText}),Object(d.jsxs)("div",{children:["Current row=",this.state.selectedRow,", col=",this.state.selectedCol]})]})}}]),n}(c.a.Component),f=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,a=t.getTTFB;n(e),s(e),c(e),r(e),a(e)}))};a.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(v,{})}),document.getElementById("root")),f()}},[[15,1,2]]]);
//# sourceMappingURL=main.0f9687f5.chunk.js.map