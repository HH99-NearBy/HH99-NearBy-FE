import React, { useRef, useState, useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import apis from "../../api/api";
import { AppContext } from "../../api/context";

interface CompactChallengeInfo {
  challengeId: number;
  title: string;
}

function SearchBar() {
  const debouncer = useRef<NodeJS.Timeout | null>(null);
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const navModal = useRef<HTMLDivElement | null>(null);
  const [input, setInput] = useState("");
  const [result, setResult] = useState<CompactChallengeInfo[]>([]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (debouncer.current) {
      clearTimeout(debouncer.current);
      setResult([]);
    }
    debouncer.current = setTimeout(async function () {
      if (e.target.value.length !== 0) {
        const reqRes = await apis.searchTitle(e.target.value);
        setResult([...result, ...reqRes]);
      } else {
        setResult([]);
      }
    }, 200);
  };
  const handleSubmitInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH", searchParam: input });
    setInput("");
    setResult([]);
    navigate("/search");
  };
  const handleToDetail = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch({
      type: "READ_CHALLENGE_ID",
      payload: Number(e.currentTarget.children[2].innerHTML),
      challengeStatus: "doing",
    });
    dispatch({ type: "TOGGLE_MODAL" });

    setResult([]);
  };

  return (
    <StSearchBarBody onSubmit={handleSubmitInput}>
      <input
        type="text"
        name="search_keyword"
        id="ChallengeSearchBar"
        onChange={handleInputChange}
        value={input}
      />
      <button>
        <AiOutlineSearch />
      </button>

      {result.length !== 0 && (
        <StNavModalBody ref={navModal}>
          {result.map((el) => {
            return (
              <div className="search_result" onClick={handleToDetail}>
                <span>{input}</span>
                <span>{el.title.split(input)}</span>
                <span>{el.challengeId}</span>
              </div>
            );
          })}
        </StNavModalBody>
      )}
    </StSearchBarBody>
  );
}

const StSearchBarBody = styled.form`
  position: relative;
  width: 45rem;
  height: 4.2rem;
  border: 0.2rem solid #323232;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  input {
    height: 100%;
    width: 90%;
    border: none;
    flex-grow: 1;
    font-size: 2rem;
    padding-left: 0.5rem;
    outline-color: var(--purple-color);
  }
  button {
    background: none;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      font-size: 3rem;
      margin: 0 1rem 0 1rem;
    }
  }
`;

const StNavModalBody = styled.div`
  position: absolute;
  z-index: 100;
  left: -0.1rem;
  top: 4rem;
  width: 45rem;
  border: 0.2rem solid gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding-left: 0.5rem;
  .search_result {
    width: 100%;
    font-size: 2rem;
    margin-top: 0.5rem;
    span {
      :nth-of-type(1) {
        color: var(--purple-color);
      }
      :nth-of-type(3) {
        display: none;
      }
    }
  }
`;

export default SearchBar;
