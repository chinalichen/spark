//Edge Blob polyfill https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob
if (!HTMLCanvasElement.prototype.toBlob) {
  Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
    value: function (callback, type, quality) {
      var canvas = this;
      setTimeout(function () {
        var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]),
          len = binStr.length,
          arr = new Uint8Array(len);

        for (var i = 0; i < len; i++) {
          arr[i] = binStr.charCodeAt(i);
        }

        callback(new Blob([arr], { type: type || 'image/png' }));
      });
    }
  });
}

export function generateThumbnail(svgElem, fileName, callback) {
  var canvas = document.createElement('canvas')
  var ctx = canvas.getContext('2d');

  var svg = new XMLSerializer().serializeToString(svgElem);
  var data = encodeURIComponent(svg);
  var img = new Image();
  img.onload = function () {
    ctx.drawImage(img, 0, 0);
    console.log(canvas.toDataURL());

    canvas.toBlob(function (blob) {
      var file = blobToFile(blob, fileName);
      if (callback) {
        callback(file);
      }
      // var newImg = document.createElement('img'),
      //   url = URL.createObjectURL(blob);

      // newImg.onload = function () {
      //   // no longer need to read the blob so it's revoked
      //   URL.revokeObjectURL(url);
      // };

      // newImg.src = url;
      // document.body.appendChild(newImg);
    });
  }

  img.src = "data:image/svg+xml," + data;

}

function blobToFile(blob, fileName) {
  if (File) {
    return new File([blob], fileName, { type: 'image/png', lastModified: Date.now() });
  }
  blob.name = fileName;
  blob.lastModified = new Date();
  return blob;
}
