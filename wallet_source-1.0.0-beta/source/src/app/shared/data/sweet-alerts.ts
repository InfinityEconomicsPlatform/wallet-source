import swal from "sweetalert2";
import { AppConstants } from '../../config/constants';
import * as enJson from '../../../assets/i18n/en.json';
import * as deJson from '../../../assets/i18n/de.json';

let keyData: any;
var getTranslationJson = function () {
    var selectedLanguage = JSON.parse(sessionStorage.getItem(AppConstants.languageConfig.SESSION_SELECTED_LANGUAGE_KEY));
    if (selectedLanguage == "en") {
        keyData = enJson;
    } else {
        keyData = deJson;
    }
}

getTranslationJson();

// Confirm Button Action
export function confirmText(title, text, confirmButtonText, cancelButtonText) {
    return swal({
        title: keyData['sweet-alert'][title],
        text: keyData['sweet-alert'][text],
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "transparent",
        cancelButtonColor: "transparent",
        confirmButtonText: keyData['sweet-alert'][confirmButtonText],
        cancelButtonText: keyData['sweet-alert'][cancelButtonText]
    });
}

// Confirm & Cancel Button
export function confirmLogoutButton(
    title,
    text,
    inputPlaceholder,
    confirmButtonText,
    cancelButtonText
) {
    return swal({
        title: title,
        text: text,
        type: "warning",
        input: "checkbox",
        inputValue: "",
        inputPlaceholder: inputPlaceholder,
        showCancelButton: true,
        confirmButtonColor: "#0CC27E",
        cancelButtonColor: "#FF586B",
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        confirmButtonClass: "btn btn-success btn-raised mr-5",
        cancelButtonClass: "btn btn-danger btn-raised",
        buttonsStyling: false
    });
}

// Confirm Button Action
export function bookmarkSuccess() {
    return swal({
        title: "Bookmark Added!",
        text: "Do you want to check bookmark?",
        type: "success",
        showCancelButton: true,
        confirmButtonColor: "#0CC27E",
        cancelButtonColor: "#FF586B",
        confirmButtonText: "Go, bookmark",
        cancelButtonText: "No, cancel"
    }).catch(swal.noop);
}

export function InfoAlertBox(
    messageTitle,
    messageText,
    buttonText,
    messageType
) {
    // console.log(messageText)
    // console.log(messageText.includes("Transaction successfully broadcasted with Id :"));
    if (messageText.includes("Transaction successfully broadcasted with Id :")) {
        messageText = messageText.replace("Transaction successfully broadcasted with Id :", keyData['sweet-alert']['success-broadcast-message'])
        //console.log(messageText)
    } else if (messageText.includes("Unable to broadcast transaction. Reason:")) {
        messageText = messageText.replace("Unable to broadcast transaction. Reason:", keyData['sweet-alert']['unable-broadcast-transaction'])
        //console.log(messageText)
    } else if (messageText.includes("Sorry, an error occured! Reason: ")) {
        messageText = messageText.replace("Sorry, an error occured! Reason: ", keyData['sweet-alert']['unable-broadcast-transaction'])
        //console.log(messageText)
    }
    messageTitle = (keyData['sweet-alert'][messageTitle] != undefined) ? keyData['sweet-alert'][messageTitle] : messageTitle;
    messageText = (keyData['sweet-alert'][messageText.replace("&#34;", '"').replace("&#34;", '"')] != undefined) ?
        keyData['sweet-alert'][messageText.replace("&#34;", '"').replace("&#34;", '"')] :
        messageText.replace("&#34;", '"').replace("&#34;", '"');
    // console.log(messageTitle)
    // console.log(messageText)
    return swal({
        title: messageTitle,
        text: messageText,
        type: messageType,
        showCancelButton: false,
        confirmButtonText: buttonText,
        confirmButtonClass: "btn btn-" + messageType + " btn-raised"
    });
}
