import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import UserNavigation from "../components/UserNavigation";

export default function UserLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const user = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    if (isLoaded && !user) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      <ModalProvider>
        {isLoaded && (
          <>
            <UserNavigation />
            <Outlet />
          </>
        )}
        <Modal />
      </ModalProvider>
    </>
  );
}
