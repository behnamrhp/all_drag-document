export let config = {
    drag_type: {
        type: 'free',
        freeDrag: {
            hover_cursor: 'auto',
            drag_place: 'self',
            panel_side: 'top',
            drag_style: 'flat',
            drag_scale: '1.05',
            drag_shadow_color: '#737373',
            drag_shadow_blur: '5',
            drag_shadow_distance: '5',
            allowedDistrict:false
        },
        slideDrag: {
            direction: 'left',
            closePercent: 50,
            openPercent: 70,
            clickToOpen: false,
            hideStyle: 'panel'
        }
    },
    drag_cursor: false,
    revert: false,
    draggableAllowedNumber: 0,
    panel: {
        activate: true,
        panel_color: '#656565',
        panel_height: '15',
        panel_radius: '10',
        panel_hide:false
    }

}

