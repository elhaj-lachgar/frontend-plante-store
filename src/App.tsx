import "./App.css";
import SectionLayout from "./layout/SectionLayout";
import About from "./page/About";
import Home from "./page/Home";
import { Route, Routes } from "react-router-dom";
import Shop from "./page/Shop";
import PlanetDetails from "./page/PlanetDetails";
import Cart from "./page/Cart";
import Order from "./page/Order";
import AuthLayout from "./layout/AuthLayout";
import SignIn from "./page/auth/Sign-in";
import SignUp from "./page/auth/Sign-up";
import ProtectLayout from "./layout/ProtectLayout";
import Profile from "./page/Profile";
import UpdateProfile from "./page/UpdateProfile";
import ChangePassword from "./page/ChangePassword";
import MyOrder from "./page/MyOrder";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SectionLayout children={<Home/>} />} />
      <Route path="/about" element={<SectionLayout children={<About />} />} />
      <Route path="/shop" element={<SectionLayout children={<Shop />} />} />
      <Route path="/shop/:id" element={<SectionLayout children={<PlanetDetails/>}/>}/>
      <Route path="/cart" element={<SectionLayout children={<Cart/>}/>}/>
      <Route path="/order" element={<SectionLayout children={<Order/>}/>}/>
      <Route path="/sign-in" element={<AuthLayout children={<SignIn/>}/>}/>
      <Route path="/sign-up" element={<AuthLayout children={<SignUp/>}/>}/>
      <Route path="/profile/me" element={<ProtectLayout children={<Profile/>}/>}/>
      <Route path="/profile/update-profile" element={<ProtectLayout children={<UpdateProfile/>}/>}/>
      <Route path="/profile/change-password" element={<ProtectLayout children={<ChangePassword/>}/>}/>
      <Route path="/profile/my-order" element={<ProtectLayout children={<MyOrder/>}/>} />
    </Routes>
  );
}

export default App;
