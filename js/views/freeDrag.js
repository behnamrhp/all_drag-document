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

    containerLimitX(targetElem, XPose ){

        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        if (container.getBoundingClientRect().left > +XPose ) return false;



        return container.getBoundingClientRect().width + container.getBoundingClientRect().left >= +XPose;


    }

    containerLimitY(targetElement,YPose){
        let container = this._config.drag_type.freeDrag.allowedDistrict;

        if (!document.querySelector(`#${container}`) ){
            console.error('couldn\'t find any container please choose correct container id')
            return false;
        }

        container  = document.querySelector(`#${container}`);

        if (container.getBoundingClientRect().top > +YPose ) return false;

        return container.getBoundingClientRect().top + container.getBoundingClientRect().height >= +YPose;


    }

}

export default new freeDrag();