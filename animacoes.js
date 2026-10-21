/* animacoes.js
   Faz os blocos maiores aparecerem com um fade suave ao entrar na tela.
   Sem JS, ou com "reduzir movimento" ativado no sistema, tudo fica visível normalmente. */
(function () {
  var reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir || !('IntersectionObserver' in window)) return;

  // Só blocos de conteúdo abaixo da dobra; o topo de cada página já tem animação própria em CSS.
  var alvos = document.querySelectorAll(
    '.callout, .section2 .bloco1, .section2 .bloco2, .projeto, .bloco, ' +
    '.galeriaprojetos, .bio-card, .bio-secao'
  );

  var observador = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      var el = entrada.target;
      el.classList.add('is-visible');
      observador.unobserve(el);
      // Remove as classes depois da transição para não interferir nos hovers.
      setTimeout(function () {
        el.classList.remove('reveal', 'is-visible');
      }, 800);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  alvos.forEach(function (el) {
    el.classList.add('reveal');
    observador.observe(el);
  });
})();