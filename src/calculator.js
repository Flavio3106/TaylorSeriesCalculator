const jqueryWindow = $(window);
const spinner = $("#spinner");
//mobile
const mobileButtons = $(".mobile-step");
const mobileIcons = $(".mobile-icon");

//desktop
const desktopButtons = $(".step-btn");
const desktopIcons = $(".icon");

//tabs
const tabs = $(".tab");
var currentTab = $(tabs[0]);
var lastSelectedStep = $();

//inputs
const inputFunction = $("#function");
const inputDegree = $("#degree");
const inputXVar = $("#xVar");
const inputXWithZeroVar = $("#xwithzeroVar");

//result
const resultBtn = $("#result-btn");
const resultField = $("#result-field");

//modal
const modalAlert = $("#modal-alert");

$(document).ready(function () {
  $("#spinner").modal("hide");
});

jqueryWindow.on("load", () => {
  if (jqueryWindow.width() < 768) {
    //mobile
    lastSelectedStep = $(mobileButtons[0]);
  } else {
    lastSelectedStep = $(desktopButtons[0]);
  }
  initializeNavigation(mobileButtons);
  initializeNavigation(desktopButtons);
});

function initializeNavigation(buttons) {
  buttons.each((index, step) => {
    if (index !== 0) {
      $(tabs[index]).hide();
    }

    $(step).on("click", () => {
      if (currentTab) {
        if (step != lastSelectedStep) {
          currentTab.hide();
          $(lastSelectedStep).removeClass("step-btn-selected");
          lastSelectedStep = $(step);
          currentTab = $(tabs[index]);
          $(currentTab).show();
          $(step).addClass("step-btn-selected");
        }
      }
    });
  });
}

function onInput(iconIndex, inputElement) {
  if ($(inputElement).val() !== "") {
    $(mobileIcons[iconIndex]).addClass("filled");
    $(desktopIcons[iconIndex]).addClass("filled");
  } else {
    $(mobileIcons[iconIndex]).removeClass("filled");
    $(desktopIcons[iconIndex]).removeClass("filled");
  }
}

function onInputMultipleFields(iconIndex, elements) {
  if (elements[0].val() !== "") {
    $(elements).each((index, element) => {
      if ($(element).val() === "") {
        return;
      }
    });
    $(mobileIcons[iconIndex]).addClass("filled");
    $(desktopIcons[iconIndex]).addClass("filled");
  } else {
    $(mobileIcons[iconIndex]).removeClass("filled");
    $(desktopIcons[iconIndex]).removeClass("filled");
  }
}

inputFunction.on("input", () => {
  onInput(0, inputFunction);
});
inputXVar.on("input", () => {
  onInputMultipleFields(2, [inputXVar, inputXWithZeroVar]);
});
inputXWithZeroVar.on("input", () => {
  onInputMultipleFields(2, [inputXVar, inputXWithZeroVar]);
});
inputDegree.on("input", () => {
  onInput(1, inputDegree);
});

const popoverTriggerList = $('[data-bs-toggle="popover"]');
const popoverList = popoverTriggerList.each((index, trigger) => {
  new bootstrap.Popover(trigger);
});

function checkIfNotNull() {
  const functionBool = inputFunction.val() !== "";
  const xBool = inputXVar.val() !== "";
  const xWithZeroBool = inputXWithZeroVar.val() !== "";
  const degreeBool = inputDegree.val() !== "";
  return functionBool && xBool && xWithZeroBool && degreeBool;
}

function calculateResult() {
  if (!checkIfNotNull()) {
    modalAlert.modal("show");
    return;
  }
  const x = inputXVar.val();
  const xZero = inputXWithZeroVar.val();
  const degree = inputDegree.val();
  let func = inputFunction.val();
  const mathScope = {
    x: xZero,
  };
  let result = parseFloat(math.evaluate(func, mathScope));
  spinner.toggleClass("visually-hidden");
  resultBtn.prop("disabled", !resultBtn.prop("disabled"));
  setTimeout(() => {
    for (let i = 1; i <= degree; i++) {
      const derivative = math.derivative(func, "x").evaluate(mathScope);
      result += (derivative * Math.pow(x - xZero, i)) / math.factorial(i);
      func = math.derivative(func, "x").toString();
    }
    spinner.toggleClass("visually-hidden");
    resultBtn.prop("disabled", !resultBtn.prop("disabled"));
    resultField.val(result);
  }, 500);
}

resultBtn.on("click", () => {
  calculateResult();
});
