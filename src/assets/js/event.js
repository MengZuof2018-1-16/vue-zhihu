let Event = function () {
    this.on = function (el, event, fn) {
        el.addEventListener(event, fn, false)
    }

    this.throttle = function (fn, wait) {
        let timer = null;
        return function () {
            let context = this;
            let args = arguments;

            if (!timer) {
                timer = setTimeout(function () {
                    fn.apply(context, args);
                    timer = null;
                }, wait)
            }
        }
    }
}

export default new Event()