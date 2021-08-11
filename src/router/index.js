import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import localKeys from "../constances/localKeys";
import {
  setCurrentuser,
  setRoomListByUser,
  setUserList,
} from "../ducks/slices/chatSlice";
import { firestore } from "../firebase";
import Login from "../pages/login/Login";
import NotFound from "../pages/NotFound";
import { Admin, Clinic, Volunteer } from "../roles";
import {
  AdminRoute,
  ClinicRoute,
  PublicRoute,
  VolunteerRoute,
} from "./CommonRoutes";
import pathNames from "./pathNames";

const Router = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    if (localUser) {
      firestore
        .collection("users")
        .where("uid", "==", `${localUser.id}`)
        .get()
        .then((docs) => {
          if (docs.size === 1) {
            docs.forEach((doc) =>
              dispatch(setCurrentuser({ id: doc.id, ...doc.data() }))
            );
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    if (localUser) {
      const unsubscribe = firestore
        .collection("users")
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          dispatch(setUserList(docs));
        });

      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

    if (localUser) {
      const unsubscribe = firestore
        .collection("rooms")
        .where("members", "array-contains", `${localUser.id}`)
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          dispatch(setRoomListByUser(docs));
        });

      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={pathNames.LOGIN} component={Login} />

        <AdminRoute path={pathNames.ADMIN} component={Admin} />
        <VolunteerRoute path={pathNames.VOLUNTEER} component={Volunteer} />
        <ClinicRoute path={pathNames.CLINIC} component={Clinic} />

        <Redirect exact from={pathNames.MAIN} to={pathNames.LOGIN} />

        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
