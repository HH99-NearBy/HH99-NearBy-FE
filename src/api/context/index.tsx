import { StreamManager } from "openvidu-browser";
import React, { Dispatch, useReducer, useContext } from "react";

interface ContextAction {
  type: string;
  payload?: number;
  subscribe?: any;
  userName?: string;
  challengeStatus?: string;
  targetOvSub?: string;
}

type ContextDispatch = Dispatch<ContextAction>;

const ContextState: {
  challengeId: number;
  ovSubscribers: any;
  userName: string | undefined;
  challengeStatus: string;
} = {
  challengeId: -1,
  ovSubscribers: [],
  userName: "",
  challengeStatus: "",
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

function reducer(
  state: typeof ContextState,
  action: ContextAction
): typeof ContextState {
  switch (action.type) {
    case "READ_CHALLENGE_ID": {
      const newData = {
        challengeId: -1,
        challengeStatus: "",
      };
      if (
        typeof action.payload === "number" &&
        typeof action.challengeStatus === "string"
      ) {
        newData.challengeId = action.payload;
        newData.challengeStatus = action.challengeStatus;
      }
      return {
        ...state,
        ...newData,
      };
    }
    case "READ_SUBSCRIBERS": {
      return {
        ...state,
        ovSubscribers: [...state.ovSubscribers, action.subscribe],
      };
    }
    case "REMOVE_SUBSCRIBERS": {
      return {
        ...state,
        ovSubscribers: state.ovSubscribers.filter(
          (sub: { stream: { streamId: string | undefined } }) =>
            sub.stream.streamId !== action.targetOvSub
        ),
      };
    }
    case "SYNC_USER_DATA": {
      return {
        ...state,
        userName: action.userName,
      };
    }
    default: {
      console.log("머하노");
      return state;
    }
  }
}

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, ContextState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}
