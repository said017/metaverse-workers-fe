// log
import store from "../store";

const fetchDataRequest = () => {
  return {
    type: "CHECK_DATA_REQUEST",
  };
};

const fetchDataSuccess = (payload) => {
  return {
    type: "CHECK_DATA_SUCCESS",
    payload: payload,
  };
};

const fetchDataFailed = (payload) => {
  return {
    type: "CHECK_DATA_FAILED",
    payload: payload,
  };
};

export const fetchData = () => {
  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      let totalSupply = await store
        .getState()
        .blockchain.smartContract.methods.totalSupply()
        .call();
      let paused = await store
        .getState()
        .blockchain.smartContract.methods.paused()
        .call();
      // // let isWhitelisted = await store
      // //   .getState()
      // //   .blockchain.smartContract.methods.isWhitelisted(blockchain.account)
      //   .call();
      // let onlyWhitelisted = await store
      //   .getState()
      //   .blockchain.smartContract.methods.onlyWhitelisted()
      //   .call();
      

      dispatch(
        fetchDataSuccess({
          totalSupply,
          paused,
          // isWhitelisted,
          // onlyWhitelisted,
        })
      );
    } catch (err) {
      console.log(err);
      dispatch(fetchDataFailed("Could not load data from contract."));
    }
  };
};
