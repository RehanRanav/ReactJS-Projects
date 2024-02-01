import AddTodo from "./components/AddTodo";
import DateComponent from "./components/DateComponent";
import { Slide, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (

    <div className="App w-full h-screen text-center">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Slide}
        />


      <DateComponent />
      <AddTodo />
    </div>
  );
}

export default App;
