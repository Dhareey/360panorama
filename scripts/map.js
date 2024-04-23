const map = L.map('map').setView([6.5244, 3.3792], 11);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const imageContainer = document.querySelector('.pano');
const nextButton = document.getElementById('nextButton');
const arrow = document.querySelector('.arrow');
let currentPanoramaIndex = 0;

// Define an array of panorama image paths
const panoramaImagePaths = [
  '../test3/pano1.jpg',
  '../test2/papg',
  // Add more panorama images as needed
];

// Load the first panorama
loadPanorama(panoramaImagePaths[currentPanoramaIndex]);

// Add a click event listener to the "Next" button
nextButton.addEventListener('click', () => {
  // Increment the current panorama index
  currentPanoramaIndex++;

  // If we reach the end of the panoramaImagePaths array, loop back to the beginning
  if (currentPanoramaIndex >= panoramaImagePaths.length) {
    currentPanoramaIndex = 0;
  }

  // Load the next panorama
  loadPanorama(panoramaImagePaths[currentPanoramaIndex]);
});

function loadPanorama(imagePath) {
  // Load the image
  const panoramaImage = new Image();
  panoramaImage.src = imagePath;

  // Use Exif.js to read GPS information from the image
  panoramaImage.onload = function() {
    EXIF.getData(panoramaImage, function() {
      const exifData = EXIF.getAllTags(panoramaImage);
      const gpsLatitude = exifData.GPSLatitude;
      const gpsLongitude = exifData.GPSLongitude;

      // Convert GPS coordinates from degrees, minutes, seconds to decimal degrees
      const decimalLatitude = convertDMSToDD(gpsLatitude[0], gpsLatitude[1], gpsLatitude[2], exifData.GPSLatitudeRef);
      const decimalLongitude = convertDMSToDD(gpsLongitude[0], gpsLongitude[1], gpsLongitude[2], exifData.GPSLongitudeRef);

      // Create a Panolens panorama using the GPS coordinates
      const panorama = new PANOLENS.ImagePanorama(imagePath);
      panorama.link(panorama, new THREE.Vector3(decimalLongitude, decimalLatitude, 0)); // Set the initial camera position

      // Create a Panolens viewer and add the panorama to it
      const panoramaViewer = new PANOLENS.Viewer({
        container: imageContainer,
      });
      panoramaViewer.add(panorama);

      // Set panorama default view angle
      panorama.addEventListener('enter', () => {
        panorama.setPitch(0); // Set the pitch to 0 degrees (horizontal)
      });

      // Set the field of view (FOV)
      panoramaViewer.camera.fov = 100;
      panoramaViewer.camera.updateProjectionMatrix();

      // Update arrow position based on panorama's camera orientation
      panoramaViewer.addEventListener('camera-change', () => {
        const cameraOrientation = panoramaViewer.camera.getWorldDirection(new THREE.Vector3());
        arrow.style.left = '50%';
        arrow.style.bottom = '50%';
        arrow.style.transform = `translate(-50%, -50%) rotate(${Math.atan2(cameraOrientation.x, cameraOrientation.z)}rad)`;
      });
    });
  }
}

// Function to convert degrees, minutes, seconds to decimal degrees
function convertDMSToDD(degrees, minutes, seconds, direction) {
  let dd = degrees + minutes / 60 + seconds / (60 * 60);
  if (direction === 'S' || direction === 'W') {
    dd = -dd;
  }
  return dd;
}
