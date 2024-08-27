import { useEffect, useState } from "react";
import { Outlet} from "react-router-dom";
import { useDispatch} from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import UserNavigation from "../components/UserNavigation";
import './UserLayout.css'

export default function UserLayout() {
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsUserLoaded(true));
  }, [dispatch]);

  return (
    <div className="user-layout-container">
      <ModalProvider>
        {isUserLoaded && (
          <>
            <UserNavigation />
            <div className="user-layout-outlet">
              <Outlet />
            </div>
          </>
        )}
        <Modal />
      </ModalProvider>
    </div>
  );
}
