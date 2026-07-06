window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);
  const paneles = gsap.utils.toArray('.panel');

  paneles.forEach((panel, i) => {
    if (i < paneles.length - 1) {
      ScrollTrigger.create({
        trigger: panel,
        start: "top top",
        pin: true,
        pinSpacing: false,
        scrub: true,
        anticipatePin: 1 // Previene parpadeos gráficos durante el scroll
      });
    }
  });
});
