# Photoplace-trekking
Il progetto consiste nella creazione di un sito web personale dove posso registrare e organizzare tutte le escursioni in montagna o i luoghi che visito. Per ogni uscita posso caricare il file GPX del percorso svolto, aggiungere una descrizione, foto e note personali. <br/>Tutte le escursioni vengono visualizzate su una mappa interattiva, dove posso cliccare sui vari punti visitati per vedere i dettagli di ogni uscita. Il sito funziona come un diario digitale di montagna, che mi permette di tenere traccia dei posti dove sono stato e rivedere i percorsi fatti in modo semplice e visivo.

#### Struttura del Sito Web (Pagine da Implementare)
1. Homepage / Mappa Globale
   Scopo: Dare una visione d'insieme immediata di tutte le avventure. <br/>
    Contenuto:
     - Una mappa che mostra dei "pin" o icone per ogni escursione registrata.
     - Cliccando su un pin, si apre un piccolo pop-up con il titolo dell'escursione, la data e un link/bottone per "Scopri di più".
     - Forse una piccola sezione introduttiva o gli ultimi 3 percorsi aggiunti.

2. Pagina di Dettaglio dell'Escursione
    Scopo: Raccontare una singola escursione in modo completo. <br/>
    Contenuto:
     - Titolo dell'escursione (es. "Anello del Monte Viso").
     - Mappa Specifica: Una mappa che mostra solo la traccia GPX di quell' escursione.
     - Dati Tecnici:Data dell'escursione, distanza (calcolata dal GPX), dislivello positivo/negativo (calcolato dal GPX), durata, difficoltà (es. Turistico, Escursionistico, Esperti).
   
   Descrizione (opzionale): <br/>
     - Un campo di testo dove puoi raccontare l'esperienza, le condizioni del sentiero, ecc.
     - Galleria Fotografica: Una sezione dove caricare e visualizzare le foto più belle.
     - Note Personali: Un'area (magari privata, visibile solo a te) per appunti, pensieri o cose da ricordare per il futuro.
     - Pulsante "Download GPX".

3. Elenco Escursioni
    Scopo: Offrire un modo alternativo alla mappa per trovare e filtrare le escursioni.

    Contenuto:
     - Una lista o una griglia di tutte le escursioni.
     - Ogni elemento della lista mostra: titolo, data, una foto di anteprima e dati chiave (distanza/dislivello).

   Funzionalità di Ricerca e Filtro (opzionale):
     - Cerca per nome.
     - Filtra per regione/zona (es. Alpi Cozie, Dolomiti).
     - Filtra per tipo di attività (es. Trekking, Alpinismo, Ciaspole, MTB).
     - Ordina per data, difficoltà o distanza.

4. Pagina di Amministrazione (Backend)
    Scopo: Permetterti di aggiungere, modificare o eliminare le escursioni. Questa pagina deve essere protetta da login.
    Contenuto:
     - Un form semplice e intuitivo per inserire una nuova escursione.
     - Campi per il titolo, la data, la descrizione, ecc.
     - Un pulsante per caricare il file GPX.
     - Un'interfaccia per caricare le foto.
     - Un elenco delle escursioni esistenti con pulsanti per "Modifica" ed "Elimina".

5. Funzionalità Chiave da Implementare
   Gestione della Mappa:
    - Libreria Mappe: Mapbox
    - Visualizzazione Pin: Caricare le coordinate di ogni escursione e mostrarle sulla mappa globale.
    - Visualizzazione Traccia GPX:

Implementare una funzione per leggere (fare il "parsing") del file GPX.

Gestione File GPX:
  - Upload: Creare la logica di backend per ricevere e salvare il file GPX sul server.
  - Parsing: Utilizzare una libreria (lato server o client) per estrarre i dati dal file XML del GPX. Da qui puoi ottenere:
      - Le coordinate per disegnare la traccia.
      - I dati di altitudine per calcolare il dislivello.
      - I dati di tempo per calcolare la durata.

  Calcolo Statistiche: Creare algoritmi per calcolare distanza totale e dislivello cumulativo dai punti del GPX.

#### Frontend
1. **Homepage (Mappa interattiva)**
    - Mappa con marker per ogni luogo visitato (usando Leaflet o Mapbox)
    - I marker si aprono con: nome, data, descrizione, foto e link al file GPX
2. **Sezione "Le mie escursioni" (Lista o griglia)**
    - Card con: immagine copertina, nome luogo, data, breve descrizione
    - Cliccando su una card si apre la pagina del dettaglio
3. **Pagina Dettaglio Escursione**
    - Titolo, data, descrizione completa
    - Foto della gita
    - Visualizzazione del percorso GPX su mappa
    - Dati del tracciato (dislivello, distanza, durata)
    - Download GPX
4. **Aggiungi nuova escursione (area privata o admin)**
    - Form per aggiungere: titolo, descrizione, data, immagini, file GPX
    - Upload con preview immagine e tracciato GPX mostrato direttamente

