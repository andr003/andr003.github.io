$(function () {
    
    // ====== VARIABILI GLOBALI ======
    const carouselItems = $(".carousel-item");
    const dots = $(".dot");
    let currentIndex = 0;
    const totalItems = carouselItems.length;

    // ====== INIZIALIZZAZIONE ======
    
    // --- Inizializzazione delle sezioni ---
    // Nasconde tutte le sezioni tranne la prima
    $(".main-content section").addClass("section-hidden");
    $("#home").removeClass("section-hidden");
    
    
    // --- Inizializzazione del carosello ---
    updateCarousel();

    // ====== FUNZIONI UTILITY ======
    
    // --- Funzione per aggiornare il carosello ---
    function updateCarousel() {
        // Rimuove la classe active da tutti gli elementi e aggiunge hidden
        carouselItems.removeClass("active").addClass("hidden");
        // Mostra solo l'elemento corrente
        carouselItems.eq(currentIndex).removeClass("hidden").addClass("active");
        
        // Aggiunge animazione di fade-in all'immagine attiva
        carouselItems.eq(currentIndex).find("img").css("opacity", 0);
        carouselItems.eq(currentIndex).find("img").animate({ opacity: 1 }, 1000);
        
        // Aggiorna gli indicatori (dots)
        dots.removeClass("active-dot");
        dots.eq(currentIndex).addClass("active-dot");
    }
    
    // --- Funzione per impostare il link attivo nella navbar ---
    function setActiveNav(target) {
        // Rimuove la classe "active-link" da tutti i link
        $(".navbar nav a").removeClass("active-link");
        // Aggiunge la classe "active-link" al link corrispondente al target
        $(".navbar nav a").each(function () {
            if ($(this).attr("href") === target) {
                $(this).addClass("active-link");
                console.log("Link attivo impostato per:", target);
            }
        });
    }
    
   // --- Funzione per mostrare una sezione specifica ---
    function showSection(target) {
        // Nasconde tutte le sezioni con i loro contenuti
        $(".main-content section").addClass("section-hidden");
        // Mostra la sezione corrispondente al target con tutti i suoi contenuti
        $(target).removeClass("section-hidden");
        
        // Imposta il link attivo nella navbar
        setActiveNav(target);
        // Scorri alla sezione in modo fluido
        $("html, body").animate({
            scrollTop: $(target).offset().top
        }, 500);
    }

    // ====== GESTIONE CAROSELLO ======
    
    // --- Click sui pulsanti di navigazione del carosello ---
    $(".carousel-next").on("click", function () {
        // Tramite il modulo ci assicuriamo che currentIndex sia sempre all'interno del range corretto
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

    $(".carousel-prev").on("click", function () {
        // Calcolo per avere il numero intero corretto
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });
    
    // --- Click sui punti indicatori del carosello ---
    dots.on("click", function () {
        // Prendiamo l'indice del punto cliccato
        const index = dots.index(this);
        // Aggiorniamo l'indice corrente
        currentIndex = index;
        // Aggiorniamo il carosello
        updateCarousel();
    });
    
    // --- Click sull'immagine attiva per aprire link esterno ---
    $(".carousel-track").on("click", ".carousel-item.active", function () {
        const link = $(this).data("link");
        if (link) {
            // Apre il link in una nuova pagina
            window.open(link, "_blank");
        }
    });
    
    // --- Aggiornamento carosello quando si naviga alla sezione progetti ---
    $(".navbar a[href='#projects'], .cta[data-target='#projects']").on("click", function () {
        updateCarousel();
    });

    // ====== GESTIONE NAVIGAZIONE ======
    
    // --- Click sui pulsanti CTA ---
    $(".cta").on("click", function () {
        const target = $(this).data("target");
        showSection(target);
    });

    // --- Click sulla navbar ---
    $(".navbar a").on("click", function (e) {
        e.preventDefault(); // Previene il comportamento predefinito del link
        const target = $(this).attr("href");
        showSection(target);
    });

    // ====== GESTIONE LINK ======
    
    // --- Aggiunta classe "visited" ai link cliccati ---
    $("a").on("click", function () {
        $(this).addClass("visited");
    });

});