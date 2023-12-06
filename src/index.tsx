import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./app/App";
import { store } from "app/store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

// function foo() {
//     const x = 10;
//     return {
//         x: 20,
//         bar: () => {
//             console.log(this.x);
//         },
//         baz: function () {
//             console.log(this.x);
//         },
//     };
// }
//
// const obj1 = foo();
// obj1.bar();
// obj1.baz();
//
// const obj2 = foo.call({x: 30});
// let y = obj2.bar;
// let z = obj2.baz;
//
// y();
// z();
//
// obj2.bar();
// obj2.baz();

// function sayHi() {
//   alert( this.name );
// }
// sayHi.test = 5;
//
// let bound = sayHi.bind({
//   name: "Вася"
// });
//
// alert( bound.test ); // что выведет? почему?
// function f() {
//     alert( this);
// }
//
// let user = {
//     g: f.bind(undefined).call({x:30})
// };
//
// user.g();
