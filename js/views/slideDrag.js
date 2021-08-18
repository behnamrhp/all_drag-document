import parent from './parentDrag.js';

class slideDrag extends parent{
    _direction;
    _closePercent;
    _closeStyle;
    _slide_type;
    constructor() {
        super();
    }


    initElementPosition(){
        //get config direction
        const direction = this._config.drag_type.slideDrag.direction;

        //set styles
        console.log(this._elem.getBoundingClientRect())
        if (direction === 'left') this._elem.style.left = 0 +'px';
    }

    addPanel(){}

    hideMode(){}
}

export default new slideDrag();