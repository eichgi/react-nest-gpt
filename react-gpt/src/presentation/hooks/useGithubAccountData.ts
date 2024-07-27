import {useEffect, useState} from "react";
import axios from "axios";

const useGithubAccountData = (account: string) => {
  const [accountData, setAccountData] = useState({});

  useEffect(() => {
    if (!account){
      return;
    }

    axios.get(`https://api.github.com/users/${account}`)
      .then(response => setAccountData(response.data));
  }, [account]);

  return accountData;
};

export default useGithubAccountData;