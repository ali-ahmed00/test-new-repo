AFRAME.registerComponent('falling-object', {
  schema: {
    speed: { type: 'number', default: 0.01 }
  },
  init: function () {
    this.el.addEventListener('click', () => {
      this.el.parentNode.removeChild(this.el); // "Catch" the object
    });
  },
  tick: function (time, delta) {
    let pos = this.el.getAttribute('position');
    pos.y -= this.data.speed * (delta / 16);
    this.el.setAttribute('position', pos);

    // Remove if below the ground
    if (pos.y < -1) {
      this.el.parentNode.removeChild(this.el);
    }
  }
});

function spawnObject() {
  const container = document.querySelector('#falling-container');
  if (!container) return;

  const entity = document.createElement('a-box'); // Or use a-entity with glTF
  const x = (Math.random() - 0.5) * 2; // Range -1 to 1
  const z = (Math.random() - 0.5) * 2;

  entity.setAttribute('position', { x, y: 2, z });
  entity.setAttribute('color', '#' + Math.floor(Math.random() * 16777215).toString(16));
  entity.setAttribute('falling-object', { speed: 0.01 + Math.random() * 0.02 });
  entity.setAttribute('scale', '0.3 0.3 0.3');
  entity.setAttribute('gesture-handler', ''); // optional touch controls
  entity.setAttribute('shadow', '');

  container.appendChild(entity);
}

// spawn an object every 2 seconds
setInterval(spawnObject, 2000);
