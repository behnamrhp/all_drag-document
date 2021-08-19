import parent from './parentDrag.js';

class slideDrag extends parent {
    _check_slide_open = false;
    _check_allowed_slide_move = false;
    _first_elem_width;
    _first_elem_height;

    constructor() {
        super();
    }


    initElementPosition(targetElem) {
        //get config direction
        const direction = this._config.drag_type.slideDrag.direction;

        //set styles
        if (direction === 'left') targetElem.style.left = `-${targetElem.getBoundingClientRect().width}px`;
        if (direction === 'right') targetElem.style.right = `-${targetElem.getBoundingClientRect().width}px`;
        if (direction === 'top') targetElem.style.top = `-${targetElem.getBoundingClientRect().height}px`;
        if (direction === 'bottom') targetElem.style.bottom = `-${targetElem.getBoundingClientRect().height}px`;
        this._check_slide_open = false;

    }


    hideMode() {
        this._elem.style.display = 'none'
    }

    addClickToToggle() {
        let elemClick = this._config.drag_type.slideDrag.clickToOpen
        elemClick = document.getElementById(elemClick);

        if (!elemClick) return;
        elemClick.addEventListener('click', this._toggleSlideHandler.bind(this))
    }

    _toggleSlideHandler() {
        const slider = this._elem.parentElement;
        //add animation
        this._addAnimation(slider);

        //slide
        this._toggleSlide(this._config.drag_type.slideDrag.direction);

    }

    _toggleSlide(direction) {
        if (!this._check_slide_open) {
            this._elem.parentElement.style[direction] = `${0}px`;
            this._check_slide_open = true;
        }else if(this._check_slide_open) this.initElementPosition(this._elem.parentElement);

    }

    _addAnimation(targetElem) {
        targetElem.style.transition = `all ${this._config.drag_type.slideDrag.transitionDuration}s`;

        setTimeout(() => {
            targetElem.style.transition = 'unset'
        }, (this._config.drag_type.slideDrag.transitionDuration*1000)+200)
    }

    addStartSlideDragEvent(handler){
        this._elem.addEventListener('mousedown',handler)
    }

    addMoveSlideDragEvent(handler){
        document.addEventListener('mousemove',handler.bind(this))
    }

    addStopSlideDragEvent(handler){
        document.addEventListener('mouseup',handler.bind(this))
    }

    setPositionOnDrag(e){
        const direction = this._config.drag_type.slideDrag.direction;
        const clientBrowserDir = (direction === 'top' || direction === 'bottom')? 'clientHeight' : 'clientWidth';
        const eventDir = (direction === 'top' || direction === 'bottom')? 'clientY' : 'clientX';
        const elemFirstDirSize =  (direction === 'top' || direction === 'bottom')? this._first_elem_height : this._first_elem_width;
        //choose width or height
        const curElemDir = (direction === 'top' || direction === 'bottom')? 'height' : 'width'

        //check reverse  sizing to calc browser size
        const reverseDir = (direction === 'right' || direction === 'bottom');
        //set direction (rtl/ltr)
        const setEventMove = reverseDir?  elemFirstDirSize - e[eventDir] : elemFirstDirSize + e[eventDir]

        //set final distance
        const finalDist = (reverseDir?document.documentElement[clientBrowserDir] : 0) + setEventMove;

        //functionality
        this._elem.parentElement.style[curElemDir] =  finalDist + 'px';
    }
}

export default new slideDrag();