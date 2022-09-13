import { StreamManager } from "openvidu-browser";
import React, { Dispatch, useReducer, useContext } from "react";

interface ContextAction {
  type: string;
  payload: number;
  subscribe?: any;
}

type ContextDispatch = Dispatch<ContextAction>;

const ContextState: { challengeId: number; ovSubscribers: any } = {
  challengeId: -1,
  ovSubscribers: [],
};

// const StateContext = React.createContext<typeof ContextState | null>(null);
// const DispatchContext = React.createContext<ContextDispatch | null>(null);

export const AppContext = React.createContext<{
  state: typeof ContextState;
  dispatch: React.Dispatch<ContextAction>;
}>({
  state: ContextState,
  dispatch: () => null,
});

function reducer(state: typeof ContextState, action: ContextAction) {
  switch (action.type) {
    case "READ_CHALLENGE_ID": {
      return { ...state, challengeId: action.payload };
    }
    case "READ_SUBSCRIBERS": {
      return {
        ...state,
        ovSubscribers: [...state.ovSubscribers, action.subscribe],
      };
    }
    default: {
      console.log("머하노");
      return state;
    }
  }
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    challengeId: -1,
    ovSubscribers: [],
  });
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
