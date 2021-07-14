
//shit+tab to move code back - de-indent
//no need to import a whole library for one _
import Toaster from 'toastr';
import aesjs from 'aes-js';

const key = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ];
const iv = [ 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36 ];

const encryptDataString = (dataString) => {
  const textBytes = aesjs.utils.utf8.toBytes(dataString);
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const encryptedBytes = aesCbc.encrypt(textBytes);
  return aesjs.utils.hex.fromBytes(encryptedBytes);
}

const decryptDataString = (dataString) => {
  const encryptedBytes = aesjs.utils.hex.toBytes(dataString);
  const aesCbc = new aesjs.ModeOfOperation.cbc(key, iv);
  const decryptedBytes = aesCbc.decrypt(encryptedBytes);
  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

const options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "300",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "swing",
  "showMethod": "show",
  "hideMethod": "hide"
};

const showToast = (message, type="success") => {
  if(type==="success") {
      Toaster.success(message, "Success", options);
  } else if(type==="warning") {
      Toaster.warning(message, "Warning", options);
  } else if(type==="error") {
      Toaster.error(message, "Error", options);
  } else {
      Toaster.info(message, "Info", options);
  }
}

const objectsEqual = (o1, o2) => {
  return typeof o1 === 'object' && Object.keys(o1).length > 0 ? Object.keys(o1).length === Object.keys(o2).length && Object.keys(o1).every(p => objectsEqual(o1[p], o2[p])) : o1 === o2;
}

const myNaN = 0/0;
const isNaN = (maybeNaN) => {
  return Object.is(myNaN, maybeNaN);
}

export {
  encryptDataString,
  decryptDataString,
  objectsEqual,
  showToast,
  isNaN
};
