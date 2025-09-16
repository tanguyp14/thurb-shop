document.addEventListener('DOMContentLoaded', function () {
    const targetText = 'FIRSTLOVE MARKET 💙';
    
    function animateLink() {
        document.querySelectorAll('nav a span').forEach(function (link) {
            const cleanText = link.textContent.trim().replace(/\s+/g, '').toUpperCase();
            const cleanTarget = targetText.replace(/\s+/g, '').toUpperCase();

            if (cleanText === cleanTarget && !link.dataset.animated) {
                link.dataset.animated = 'true';
                link.textContent = '';

                // ✅ Utiliser Array.from pour gérer correctement les emojis
                const chars = Array.from(targetText);
                const spans = [];

                chars.forEach((char, i) => {
                    const span = document.createElement('span');

                    if (char === ' ') {
                        span.innerHTML = '&nbsp;';
                        span.style.display = 'inline-block';
                        span.style.width = '0.5em';
                    } else {
                        span.textContent = char;
                        span.style.display = 'inline-block';
                        span.style.transition = `
                            transform 0.4s cubic-bezier(.68,-0.55,.27,1.55),
                            color 0.4s ease-in-out
                        `;
                        span.style.color = 'inherit';
                        
                        // ✅ Traitement spécial pour les emojis
                        if (isEmoji(char)) {
                            span.style.fontSize = '1.1em'; // Optionnel: agrandir l'emoji
                            span.classList.add('emoji-char');
                        }
                    }

                    link.appendChild(span);
                    spans.push(span);
                });

                function waveAnimation() {
                    spans.forEach((span, i) => {
                        if (span.textContent.trim() !== '') {
                            setTimeout(() => {
                                span.style.transform = 'translateY(-6px) rotate(-360deg)';
                                if (!span.classList.contains('emoji-char')) {
                                span.style.transform = 'translateY(-6px) rotate(-10deg)';
                                    span.style.color = '#a0e3fc';
                                }
                                
                                setTimeout(() => {
                                    span.style.transform = 'translateY(0)';
                                    if (!span.classList.contains('emoji-char')) {
                                        span.style.color = '#329FFE';
                                    }
                                    
                                    setTimeout(() => {
                                        // Retour à la couleur d'origine
                                        if (!span.classList.contains('emoji-char')) {
                                            span.style.color = '';
                                        }
                                    }, 300);
                                }, 400);
                            }, i * 60);
                        }
                    });
                }

                const totalDuration = (spans.length - 1) * 60 + 400;

                setTimeout(function loop() {
                    waveAnimation();
                    setTimeout(loop, totalDuration + 6000);
                }, 500);
            }
        });
    }
    
    // ✅ Fonction pour détecter les emojis
    function isEmoji(char) {
        // Regex pour détecter les emojis Unicode
        const emojiRegex = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/;
        return emojiRegex.test(char);
    }
    
    // Exécuter immédiatement
    animateLink();
    
    // Observer les changements dans le DOM
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                animateLink();
            }
        });
    });
    
    // Observer le menu
    const menuContainer = document.querySelector('nav[header-menu]');
    if (menuContainer) {
        observer.observe(menuContainer, {
            childList: true,
            subtree: true
        });
    }

    //Supprime les controls sur les vidéos
    document.querySelectorAll('deferred-media > video').forEach(function(video) {
        video.removeAttribute('controls');
    });
});


document.addEventListener('DOMContentLoaded', function() {
  // Sélection de TOUS les boutons de fermeture
  const closeButtons = document.querySelectorAll('.menu-drawer__close-button');
  const detailsContainer = document.getElementById('Details-menu-drawer-container');

  if (closeButtons.length > 0 && detailsContainer) {
    // Ajout de l'événement à chaque bouton
    closeButtons.forEach(button => {
      button.addEventListener('click', function() {
        detailsContainer.removeAttribute('open');
      });
    });
  }
});
