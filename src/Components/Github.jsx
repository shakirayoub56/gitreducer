import { useReducer, useState } from "react";

let intial = {
  isloading: false,
  iserror: false,
  data: [],
  token: ""
};

const githubReducer = (state, action) => {
  switch (action.type) {
    case "Fetch_github_loading": {
      return {
        ...state,
        isloading: true,
        iserror: false
      };
    }
    case "fetch_gethub_success": {
      return {
        ...state,
        isloading: false,
        data: action.payload
      };
    }
    case "fetch_github_failure": {
      return {
        ...state,
        isloading: false,
        iserror: true
      };
    }
    default:
      return state;
  }
};
const githubloadingaction = { type: "Fetch_github_loading" };
const githubsuccessaction = { type: "fetch_gethub_success" };
const githubfailure = { type: "fetch_github_failure" };

const fetchuser = (query, dispatch) => {
  dispatch(githubloadingaction);
  fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then((res) => {
      dispatch({ ...githubsuccessaction, payload: res.items });
    })
    .catch((err) => {
      dispatch(githubfailure);
    });
};

export const Github = () => {
  const [text, settext] = useState("");
  const [state, dispatch] = useReducer(githubReducer, intial);

  return (
    <div>
      <div>
        <input
          placeholder="text"
          value={text}
          onChange={(e) => settext(e.target.value)}
        />

        <button onClick={() => fetchuser(text, dispatch)}>search</button>
      </div>
      <div>
        {state.data.map((ele) => (
          <div key={ele.id}>{ele.login}</div>
        ))}
      </div>
    </div>
  );
};
