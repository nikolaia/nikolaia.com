---
layout: single
title: Talks
permalink: /talks/
author_profile: true
---

This is a list of talks I've held, and appearances I've done, that are available online.

## Immutable application deployments with F# Make (English)

Deliver continuously to Azure Web Apps by making your build- and deployment pipeline scalable and testable with F# Make! This presentation will show you how to write build- and deployment-scripts that runs the same on your local machine as when deploying in an Azure Web App!
I'll do the following:

* Introduce you to FAKE and how it compares to Cake and PSAKE
* Teach you about Kudu, the engine behind deployments to Azure Web Apps
* Show you how you can free yourself of saving environment specific configuration in tools like Octopus Deploy and VSTS
* Demonstrate migrating Azure SQL databases on deploy, using the Web Apps connection string(s)
* Show how add ARM to this setup, how to approach security and how to automatically smoke test

*Video from NDC Oslo 2018:*

<iframe width="560" height="315" src="https://www.youtube.com/embed/_sZT0CpJ6Vo" frameborder="0" allowfullscreen></iframe>

## Interview on Channel 9 at NDC Oslo 2017

> Join us as we chat with Nikolai Andersen around his session on F# and Azure

<iframe src="https://channel9.msdn.com/Events/NDC/NDC-Oslo-2017/C9L12/player" width="764" height="430" allowFullScreen frameBorder="0"></iframe>

## Using F# on Azure Functions in Production (English)

In this talk I'll show a real world example of running F# on Azure Functions. By consuming several APIs in a deployment pipeline we have created a service that generates informative changelogs between environments. I want to show you how easily you can do the same.

Using the power of F# Type Providers we'll create a new project, integrate with three external systems and deploy to Azure Functions in under an hour. We'll go all the way from the drawing board to running in production.

The presentation does not assume any prior familiarity with F#, Type Providers or Azure Functions.

<iframe width="560" height="315" src="https://www.youtube.com/embed/pabo99C6_JA" frameborder="0" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/vxsSiTsQWEg" frameborder="0" allowfullscreen></iframe>

## Changelog-as-a-service - F# på Azure Functions (Norwegian)

Denne talken er perfekt for deg som vil se de store styrkene til F# og få et innblikk i Azure Functions (Serverless). Gjennom integrasjoner med tre forskjellige systemer i deployment pipelinen lager vi en tjeneste som genererer en endringslogg mellom miljøer. Vi kombinerer F# Type Providers og muligheten til å kjøre F# scripts serverless på Azure Functions!

<iframe src="https://player.vimeo.com/video/207536241" width="640" height="239" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/207536241">Changelog-as-a-service - F# p&aring; Azure Functions &ndash; Nikolai Norman Andersen</a> from <a href="https://vimeo.com/bekk">BEKK Open</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

## Lord of Chaos - Becoming a Chaos Engineer (English)

Our software systems are becoming more complex and more distributed. How do we have confidence in the resilience and redundancy of the systems we put in production? Chaos Engineering is the practice of introducing failures into your system in controlled experiments to learn how your system reacts. In this talk we will look into how to establish the steady state behavior of a system and how to start experimenting to discover if the system can handle spikes in traffic, failures and timeouts.

<iframe src="https://player.vimeo.com/video/181925286?byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/181925286">Lightning Talks: Lord of Chaos - Becoming a Chaos Engineer: Nikolai Norman Andersen</a> from <a href="https://vimeo.com/javazone">JavaZone</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

## The Docker Toolbox (English)

Docker itself is easy to use, but when you start running several containers linked together you discover the need for easier orchestration. This talk is an introduction to Docker Swarm, Docker Machine and Docker Compose. We will look into deploying an infrastructure consisting of several linked containers (app, database and load-balancing), dispersed on several hosts, and how to achieve Blue-Green deployments. 

<iframe src="https://player.vimeo.com/video/138174363?byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/138174363">The Docker Toolbox</a> from <a href="https://vimeo.com/nnug">NNUG</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

The talk was held for the Norwegian .NET User Group in Oslo.

## Introducing DevOps mentality at a government agency (English)

Changes in attitude and mentality has drastically changed how the Norwegian Directorate for Education and Training develop, deliver and maintain their applications. Legacy systems are now deployed at the push of a button, and new systems are delivered continuously from day one. I’ll tell you how we introduced continuous delivery and DevOps mentality, and how you can start to do the same.

<iframe src="https://player.vimeo.com/video/164412754?byline=0&portrait=0" width="640" height="360" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/164412754">Introducing DevOps mentality at a government agency - Nikolai Norman Andersen</a> from <a href="https://vimeo.com/boosterconf">Booster conference</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

The lightning talk was held at Boosterconf Bergen 2016.

## Prøveadministrasjonssystemet PAS: A DevOps story (Norwegian)

WebForms, WCF/SOAP, Caching i session-objekter, Microsoft Reporting Services og like mye businesslogikk i Stored Procedures som i C#. Velkommen til en buzzword-bonanza fra 2007.  Vi har arvet en løsning på tre millioner kodelinjer fordelt på over 12.000 filer. Utrulling var to ganger i året, med påfølgende kodefrys. Bygging skjedde på egen maskin og utrullingsrutinene var kopiering inn i produksjon via Remote Desktop. Selvfølgelig hoppet man over QA.

Dette er en historie om enorm risikoredusering ved hjelp av DevOps og kontinuerlige leveranser, og et foredrag som fokuserer på å se løsninger fremfor problemer.

<iframe src="https://player.vimeo.com/video/146329292?byline=0&portrait=0" width="640" height="249" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
<p><a href="https://vimeo.com/146329292">Pr&oslash;veadministrasjonssystemet PAS: A DevOps story - Nikolai Norman Andersen</a> from <a href="https://vimeo.com/bekk">BEKK Open</a> on <a href="https://vimeo.com">Vimeo</a>.</p>