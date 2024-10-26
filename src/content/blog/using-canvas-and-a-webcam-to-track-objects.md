---
title: Using canvas and a webcam to track objects
description: A blog post about using canvas and a webcam to track objects.
author: Nikolai Norman Andersen
pubDatetime: 2013-04-13T15:18:00Z
slug: using-canvas-and-a-webcam-to-track-objects
featured: false
draft: false
tags:
  - canvas
  - tracking
---

After finishing work today I attended a small talk at Hackeriet. It was about the HTML5 video tag and how to manipulate your webcam stream with a canvas and JavaScript. Did some messing around with the video and canvas tags and ended up with some pretty cool results!

The first image is a video tag showing a live stream of my webcam. The second one is a canvas that has the video drawn on it (It happens through a listener/handler on the video tag). The canvas is clickable and will on click extract the color of the pixel you clicked. This color (and a range around it controlled by the sensitivity bar) will be used to locate the object we want to track – and it works much like a green-screen. I’ve used a lemon in my example since it’s easy to track, simply because it’s the only yellow thing in the picture.

![Lemon being tracked by Canvas](@assets/images/html5-canvas-lemon.png)

The last canvas shows the same stream as the webcam, but zoomed in based on the scale bar, and with the lemon as it’s center. No matter how much you move the lemon around in webcam frame it will still be the center of the last canvas frame.

Not really that complicated, or that much magic, but it was cool to try this hands on. One thing everyone should know is that the webcam streams height and width is NOT the same as the video tag (This gave me and my co-workers a few minutes of frustration over why our algorithms didn’t work).

You can look through the code at GitHub: [nikolaia/HTML5-webcam-object-tracking-and-stabilizing.](https://github.com/nikolaia/HTML5-webcam-object-tracking-and-stabilizing.)

Here is the code used in the talk/workshop: [kantega/html5pixelmagic](https://github.com/kantega/html5pixelmagic)
