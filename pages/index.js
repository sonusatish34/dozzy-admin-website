import Image from "next/image";
import localFont from "next/font/local";
import Login from "./components/login/login";

export default function Home() {
  
  return (
    <div className="text-center">
      <Login/>
    </div>
  );
}
