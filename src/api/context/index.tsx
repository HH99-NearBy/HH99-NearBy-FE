import { StreamManager } from "openvidu-browser";
import React, { Dispatch, useReducer, useContext } from "react";

interface ContextAction {
  type: string;
  payload?: number;
  subscribe?: any;
  userName?: string;
  challengeStatus?: string;
  targetOvSub?: string;
  searchParam?: string;
}

type ContextDispatch = Dispatch<ContextAction>;

const ContextState: {
  challengeId: number;
  ovSubscribers: any;
  userName: string | undefined;
  challengeStatus: string;
  modalOpen: boolean;
  searchParam: string | undefined;
} = {
  challengeId: -1,
  ovSubscribers: [],
  userName: "",
  challengeStatus: "",
  modalOpen: false,
  searchParam: "",
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
    case "LEAVE_SESSION": {
      return {
        ...state,
        ovSubscribers: [],
      };
    }
    case "TOGGLE_MODAL": {
      return {
        ...state,
        modalOpen: !state.modalOpen,
      };
    }
    case "CLOSE_MODAL": {
      return {
        ...state,
        modalOpen: false,
      };
    }
    case "SET_SEARCH": {
      return {
        ...state,
        searchParam: action.searchParam,
      };
    }
    default: {
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
