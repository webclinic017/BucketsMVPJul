import APIClient from "../../Services";
import {
  showToast
} from "../../Utils";
import {
  SET_IS_FETCHING_BUCKET_DATA,
  SET_IS_FETCHING_BUCKETS,
  SET_IS_POSTING_BUCKET,
  UN_FOLLOW_BUCKET,
  SET_IS_FOLLOWING,
  GET_USER_BUCKETS,
  GET_BUCKET_DATA,
  FOLLOW_BUCKET,
  CREATE_BUCKET,
  UPDATE_BUCKET
} from "../Constants";

const setIsFetching = (status) => {
  return {
    type: SET_IS_FETCHING_BUCKETS,
    payload: status
  };
}

const setIsFetchingBucketData = (status) => {
  return {
    type: SET_IS_FETCHING_BUCKET_DATA,
    payload: status
  };
}

const setIsPosting = (status) => {
  return {
    type: SET_IS_POSTING_BUCKET,
    payload: status
  };
}

const setIsFollowing = (status) => {
  return {
    type: SET_IS_FOLLOWING,
    payload: status
  };
}

const getBucketData = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsFetchingBucketData(true));
    APIClient.post('/bucket/get-bucket-data', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: GET_BUCKET_DATA,
          payload: response.data.bucketData
        });
        onSuccess();
      } else {
        dispatch({
          type: GET_BUCKET_DATA,
          payload: {}
        });
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsFetchingBucketData(false));
      showToast(error.message);
      onError();
    });
  }
)

const followBucket = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsFollowing(true));
    APIClient.post('/follow-bucket', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: FOLLOW_BUCKET,
          payload: response.data.bucket
        });
        showToast(response.data.message);
        onSuccess(response.data.bucket);
      } else {
        dispatch(setIsFollowing(false));
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsFollowing(false));
      showToast(error.message);
      onError();
    });
  }
)

const unFollowBucket = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsFollowing(true));
    APIClient.post('/un-follow-bucket', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: UN_FOLLOW_BUCKET,
          payload: data
        });
        showToast(response.data.message);
        onSuccess();
      } else {
        dispatch(setIsFollowing(false));
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsFollowing(false));
      showToast(error.message);
      onError();
    });
  }
)

const createBucket = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsPosting(true));
    APIClient.post('/bucket/create-bucket', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: CREATE_BUCKET,
          payload: {
            _id: response.data.bucketId,
            name: data.bucketName
          }
        });
        showToast(response.data.message);
        onSuccess(response.data.bucketId);
      } else {
        dispatch(setIsPosting(false));
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsPosting(false));
      showToast(error.message);
      onError();
    });
  }
)

const updateBucket = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsPosting(true));
    APIClient.post('/bucket/update-bucket', data).then((response)=>{
      if(response.data.success === true) {
        // dispatch({
        //   type: UPDATE_BUCKET,
        //   payload: response.data.buckets
        // });
        dispatch(setIsPosting(false));
        showToast(response.data.message);
        onSuccess();
      } else {
        dispatch(setIsPosting(false));
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsPosting(false));
      showToast(error.message);
      onError();
    });
  }
)

const getUserBuckets = (onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsFetching(true));
    APIClient.get('/bucket/get-user-buckets').then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: GET_USER_BUCKETS,
          payload: response.data.buckets
        });
        onSuccess();
      } else {
        dispatch(setIsFetching(false));
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsFetching(false));
      showToast(error.message);
      onError();
    });
  }
)

const recordNoOfTimesBucketShared = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    APIClient.post('/record-no-of-bucket-shares', data).then((response)=>{
      if(response.data.success === true) {
        onSuccess();
      } else {
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      showToast(error.message);
      onError();
    });
  }
)

const shortenUrl = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsPosting(true));
    APIClient.post('/shorten-url', data).then((response)=>{
      dispatch(setIsPosting(false));
      if(response.data.success === true) {
        onSuccess(response.data.shortenedUrl);
      } else {
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsPosting(false));
      showToast(error.message);
      onError();
    });
  }
)

export {
  recordNoOfTimesBucketShared,
  getUserBuckets,
  unFollowBucket,
  getBucketData,
  followBucket,
  createBucket,
  updateBucket,
  shortenUrl,
};