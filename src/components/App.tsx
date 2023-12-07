import {useState} from "react";
import cls from "./App.module.scss";
import {Link, Outlet} from "react-router-dom";
import avatar from "@/assets/image.jpeg";
import avatar1 from "@/assets/18.16.26.png";
import Calendar from "@/assets/calendar.svg";

export const App = () => {
  const [num, setNum] = useState(0);
  return (
    <div data-testid="dataTestId">
      <img width={100} height={100} src={avatar} alt="avatar" />
      <img width={100} height={100} src={avatar1} alt="avatar1" />
      <Calendar color={"green"} width={50} height={50} />
      <Link to={"/about"}>About</Link>
      <br />
      <Link to={"/shop"}>Shop</Link>
      <br />
      <h1 className={cls.value}>{num}</h1>
      <button className={cls.button} onClick={() => setNum(num + 1)}>
        +++
      </button>
      <Outlet />
    </div>
  );
};
