"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const async_storage_1 = require("@react-native-community/async-storage");
const Keychain = require("react-native-keychain");
var PinResultStatus;
(function (PinResultStatus) {
    PinResultStatus["initial"] = "initial";
    PinResultStatus["success"] = "success";
    PinResultStatus["failure"] = "failure";
    PinResultStatus["locked"] = "locked";
})(PinResultStatus = exports.PinResultStatus || (exports.PinResultStatus = {}));
exports.hasPinCode = async (serviceName) => {
    if (react_native_1.Platform.OS === 'ios') {
        return await async_storage_1.default.getItem(serviceName);
    }
    return await Keychain.getInternetCredentials(serviceName).then(res => {
        return !!res && !!res.password;
    });
};
exports.deletePinCode = async (serviceName) => {
    if (react_native_1.Platform.OS === 'ios') {
        return await async_storage_1.default.removeItem(serviceName);
    }
    return await Keychain.resetInternetCredentials(serviceName);
};
exports.resetInternalStates = async (asyncStorageKeys) => {
    if (react_native_1.Platform.OS === 'ios') {
        return await async_storage_1.default.removeItem('nagijiPin');
    }
    return await async_storage_1.default.multiRemove(asyncStorageKeys);
};
