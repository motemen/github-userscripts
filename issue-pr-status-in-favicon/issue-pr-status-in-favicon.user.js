// ==UserScript==
// @name      GitHub PR Build Status in Favicon
// @namespace http://motemen.github.io/
// @match     https://github.com/*
// ==/UserScript==
(function () {

function $$ (selector) {
  return Array.prototype.slice.call(document.querySelectorAll(selector));
}

var originalFaviconURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAE10lEQVRYR62XW2gcZRTHZ3ZmNnt1Z3cTk6K2Fm/0pcXGFEQrWor6IJQ2IqjVavOQ+iBUUBAFRUURFKwiWMTEu6Boo4JQtPYi8UV7sw8WpVJbKjYmu9nNXrLZ2dnx962ZZTI7u5s1GRjY/b5z+Z/z/c/5zsjS4p/uaDS6xa8ot0mKslaWpNWKzxcR6ma1mrck6axkmqfKpnkol8t9xfLUYkxjp/UTCoWuDwQCTyK4TVUUtZ282K+YZgVA+0ql0svFYvFEK52mAOLxeEyW5VcRGMJxW6BeTgBiAWTEsqzHp6ens14ynoZF1KFA4AtFUVYvJuJ2MqZpni2WSoNe2WgAEIlENnX5/WNEfUk7w53sk42ZuXJ5az6fP+jUWwAgFov14/jgcju3HQoQvJuy2ewxe60OAOdxHB/nvdKhcJrf4t3cKSjhDL0DvGvQXeOw+Sd76wExLdbqAJKJxCiCDzvTU65UHoA8H7HWRQlu52hepPR67bKzTPM/I4oSt8uSvQlS/TSlKPTmIPN2v6p+6LQLgHdT6fTOOgBId0M0HP7Zfaa5QqEf4hy310VlFAqFFeVy+XfWqi55n9/vvzYcDv/tZDy212O7nnJbB9sD2D5aywDR7yP6rR4ANiDUAKwT8gFgAAA/uXXIwhhZ2CYA9AHgAgAUt9CcYTyUyWTe78ShW1bX9R1dmvaeBwATAJfL8Uhk2B8M7nULVE3zwmQ6vY719FIAoJvgOakpyhVuO+XZ2V0ym5+yeY97k8YxBJFGl+i8pg6Bd9LYRty2DNP8TCb9vzrLRAhxPmbVspLN2menoAR5fbKcch8zfk7L3clkkdIKOo1WqtXzqVRqVaeOWsknk8lzqs+30ilDyc7KvT093BcLHzbOTKVS1ywnAAI9Q6BXuW16AiA1ORi6rHcBRz3DEUQbADTbmJic7EX4n2XKwqVkesKjFHNyt66fVDRNlNuChx6wgx7wwXIAoBc8SC9o6CemYfwiynCEMqz15QUEMYxTU5lMvyiKJYJQCfIYQa71KMNROR4O3+sPhT7xckKd7kmn048tBQABvkaAu71slIvF+0QrjsLQizA05CUEIT+HkI+yd7FDICvg1xsQ724vPSqtSKX11S4jGsVbXJm7xG+u4FcMw/iG/y9omrZRrAHC8EnSl/Sn70qGcWJ+tDJdhtVoMDiAw3Vci7ezdxe/tWag8bOXRveIDWAlGfiNN1AbJKvVJ9KZzJtE8ANGNjiNzN9ig6y5+4ec1PUxVdO2tMsU0Zd4rwPA+fpAAlOfganP2coz+fyNTLMTXKdHnBcJyDeiOO7lhHnylnAweKQdACrsWSrseSHnnAlVCHMYZzfNp/1bzv4OfutcJoOqqvYyiBxlIPmeNXf6bZ891HvL3gGxf4TYt4qTdQMQ//sg5LjdMkG6G6Svt4vIsa8DoDameT2k/Q+IdzN7dUI3jOV8Ba2KhMMHAHG1MAIjxmkYX3NBTZKFPtK/h+VSEx9NAYj7JV8obOZr6ZxTt9kXjxgiPuY47nQ7okXHWct0AoC07yft96PTMNy0+uSSE7HYkE9VXyIbPbbDTgBQtlNMVk+ls9l30G+4db044BVYJKHrw4zew5JlJSDmZQjNNclAF6X7lyTLaatSeRvHYtTLt+LQ//ro7ICUbUX/BYZWLhBjkaZJAAAAAElFTkSuQmCC';

var observer = new MutationObserver(function (mutations) {
  update();
});
observer.observe(document.body, { childList: true, subtree: true });

function update() {
  var buildStatusColor = (function () {
    // .timeline-commits .commit-meta .status
    var elem = $$('.build-status-description')[0];
    if (!elem) return null;
    return getComputedStyle(elem).color;
  })();

  if (!buildStatusColor) return;

  var image = new Image();
  image.src = originalFaviconURL;
  image.onload = function () {
    var canvas = document.createElement('canvas');
    canvas.width  = image.naturalWidth;
    canvas.height = image.naturalHeight;

    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.strokeStyle = '#FFF';

    ctx.lineWidth = 2;
    ctx.fillStyle = buildStatusColor;
    ctx.arc(
      canvas.width * 4 / 5, canvas.height * 4 / 5,
      Math.min(canvas.width / 5, canvas.height / 5),
      0, Math.PI * 2,
      true
    );
    ctx.fill();
    ctx.stroke();

    $$('link[rel="icon"]').forEach(function (existingFaviconLink) {
      existingFaviconLink.parentNode.removeChild(existingFaviconLink);
    });

    var newFaviconLink = document.createElement('link');
    newFaviconLink.setAttribute('rel', 'icon');
    newFaviconLink.setAttribute('href', ctx.canvas.toDataURL())
    $$('head')[0].appendChild(newFaviconLink);
  };
}

update();

})();
