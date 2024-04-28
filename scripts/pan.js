viewer = pannellum.viewer('panorama', {

    "default": {
        "firstScene": "entranceStairs",
        'author': "OEA Consults Ltd",
        "sceneFadeDuration": 1000,
        "autoLoad": true,
    },
    "scenes": {
        "entranceStairs": {
            "title": "Entrance staircase",
            "hfov": 300,
            "type": "equirectangular",
            "panorama": '../images/outside_stairs.jpg',
            "showControls": false,
            "hotSpots": [
                {
                    "pitch": 24,
                    "yaw": -1,
                    "type": "scene",
                    "text": "Entrance Landing",
                    "sceneId": "entranceDoor"
                }
            ]
        },

        "entranceDoor": {
            'title': 'Entrance Landing',
            "hfov": 3000,
            'type': "equirectangular",
            "panorama": '../images/entrance_door_hdr.jpg',
            "showControls": false,
            "hotSpots": [
                {
                    "pitch": -15,
                    "yaw": -10,
                    "type": "scene",
                    "text": "Reception",
                    "sceneId": "reception"
                },
                {
                    "pitch": -40,
                    "yaw": -88,
                    "type": "scene",
                    "text": "Entrance Staircase",
                    "sceneId": "entranceStairs"
                }
            ]
        },
        "reception": {
            'title': 'Reception Desk',
            "type": "equirectangular",
            'hfov': 300,
            "panorama": '../images/reception.jpg',
            'showControls': false,
            "hotSpots": [
                {
                    "pitch": 0
                }
            ]
        }
    }
});