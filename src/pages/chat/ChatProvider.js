import { useEffect } from "react";
import { createContext, useMemo, useState } from "react";
import { useFirestore } from "./firestoreHooks";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [fixLocalBug, setFixLocalBug] = useState(false);

  const localUser =
    localStorage.getItem("user-firebase") &&
    JSON.parse(localStorage.getItem("user-firebase"));

  const [selectedRoomId, setSelectedRoomId] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (localUser && !fixLocalBug) {
      setUser(localUser);
      setFixLocalBug(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localUser]);

  const roomsCondition = useMemo(() => {
    if (user) {
      return {
        fieldName: "members",
        operator: "array-contains",
        compareValue: user.uid,
      };
    }
  }, [user]);

  const rooms = useFirestore("rooms", roomsCondition);
  const users = useFirestore("users");

  const selectedRoom = useMemo(
    () => rooms.find((room) => room.id === selectedRoomId),
    [rooms, selectedRoomId]
  );

  return (
    <ChatContext.Provider
      value={{
        rooms,
        users,
        selectedRoomId,
        setSelectedRoomId,
        selectedRoom,
        setUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
