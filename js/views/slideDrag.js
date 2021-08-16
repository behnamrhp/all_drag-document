import parent from './parentDrag.js';

class sliDrag extends parent{
    _direction;
    _closePercent;
    _closeStyle;
    _slide_type;
    constructor() {
        super();
    }
}

export default new sliDrag();