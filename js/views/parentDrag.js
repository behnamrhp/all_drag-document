export default class mainDrag {
    _config;
    _elem;
    _checkClickPressed = false;
    _startPose = {};
    _Pose = {};


    setDraggingCursor(cursor) {
        this._elem.style.cursor = (cursor.includes('png') || cursor.includes('png') || cursor.includes('image')) ? `url(${cursor}),pointer` : `${cursor}`
    }

    revert(targetElem){
        targetElem.style.top = this._startPose.top + "px"
        targetElem.style.left = this._startPose.left + "px"
    }

    initElemStyle() {
        if (this._config.drag_type.type === 'free') this._elem.classList.add('all_drag_free_drag')
        else this._elem.classList.add('all_drag_slide_drag')
    }

    /**
     *
     * @return {_elem} set panel to main element to drag
     * @private
     */
    _generatePanel() {
        const html = `<div class="all_drag_panel"><span class="all_drag_panel-icon"></span>&nbsp;</div>`;
        try {
            if (!this._checkElementHasClosingTag(this._elem.tagName)) throw new Error(`please choose element that has closing tag for panel`)
            this._elem.insertAdjacentHTML('afterbegin', html);

            //add panel height
            this._elem.querySelector('.all_drag_panel').style.height = this._config.panel.panel_height + 'px'

            //add panel color
            this._elem.querySelector('.all_drag_panel').style.background = this._config.panel.panel_color;

            //add panel position and radius
            this._setPanelPositionAndRadius();

            //set panel to main element to drag
            this._elem = this._elem.querySelector('.all_drag_panel');

            return this._elem

        } catch (err) {
            console.error(err)
        }

    }


    /**
     *
     * @param {string} tagName  string of tag name
     * @return {boolean} check to if input tag has closing tag to add panel in it
     * @private
     */
    _checkElementHasClosingTag(tagName) {
        try {
            const e = document.createElement(tagName);
            return e.outerHTML.includes('/')
        } catch (err) {
            return false
        }
    }

    /**
     *
     * @private
     * @return set panel position and panel radius if panel exist
     */
    _setPanelPositionAndRadius(){
        const radius = this._config.panel.panel_radius;

        if (this._config.drag_type.freeDrag.panel_side === 'top') {
            this._elem.querySelector('.all_drag_panel').style.top = '0';
            this._elem.querySelector('.all_drag_panel').style.left = '0';

            //set radius
            this._elem.querySelector('.all_drag_panel').style.borderRadius = `${radius}px ${radius}px 0 0`;
        }
        if (this._config.drag_type.freeDrag.panel_side === 'bottom') {
            this._elem.querySelector('.all_drag_panel').style.bottom = '0';
            this._elem.querySelector('.all_drag_panel').style.left = '0';

            //set radius
            this._elem.querySelector('.all_drag_panel').style.borderRadius = ` 0 0 ${radius}px ${radius}px `;
        }
        if (this._config.drag_type.freeDrag.panel_side === 'right') {
            this._elem.querySelector('.all_drag_panel').style.right = '0';
            this._elem.querySelector('.all_drag_panel').style.width = this._config.panel.panel_height + 'px';
            this._elem.querySelector('.all_drag_panel').style.height = '100%';

            //set radius
            this._elem.querySelector('.all_drag_panel').style.borderRadius = ` 0 ${radius}px ${radius}px 0 `;
        }
        if (this._config.drag_type.freeDrag.panel_side === 'left') {
            this._elem.querySelector('.all_drag_panel').style.left = '0';
            this._elem.querySelector('.all_drag_panel').style.width = this._config.panel.panel_height + 'px';
            this._elem.querySelector('.all_drag_panel').style.height = '100%';

            //set radius
            this._elem.querySelector('.all_drag_panel').style.borderRadius = ` ${radius}px 0 0 ${radius}px`;
        }

    }

}