import { stat } from "fs";
import React, { Dispatch, useReducer, useContext } from "react";
interface ChatType {
  nickName: string;
  chat: string;
}
interface ContextAction {
  type: string;
  targetPerson?: string;
  newChat?: ChatType;
}

type ContextDispatch = Dispatch<ContextAction>;

const ContextState: {
  people: string[];
  chat: ChatType[];
} = {
  people: [],
  chat: [],
};

// const StateContext = React.createContext<typeof ContextState | null>(null);
// const DispatchContext = React.createContext<ContextDispatch | null>(null);

export const RoomContext = React.createContext<{
  state: typeof ContextState;
  dispatch: React.Dispatch<ContextAction>;
}>({
  state: ContextState,
  dispatch: () => null,
});

function reducer(
  state: typeof ContextState,
  action: ContextAction
): typeof ContextState {
  switch (action.type) {
    case "ADD_PEOPLE": {
      const newArr = state.people;
      if (action.targetPerson !== undefined) {
        newArr.push(action.targetPerson);
      }
      return { ...state, people: newArr };
    }
    case "ADD_CHAT": {
      const newArr = state.chat;
      if (action.newChat !== undefined) {
        newArr.push(action.newChat);
      }
      return {
        ...state,
        chat: newArr,
      };
    }
    default: {
      console.log("머하노");
      return state;
    }
  }
}

export function RoomContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, ContextState);
  return (
    <RoomContext.Provider value={{ state, dispatch }}>
      {children}
    </RoomContext.Provider>
  );
}
