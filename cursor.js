(() => {
  "use strict";

  const CUBE_LIFETIME = 1000; // Tiempo que el cubo permanece visible (1 segundo)
  const CUBE_FADE_MS = 350;    // Tiempo que tarda en desvanecerse
  const GRID = 24;            // Tamaño de cada celda en píxeles

  const cubesEl = document.getElementById("cubes");
  const cubeMap = new Map();

  let isPointerDown = false;
  let dragMode = "draw";
  let rafMove = null;
  let lastEvent = null;

  const keyOf = (x, y) => `${x},${y}`;
  const snap = (v) => Math.floor(v / GRID) * GRID;

  function addCube(x, y) {
    if (!cubesEl) return;
    const key = keyOf(x, y);
    if (cubeMap.has(key)) return;

    const d = document.createElement("div");
    d.className = "cube";
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;

    cubesEl.appendChild(d);
    cubeMap.set(key, d);

    window.setTimeout(() => {
      if (!cubeMap.has(key)) return;
      d.classList.add("is-dying");

      window.setTimeout(() => {
        if (!cubeMap.has(key)) return;
        d.remove();
        cubeMap.delete(key);
      }, CUBE_FADE_MS);
    }, CUBE_LIFETIME);
  }

  function removeCube(x, y) {
    const key = keyOf(x, y);
    const el = cubeMap.get(key);
    if (!el) return;
    el.remove();
    cubeMap.delete(key);
  }

  function inBounds(x, y, rect) {
    return x >= 0 && y >= 0 && x <= rect.width - GRID && y <= rect.height - GRID;
  }

  function getLocalPoint(e) {
    const rect = cubesEl.getBoundingClientRect();
    const x = snap(e.clientX - rect.left);
    const y = snap(e.clientY - rect.top);
    const clampedX = Math.max(0, Math.min(x, snap(rect.width - GRID)));
    const clampedY = Math.max(0, Math.min(y, snap(rect.height - GRID)));
    return { x: clampedX, y: clampedY, rect };
  }

  function paintAtEvent(e, forceMode = null) {
    if (!cubesEl) return;
    const { x, y, rect } = getLocalPoint(e);
    if (!inBounds(x, y, rect)) return;

    const key = keyOf(x, y);
    const has = cubeMap.has(key);
    const mode = forceMode ?? dragMode;

    if (mode === "erase") {
      if (has) removeCube(x, y);
    } else {
      addCube(x, y);
    }
  }

  function onMoveRaf() {
    rafMove = null;
    if (!lastEvent) return;

    if (isPointerDown) {
      paintAtEvent(lastEvent);
    } else {
      paintAtEvent(lastEvent, "draw");
    }
  }

  window.addEventListener("pointermove", (e) => {
    lastEvent = e;
    if (!rafMove) rafMove = requestAnimationFrame(onMoveRaf);
  });

  window.addEventListener("pointerdown", (e) => {
    if (e.button !== 0) return;
    isPointerDown = true;

    const { x, y } = getLocalPoint(e);
    dragMode = cubeMap.has(keyOf(x, y)) ? "erase" : "draw";
    paintAtEvent(e);
  });

  window.addEventListener("pointerup", () => {
    isPointerDown = false;
    dragMode = "draw";
  });

  window.addEventListener("blur", () => {
    isPointerDown = false;
    dragMode = "draw";
  });
})();
