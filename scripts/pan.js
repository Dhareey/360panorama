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
            "panorama": "scripts/outside_entrance_hdr.jpg",
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
            "hfov": 300,
            'type': "equirectangular",
            "panorama": 'scripts/entrance_door_hdr.jpg',
            "hotSpots": [
                {
                    "pitch": -2.1,
                    "yaw": 132.9,
                    "type": "scene",
                    "text": "Entrance Landing",
                    "sceneId": "entranceStairs"
                }
            ]
        }
    }
});