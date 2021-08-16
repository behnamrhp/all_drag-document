import parent from './parentDrag.js';

class freeDrag extends parent {

    constructor() {
        super();
    }

    addDragStartHandler(handler) {
        this._elem.addEventListener('mousedown',handler)
    }

    addDragMoveHandler(handler) {
        document.addEventListener('mousemove', handler)
    }

    addDragStopHandler(handler){
        document.addEventListener('mouseup', handler)
    }

    addHoverHandler(handler) {
        this._elem.addEventListener('mouseenter', handler)
    }

    freeDragAnimation(targetElem,style = 'start'){

        targetElem.style.transform = `${style === 'start' ? `scale(${this._config.drag_type.freeDrag.drag_scale})` :'scale(1)'}`;
        targetElem.style.boxShadow = `${style === 'start' ? ` 0px ${this._config.drag_type.freeDrag.drag_shadow_distance}px ${this._config.drag_type.freeDrag.drag_shadow_blur}px ${this._config.drag_type.freeDrag.drag_shadow_color}` : ''}`;

    }




    dragStop() {
    }
}

export default new freeDrag();