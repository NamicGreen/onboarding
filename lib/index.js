function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var Tippy = _interopDefault(require('@tippyjs/react'));
require('tippy.js/dist/tippy.css');
require('tippy.js/animations/shift-toward-subtle.css');

var TipContent = function TipContent(_ref) {
  var start = _ref.start,
      step = _ref.step,
      lastStep = _ref.lastStep,
      curretStepConfig = _ref.curretStepConfig,
      previousStep = _ref.previousStep,
      nextStep = _ref.nextStep,
      onClose = _ref.onClose;
  return React__default.createElement("div", null, React__default.createElement("div", {
    className: 'tipWrapper'
  }, curretStepConfig === null || curretStepConfig === void 0 ? void 0 : curretStepConfig.content), React__default.createElement("div", {
    className: 'tipDotsWrapper'
  }, React__default.createElement("div", {
    className: 'tipDots'
  }, Array(lastStep).fill(0).map(function (_, key) {
    return React__default.createElement("span", {
      className: step === key + 1 ? 'active' : 'dot',
      key: key
    });
  }))), start && React__default.createElement("div", {
    className: 'tipFooter'
  }, React__default.createElement("button", {
    disabled: step === 1,
    onClick: previousStep
  }, "Back"), step !== lastStep && React__default.createElement("button", {
    onClick: onClose
  }, "Skip"), React__default.createElement("button", {
    onClick: step !== lastStep ? nextStep : onClose
  }, step !== lastStep ? 'Next' : 'Close')));
};

var OnBoarding = function OnBoarding(_ref2) {
  var id = _ref2.id,
      config = _ref2.config,
      _ref2$start = _ref2.start,
      start = _ref2$start === void 0 ? false : _ref2$start,
      onClose = _ref2.onClose;

  var _useState = React.useState(false),
      visible = _useState[0],
      setVisible = _useState[1];

  var _useState2 = React.useState(0),
      step = _useState2[0],
      setStep = _useState2[1];

  var lastConfig = React.useRef({});
  var lastStep = Object.keys(config.steps).length;
  var rectRef = React.useRef(null);
  var nextStep = React.useCallback(function () {
    setStep(function (step) {
      var newStep = step + 1;
      if (newStep > lastStep) return step;
      return newStep;
    });
  }, [lastStep]);
  var previousStep = React.useCallback(function () {
    setStep(function (step) {
      var newStep = step - 1;
      if (newStep < 1) return step;
      return newStep;
    });
  }, []);
  var onRectClick = React.useCallback(function (e) {
    e.preventDefault();
    nextStep();
  }, []);
  React.useEffect(function () {
    if (start) {
      setStep(1);
    } else {
      setStep(0);
    }
  }, [start]);
  React.useEffect(function () {
    setTimeout(function () {
      if (step > 0) {
        setVisible(true);
        rectRef.current.style.visibility = 'initial';
      } else {
        setVisible(false);
        rectRef.current.style.visibility = 'hidden';
      }
    }, 1);
  }, [step]);
  var curretStepConfig = React.useMemo(function () {
    var conf = config.steps[step] || {};

    if (Object.keys(conf).length === 0 && start === false) {
      return lastConfig.current;
    }

    var element = document.getElementById(conf.id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'start'
      });
      rectRef.current.style.visibility = 'initial';
      rectRef.current.style.height = element.clientHeight + 'px';
      rectRef.current.style.width = element.clientWidth + 'px';

      if (element.getBoundingClientRect().top === element.offsetParent.getBoundingClientRect().top) {
        rectRef.current.style.top = element.getBoundingClientRect().top + 'px';
      } else {
        rectRef.current.style.top = element.getBoundingClientRect().top - element.offsetParent.getBoundingClientRect().top + 'px';
      }

      rectRef.current.style.left = element.getBoundingClientRect().left + 'px';
    }

    conf.element = element;
    lastConfig.current = conf;
    return conf;
  }, [step, lastStep, start]);
  var TipContentElement = config.tipContent ? config.tipContent : TipContent;
  return React__default.createElement(React__default.Fragment, null, React__default.createElement(Tippy, {
    placement: "auto",
    reference: (curretStepConfig === null || curretStepConfig === void 0 ? void 0 : curretStepConfig.element) || null,
    allowHTML: true,
    content: React__default.cloneElement(React__default.createElement(TipContentElement, null), {
      start: start,
      step: step,
      lastStep: lastStep,
      curretStepConfig: curretStepConfig,
      previousStep: previousStep,
      nextStep: nextStep,
      onClose: onClose
    }),
    animation: 'shift-toward-subtle',
    visible: visible
  }), React__default.createElement("div", {
    id: id,
    ref: rectRef,
    style: {
      visibility: 'hidden'
    },
    className: "hightlightRect " + (config.showBackdrop ? 'withDropshadow' : ''),
    onClick: onRectClick
  }));
};

module.exports = OnBoarding;
//# sourceMappingURL=index.js.map
