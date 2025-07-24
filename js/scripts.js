$(function () {
    // Gestione click per aggiungere la classe "visited"
    $("a").on("click", function () {
        $(this).addClass("visited");
    });

    // ======= gestione sezioni in modo dinamico =======
    //Nasconde tutte le sezioni tranne la prima
    $(".main-content section").addClass("hidden");
    $("#home").removeClass("hidden");

    //Gestione click sui pulsanti CTA
    $(".cta").on("click", function () {
        // Prende il target del pulsante cliccato
        const target = $(this).data("target");
        // Nasconde tutte le sezioni
        $(".main-content section").addClass("hidden");
        // Mostra la sezione corrispondente al target
        $(target).removeClass("hidden");
        $("html, body").animate({
            scrollTop: $(target).offset().top}, 500); // Scorri alla sezione in modo fluido
    });

    // Gestione click sulla navbar
    $(".navbar a").on("click", function (e) {
        e.preventDefault(); // Previene il comportamento predefinito del link
        const target = $(this).attr("href"); // Prende l'href del link
        // Nasconde tutte le sezioni
        $(".main-content section").addClass("hidden");
        // Mostra la sezione corrispondente all'href del link
        $(target).removeClass("hidden");
        // Scorri alla sezione in modo fluido
        $("html, body").animate({
            scrollTop: $(target).offset().top}, 500);
    });

    const carouselItems = $(".carousel-item");
    const dots = $(".dot");
    let currentIndex = 0;
    const totalItems = carouselItems.length; // Corrected "lenght" to "length"

    // Funzione che aggiorna la visualizzazione del carosello
    function updateCarousel() {
        carouselItems.removeClass("active").addClass("hidden");
        carouselItems.eq(currentIndex).removeClass("hidden").addClass("active");

        dots.removeClass("active-dot"); // Anche se la prima volta non succede niente, è per assicurarsi che tutto viene resettato
        dots.eq(currentIndex).addClass("active-dot"); // Corrected "ed" to "eq"
    }

    // Inizializziamo il carosello
    updateCarousel();

    // Gestione del pulsante "successivo"
    $(".carousel-next").on("click", function () {
        // Tramite il modulo ci assicuriamo che currentIndex sia sempre all'interno del range corretto
        currentIndex = (currentIndex + 1) % totalItems;
        // Dopo aver cliccato si aggiorna il carosello
        updateCarousel();
    });

    // Gestione del pulsante "precedente"
    $(".carousel-prev").on("click", function () { // Corrected duplicate ".carousel-next" to ".carousel-prev"
        // Calcolo per avere il numero intero corretto
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateCarousel();
    });

    //Gestione dei click sui punti del carosello
    dots.on("click", function () {
        // Prendiamo l'indice del punto cliccato
        const index = dots.index(this);
        // Aggiorniamo l'indice corrente
        currentIndex = index;
        // Aggiorniamo il carosello 
        updateCarousel();
    });

    // Gestione del click sull'immagine attiva in quel momento, che apre il link esterno
    $(".carousel-track").on("click", ".carousel-item.active", function () {
        const link = $(this).data("link");
        if (link) {
            // Apre il link
            // Attributo blank per aprirlo in una nuova pagina
            window.open(link, "_blank");
        }
    });
});
