const map = L.map('map').setView([6.5244, 3.3792], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

var geojsonLayer = L.geoJSON(null, {
  style: {
    weight: 2
  },
  onEachFeature: function (feature, layer) {
    // Add a custom property to each layer indicating the route name
    var routeName = feature.properties.Name;

    // Bind a popup with route information to each layer
    layer.bindPopup('Route: ' + routeName);

    layer.on("mouseover", function(e){
      layer.setStyle({
        weight: 10,  // Adjust the thickness as needed
    });
      this.openPopup();
    })

    layer.on("mouseout", function(e) {
      layer.setStyle({
        weight: 2,
      })
      this.closePopup();
    })

    // Bind the dragend event to each layer
    layer.on('mouseup', function (ev) {
        // Check if the dragged icon is within the proximity of a route
        console.log("Route Name:",routeName);
        console.log('Coordinates:', ev.latlng.lat, ev.latlng.lng);
    });

}
}).addTo(map);


var legend = L.control({ position: 'topleft' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<img id="draggable-icon" class="draggable-icon" src="../images/street-view.png">';
    return div;
};

legend.addTo(map);

var draggableIcon = L.DomUtil.get('draggable-icon');
L.DomEvent.disableClickPropagation(draggableIcon);


var isDragging = false;

  L.DomEvent.addListener(draggableIcon, 'mousedown', function (e) {
    isDragging = true;
    map.dragging.disable();
    updateGeoJSONFromFile('geojson/route.geojson')
  });


  L.DomEvent.addListener(document, 'mousemove', function (e) {
    if (isDragging) {
        var iconPosition = map.mouseEventToLayerPoint(e);
        draggableIcon.style.left = iconPosition.x + 'px';
        draggableIcon.style.top = iconPosition.y + 'px';

      // Run your function when the icon is dragged
      // Load GeoJSON data from file and update the GeoJSON layer
      
    }
  });

  L.DomEvent.addListener(document, 'mouseup', function (e) {
    if (isDragging) {
      isDragging = false;
      map.dragging.enable();
      // Clear GeoJSON layer when dragging stops (optional)
      geojsonLayer.clearLayers();
    }
  });

  function updateCoordinates(latlng) {
    console.log('Coordinates:', latlng.lat, latlng.lng);
    // You can perform other actions or update your UI based on the new coordinates here
  }


  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Draggable function here
/**


  */
  const droppable = new Draggable.Droppable(
    document.querySelectorAll('.legend'),
    {
      draggable: '.draggable-icon',
      dropzone: '#map',
      mirror: {
        constrainDimensions: true,
      }
    },
  );

  droppable.on('droppable:dropped', (evt) => {
    evt.cancel()
  });


  function updateGeoJSONFromFile(geojsonFile) {
    // Use fetch to load GeoJSON data from file
    fetch(geojsonFile)
        .then(response => response.json())
        .then(data => {
          console.log(data)
            // Create a GeoJSON layer with the loaded data and add it to the map
            geojsonLayer.clearLayers().addData(data.features);
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
        });
}
