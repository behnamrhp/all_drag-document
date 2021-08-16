import {config} from "./config.js";
import free from './views/freeDrag.js';
import slide from './views/slideDrag.js';
import freeDrag from "./views/freeDrag.js";

class all_drag {
    _elem;
    _config;
    _dragDoneCount = 0;


    constructor() {
    }

    /**
     *
     * @return control custom config and get elem and choose drag type
     */
    create(elem, customConf) {
        elem = document.querySelector(`#${elem}`)
        //get config
        let usedConfig = {};
        if (customConf) usedConfig = customConf;
        else usedConfig = config;

        usedConfig = this._setConfig(usedConfig);

        this._config = usedConfig;
        this._elem = elem;

        //check drag type and start function
        if (usedConfig.drag_type.type === 'free') {
            this.controlFreeDrag()
        }
        if (usedConfig.drag_type.type === 'slide') {
            this.controlSlideDrag()
        }


        //get drag type


    }

    /**
     *
     * @return control free drag functionality
     */
    controlFreeDrag() {
        //set free drag configs
        this._config = this._setFreeDragConfigs(this._config);

        //set free drag view config
        freeDrag._config = this._config;

        //set element in view
        freeDrag._elem = this._elem;

        //check and add panel

        //set init element styles
        freeDrag.initElemStyle();

        //check and add panel
        if (this._config.drag_type.freeDrag.drag_place === 'panel') {
            //generate panel
            this._elem = freeDrag._generatePanel();

        }

        //set hover cursor
        freeDrag.addHoverHandler(freeDrag.setDraggingCursor(this._config.drag_type.freeDrag.hover_cursor));


        //start function
        freeDrag.addDragStartHandler(this.controlFreeDragStartHandler.bind(freeDrag))

        //dragging function
        freeDrag.addDragMoveHandler(this.controlFreeDragMoveHandler.bind(freeDrag));


        //ending function
        freeDrag.addDragStopHandler(this.controlFreeDragStopHandler.bind(freeDrag))
    }

    /**
     *
     * @return control slide drag functionality
     */
    controlSlideDrag() {

    }

    /**
     *
     * @param usedConfig {Object} user main custom config for plugin
     * @return {*}
     * @private
     */
    _setConfig(usedConfig) {
        //check exist drag type object
        if (!usedConfig.drag_type) usedConfig.drag_type = config.drag_type;

        //check exist custom drag type
        if (usedConfig.drag_type && !usedConfig.drag_type.type) usedConfig.drag_type.type = config.drag_type.type;

        //check exist dragging cursor icon
        if (!usedConfig.drag_cursor) usedConfig.drag_cursor = config.drag_cursor;

        //check revert
        if (!usedConfig.revert) usedConfig.revert = config.revert;

        //check draggable number
        if (!usedConfig.draggableAllowedNumber) usedConfig.draggableAllowedNumber = config.draggableAllowedNumber;

        //check panel exist
        if (!usedConfig.panel) usedConfig.panel = config.panel;

        //check panel color
        if (!usedConfig.panel.panel_color) usedConfig.panel.panel_color = config.panel.panel_color;

        //check panel height

        if (!usedConfig.panel.panel_height) usedConfig.panel.panel_height = config.panel.panel_height;

        //check panel height
        if (!usedConfig.panel.panel_radius) usedConfig.panel.panel_radius = config.panel.panel_radius;

        return usedConfig;

    }

    /**
     *
     * @param usedConfig {Object} user config for free drag has input
     * @return  set default or user config for free drag
     * @private
     */
    _setFreeDragConfigs(usedConfig) {
        //check there is no free drag config
        if (!usedConfig.drag_type.freeDrag) usedConfig.drag_type.freeDrag = config.drag_type.freeDrag;

        //check hover cursor
        if (!usedConfig.drag_type.freeDrag.hover_cursor) usedConfig.drag_type.freeDrag.hover_cursor = config.drag_type.freeDrag.hover_cursor;

        //check drag place
        if (!usedConfig.drag_type.freeDrag.drag_place) usedConfig.drag_type.freeDrag.drag_place = config.drag_type.freeDrag.drag_place;

        //check panel side
        if (!usedConfig.drag_type.freeDrag.panel_side) usedConfig.drag_type.freeDrag.panel_side = config.drag_type.freeDrag.panel_side;


        //check drag style
        if (!usedConfig.drag_type.freeDrag.drag_style) usedConfig.drag_type.freeDrag.drag_style = config.drag_type.freeDrag.drag_style;

        //check drag style scale
        if (!usedConfig.drag_type.freeDrag.drag_scale) usedConfig.drag_type.freeDrag.drag_scale = config.drag_type.freeDrag.drag_scale;

        //check drag style shadow color
        if (!usedConfig.drag_type.freeDrag.drag_shadow_color) usedConfig.drag_type.freeDrag.drag_shadow_color = config.drag_type.freeDrag.drag_shadow_color;

        //check drag style shadow blur
        if (!usedConfig.drag_type.freeDrag.drag_shadow_blur) usedConfig.drag_type.freeDrag.drag_shadow_blur = config.drag_type.freeDrag.drag_shadow_blur;

        //check drag style shadow distance
        if (!usedConfig.drag_type.freeDrag.drag_shadow_distance) usedConfig.drag_type.freeDrag.drag_shadow_distance = config.drag_type.freeDrag.drag_shadow_distance;

        //check drag style shadow distance
        if (!usedConfig.drag_type.freeDrag.allowedDistrict) usedConfig.drag_type.freeDrag.allowedDistrict = config.drag_type.freeDrag.allowedDistrict;

        return usedConfig
    }

    // _setSlideDragOptions(usedConf,customConf){
    //
    //     //set hover cursor option
    //     if (customConf.drag_type.type === 'free' && customConf.drag_type.freeDrag && customConf.drag_type.freeDrag.hover_cursor) {
    //         usedConf.drag_type.freeDrag.hover_cursor = customConf.drag_type.freeDrag.hover_cursor;
    //     }
    //
    //     //set drag place option
    //     if (customConf.drag_type.type === 'free' && customConf.drag_type.freeDrag && customConf.drag_type.freeDrag.drag_place) {
    //         usedConf.drag_type.freeDrag.drag_place = customConf.drag_type.freeDrag.drag_place;
    //     }
    //
    //     //set drag place option
    //     if (customConf.drag_type.type === 'free' && customConf.drag_type.freeDrag && customConf.drag_type.freeDrag.panel) {
    //         usedConf.drag_type.freeDrag.panel = customConf.drag_type.freeDrag.panel;
    //     }
    //     return usedConf
    // }


    /**
     *
     * @param e {Object} object of mouse down click events
     */
    controlFreeDragStartHandler(e) {
        e.preventDefault();

        //set start position
        [freeDrag._startPose.top, freeDrag._startPose.left] = [this._elem.offsetTop, this._elem.offsetLeft];
        [freeDrag._Pose.top, freeDrag._Pose.left] = [e.clientY, e.clientX];

        //set click press active
        freeDrag._checkClickPressed = true;


    }

    /**
     *
     * @param e {Object} object of mouse move click events
     */
    controlFreeDragMoveHandler(e) {

        if (!freeDrag._checkClickPressed) return;
        if (this._config.draggableAllowedNumber === 0 || this._dragDoneCount <= this._config.draggableAllowedNumber) {


            if (this._config.drag_cursor) {
                freeDrag.setDraggingCursor(this._config.drag_cursor);
            }


            //set mouse new pose
            const topMouseMove = freeDrag._Pose.top - e.clientY;
            const leftMouseMove = freeDrag._Pose.left - e.clientX;

            //set start position again
            [freeDrag._Pose.top, freeDrag._Pose.left] = [e.clientY, e.clientX];

            //set new element pose
            let targetElem;
            if (this._config.drag_type.freeDrag.drag_place !== 'panel') targetElem = this._elem
            else targetElem = this._elem.parentElement

            //set animate of dragging element
            if (this._config.drag_type.freeDrag.drag_style === 'elevate') freeDrag.freeDragAnimation(targetElem);

            targetElem.style.top = (targetElem.offsetTop - topMouseMove) + "px"
            targetElem.style.left = (targetElem.offsetLeft - leftMouseMove) + "px"

            //increase drag done count
            this._dragDoneCount++;
        }

    }


    controlFreeDragStopHandler() {
        if (!freeDrag._checkClickPressed) return;

        freeDrag._checkClickPressed = false;

        //set new element pose
        let targetElem;
        if (this._config.drag_type.freeDrag.drag_place !== 'panel') targetElem = this._elem
        else targetElem = this._elem.parentElement

        //set animate of dragging element deActive
        if (this._config.drag_type.freeDrag.drag_style === 'elevate') freeDrag.freeDragAnimation(targetElem, 'end');

        if (this._config.revert) freeDrag.revert(targetElem);
        //hover cursor activate
        freeDrag.addHoverHandler(freeDrag.setDraggingCursor(this._config.drag_type.freeDrag.hover_cursor));
    }
}

export const all_drag_plugin = new all_drag();
