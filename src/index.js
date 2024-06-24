import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,  RouterProvider,} from "react-router-dom";
import StickyNote from './Component/StickyNote/StickyNote';
import ViewerWebsite from './function/viewWebsite/ViewerWebsite';
import ViewerYoutube from './Component/viewerYoutube/ViewerYoutube';
import Login from './Component/login/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: "/",
    element: <StickyNote />,
  },
  {
    path: "/convertText",
    element: <App />,
  },
  {
    path: "/hanzi",
    element: <ViewerWebsite title="汉字词典" path="https://hanzii.net/?hl=vi"/>,
  },
  {
    path: "/nhidonghocphat",
    element: <ViewerWebsite title="Nhi Đồng Học Phật" path="https://nhidonghocphat.com/tinh-khong-phap-su-gia-ngon-luc-ds"/>,
  },
  {
    path: "/tudiendich",
    element: <ViewerWebsite title="Chuyển đổi Hán tự qua tiếng Việt" path="https://tudiendich.com/"/>,
  },
  {
    path: "/pdfGiaotrinh",
    element: <ViewerWebsite title="Giáo Trình" path="https://tv.nhidonghocphat.com/gttd/CH21-010-03.pdf"/>,
  },
  {
    path: "/jiaocheng",
    element: <ViewerWebsite title="淨空法師嘉言路" path="https://book.bfnn.org/books/0486.htm"/>,
  },
  {
    path: "/youtube",
    element: <ViewerYoutube title="Youtube" path="https://book.bfnn.org/books/0486.htm"/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
 
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
