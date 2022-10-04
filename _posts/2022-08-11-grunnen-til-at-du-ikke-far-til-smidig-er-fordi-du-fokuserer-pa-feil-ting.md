---
layout: single
title: "Grunnen til at du ikke får til smidig, er fordi du fokuserer på feil ting"
date: 2022-08-11 11:15:00
canonical_url: https://blog.variant.no/grunnen-til-at-du-ikke-f%C3%A5r-til-smidig-er-fordi-du-fokuserer-p%C3%A5-feil-ting-a890640553ea 
header:
  image: assets/images/cargo-cults.jpg
  caption: "A ceremonial cross of the John Frum cargo cult, Tanna island, New Hebrides (now Vanuatu), 1967 — Tim Ross — Own work"
---

Da jeg startet å jobbe som utvikler i 2011 tenkte jeg at jeg var utrolig heldig med tidspunktet. Jeg hadde startet å jobbe i året hvor The Agile Manifesto hadde sitt tiårsjubileum, og det føltes som året hvor alle endelig skulle forstå hva smidig faktisk var. Nå sitter jeg her 11 år senere og tenker på hvor naiv jeg var, men har fortsatt et lite håp. Jeg sier som fotball-fans som har kjent på skuffelse: “Next year!”.

Da jeg på høgskolen for første gang lærte om vannfall som metodikk føltes det, for en uerfaren student, som enda en metodikk i verktøykassa. Et helt logisk valg for en stor bedrift med store prosjekter. Da jeg senere fikk oppleve vannfall selv forstod jeg jo fort at metodikkens opphav er fra industri- og byggebransjen. Da prosessen først er i gang så kjøres den sekvensielt til siste steg er nådd. Heldigvis er de fleste enig at nå til dags kan man ikke jobbe på denne måten i IT-bransjen.

Når dot-com æraen kom, med internett for alle, så ble høy speed-to-market og kjapp vekst det viktigste bedrifter drev med. Objekt-orientert programmering ble også det mest populære paradigmet for seriøse enterprise-utviklere. Denne komboen av krav og paradigme gjorde at den gamle måten å lage programvare på med vannfall ble for kostbar. Nye metodikker som eXtreme Programing (XP) og SCRUM kom fram i lyset. Felles for de alle var et voldsomt fokus på sluttbruker, iterativ utvikling og tilpassningsdyktighet.

Helt revolusjonerende, tenkte jeg, da jeg lærte om disse metodikkene mange år etter at de ble etablert på 90-tallet. På den tiden satt jeg med lørdagsgodtet mitt og leste ukas Donald Duck, eller så svenskdubba Top Cat på Cartoon Network. Enda mer revolusjonerende fant jeg det når jeg enda senere leste de fantastiske første kapittelene i boka Thinking Forth², som tok opp mange av de samme konseptene mye tidligere. Smidig var ikke noe som ble formalisert i 2001 når Agile Manifesto¹ ble publisert, det har vært en evig kamp om å bli mer smidig fra programmeringens morgen.

Kjært barn har mange navn. Vi kaller det Smidig, men det er et ord som betyr forskjellige ting for forskjellige folk. For noen betyr det SCRUM med backlogs, product owners, faste to-ukers sprinter med retrospective på slutten. For andre er det scrumish hvor man har plukket det som funker fra SCRUM, som jo egentlig høres ganske smidig og tilpassningsdyktig ut. Andre ble helt frelst etter å ha lest Lean Startup³ av Eric Ries, og tenker på smidig som build-measure-learn cycles med A/B testing og fokus på å lage Minimum Viable Products. Kanskje man er så Smidig at man faktisk bruker et Kanban Board for å visualisere arbeid, workflows og passe på at man ikke har for mange baller i luften?

Du kan ikke lage løsninger uten fagpersoner og eksperter i teamet. Et team kan ikke levere på en smidig måte uten et mandat, slik at de kan ta avgjørelser.

Det er ikke smidig å drive med kodefrys og store releases. Små endringer som leveres kontinuerlig er tryggere og gir mer granulert kontroll over hvilke effekt endringene gir.

Sluttbruker må stå i fokus. Du klarer ikke reprodusere bruksmønster og data i testmiljøer. Det blir som å teste en røykvarsel ved å trykke på den lille knappen for å høre den pipe, istendefor for at den testes med røyk.

Du må rigge deg for å holde på i produksjonsmiljøet. Funksjonbrytere (eller Feature Toggles på engelsk) er et nødvendig smidig verktøy å ha på plass, for uten de blokkerer du produksjonslinja.

Jeff Sutherland, som har gitt seg selv tittelen Inventor and Co-Creator of Scrum sier at du ikke skal estimere. Estimering er bortkastet tid, og små User Stories med akseptansetester er veien å gå. Du må ha automatiserte tester, for du skal levere fort uten at det går utover kvaliteten sluttbruker opplever.

Det er mye som skal på plass for å være smidig og levere kontinuerlig.

Første gang jeg hørte om temaet Cargo Cults var når noen helt casually nevnte det på Slack. Som om det var noe alle hadde hørt om. Jeg gjorde det samme som jeg gjør hver gang noen skriver om noe jeg aldri hart hørt om: Prøver å lære meg mest mulig om det slik at det ikke kommer fram hvor uvitende jeg er om tema. Imposter syndrom på sitt beste! Cargo Cults er, helt forenklet, når du kopierer noe du har observert for å oppnå samme observerte effekt.

Det tydeligeste eksemplet var etter andre verdenskrig. Militæret tok seg til rette på diverse øyer i Stillehavet og var det første møtet mange urfolk hadde med verden utenfor. Forsyninger til militærbasene ble sluppet fra fly, og de militære delte både mat og klær med urfolket som takk for at de var guider og verter. Når militæret etter krigen forlot øyene, og forsyningsflyene sluttet å komme, begynte utfolket å kopiere militære rutiner de hadde observert som å gå i uniform og gjennomføre parader i håp om at flyene skulle komme tilbake med forsyninger.

__Det er for mye cargo-culting i bransjen vår__. Man introduserer metodikk og prosess fordi man har sett det fungere i en annen organisasjon, eller man leste om det i en bok, eller så en presentasjon. Men man vet egentlig ikke hvorfor det fungerte. Så faller man ofte tilbake til en mer vannfallsbasert metodikk fremfor å være smidig nok til å endre retning og tilpasse seg. Du kan ikke påstå å drive med smidig når du ikke kontinuerlig forbedrer prosessen din.

Nå skal jeg gi deg et lite hint for å sende deg på rett vei: Det var mest sannsynlig folkene som gjorde at dere ble stadig smidigere, ikke prosessene og metodikkene. Så ikke ta med prosess og metodikk, men se på hvordan man behandlet folk. Hvordan man satset på de, stolte på de og ga de ansvar. Coach folk, ikke tving dem inn i en prosess de ikke har eierskap til. Bygg de opp slik at de selv forstår hva som må til for å levere verdi på en smidig måte. __Sett folka først!__

_Original posted at [variant.blog](https://blog.variant.no/grunnen-til-at-du-ikke-f%C3%A5r-til-smidig-er-fordi-du-fokuserer-p%C3%A5-feil-ting-a890640553ea)._