import {
  SET_IS_FETCHING_HISTORICAL_STOCK_PRICES,
  SET_SINGLE_STOCK_ALPACA_ORDER,
  SET_IS_FETCHING_BUCKET_VALUE,
  SET_HISTORICAL_STOCK_PRICES,
  SET_IS_FETCHING_BUCKET_DATA,
  SET_IS_FETCHING_BUCKETS,
  SET_IS_POSTING_BUCKET,
  GET_EXPERT_BUCKETS,
  GET_USER_BUCKETS,
  UN_FOLLOW_BUCKET,
  SET_IS_FOLLOWING,
  SET_BUCKET_VALUE,
  GET_BUCKET_DATA,
  FOLLOW_BUCKET,
  CREATE_BUCKET,
  UPDATE_BUCKET,
  USER_LOGOUT
} from "../Constants";

const initState = {
  buckets: [],
  expertBuckets: [],
  bucketData: {},
  bucketHistoricalPrices: null,
  isFetchingBucketHistoricalPrices: false,
  shortenedUrl: "",
  bucketValue: null,
  isFetchingBucketValue: false,
  isPosting: false,
  isFetching: false,
  isFollowing: false,
  isFetchingBucketData: false
};

export default (state=initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_IS_POSTING_BUCKET: {
      return {
        ...state,
        isPosting: payload
      };
    }

    case SET_IS_FOLLOWING: {
      return {
        ...state,
        isFollowing: payload
      };
    }

    case SET_IS_FETCHING_BUCKET_DATA: {
      return {
        ...state,
        isFetchingBucketData: payload
      };
    }

    case SET_IS_FETCHING_BUCKETS: {
      return {
        ...state,
        isFetching: payload
      };
    }

    case GET_USER_BUCKETS: {
      return {
        ...state,
        buckets: payload,
        isFetching: false
      };
    }

    case GET_EXPERT_BUCKETS: {
      return {
        ...state,
        expertBuckets: payload,
        isFetching: false
      };
    }

    case SET_IS_FETCHING_BUCKET_VALUE: {
      return {
        ...state,
        isFetchingBucketValue: payload
      };
    }

    case SET_BUCKET_VALUE: {
      return {
        ...state,
        bucketValue: payload,
        isFetchingBucketValue: false
      };
    }

    case CREATE_BUCKET: {
      const updatedBuckets = [...state.buckets, payload];
      return {
        ...state,
        buckets: updatedBuckets,
        isPosting: false
      }
    }

    case FOLLOW_BUCKET: {
      const updatedBuckets = [...state.buckets, payload];
      return {
        ...state,
        buckets: updatedBuckets,
        isFollowing: false
      }
    }

    case SET_IS_FETCHING_HISTORICAL_STOCK_PRICES: {
      return {
        ...state,
        isFetchingBucketHistoricalPrices: payload
      }
    }

    case SET_HISTORICAL_STOCK_PRICES: {
      return {
        ...state,
        bucketHistoricalPrices: payload,
        isFetchingBucketHistoricalPrices: false
      }
    }

    case SET_SINGLE_STOCK_ALPACA_ORDER: {
      let updatedStocks = [];
      state.bucketData.stocks.forEach(stock => {
        if(stock.id===payload.stockId) {
          updatedStocks.push({...stock, orders: [...stock.orders, payload.order]});
        } else {
          updatedStocks.push(stock);
        }
      });
      return {
        ...state,
        bucketData: {
          ...state.bucketData,
          stocks: updatedStocks
        }
      };
    }

    case GET_BUCKET_DATA: {
      return {
        ...state,
        bucketData: payload,
        isFetchingBucketData: false
      };
    }

    case USER_LOGOUT: {
      return initState;
    }
  
    default: {
      return state;
    }
  }
}