import {
  SET_IS_FETCHING_HISTORICAL_STOCK_PRICES,
  SET_HISTORICAL_STOCK_PRICES,
  SET_IS_FETCHING_BUCKET_DATA,
  SET_IS_FETCHING_BUCKETS,
  SET_IS_POSTING_BUCKET,
  GET_USER_BUCKETS,
  UN_FOLLOW_BUCKET,
  SET_IS_FOLLOWING,
  GET_BUCKET_DATA,
  FOLLOW_BUCKET,
  CREATE_BUCKET,
  UPDATE_BUCKET,
  USER_LOGOUT
} from "../Constants";

const initState = {
  buckets: [],
  bucketData: {},
  bucketHistoricalPrices: null,
  isFetchingBucketHistoricalPrices: false,
  shortenedUrl: "",
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

    case UN_FOLLOW_BUCKET: {
      let updatedBuckets = [];
      if(payload.hasOwnProperty("bucketId")) {
        state.buckets.forEach(bucket => {
          if(bucket.id === payload.bucketId) {
            const {originalBucketId, ...restBucketData} = bucket;
            updatedBuckets.push(restBucketData);
          } else {
            updatedBuckets.push(bucket);
          }
        });
      } else {
        state.buckets.forEach(bucket => {
          if(bucket?.originalBucketId && bucket.originalBucketId === payload.followedBucketId) {
            const {originalBucketId, ...restBucketData} = bucket;
            updatedBuckets.push(restBucketData);
          } else {
            updatedBuckets.push(bucket);
          }
        });
      }
      return {
        ...state,
        buckets: updatedBuckets,
        isFollowing: false
      }
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