import IMask from "imask";
export const Masks = () => {
	console.log("Module masks");

    //===================================================================
    //===================================================================
	(() => {
		var footerForm = document.querySelector(".footer__callback input");
		var footerFormOptions = {
			mask: "+{7} (000) 000-00-00",
		};
		IMask(footerForm, footerFormOptions);
	})();
    
    //===================================================================
    //===================================================================
	(() => {
		var modalForm = document.querySelector("input[type='tel']");
		var modalFormOptions = {
			mask: "+{7} (000) 000-00-00",
		};
		IMask(modalForm, modalFormOptions);
	})();
};
